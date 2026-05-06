#!/usr/bin/env python3
"""Beacon — drift sentry for the daily-new-proposals outreach pipeline.

Reads the last N shipped outreach folders, runs predicates derived from the
2026-04-22 drift audit, and writes a markdown regression report.

Predicates encode six categories from skill-refinement-2026-04-22.md:
  A. Banned email openers (caught my/our eye, shortlist, etc.)         FAIL
  B. First-person plural in email (we help, we've been, our eye, etc.) FAIL
  C. Missing launch-partner payment sentence in email                  FAIL
  D. Formulaic PDF-config closers (clean code under the hood, etc.)    WARN
  E. Regulars-flip suspect (regulars-list business, no first-person
     customer language in email opener)                                INFO
  F. Wordmark-mark-later default drift in completed-businesses.md      INFO

Plus an infrastructure check: does the scheduled SKILL.md still seed the
banned phrase 'caught our eye' that the feedback memory forbids?

Usage:
    python beacon.py                    # last 10 folders, write to today's file
    python beacon.py --last 20          # last 20 folders
    python beacon.py --since 2026-04-21 # all folders dated 2026-04-21 or later (uncapped)
    python beacon.py --since 2026-04-21 --last 5
                                        # last 5 folders within the date range
    python beacon.py --out /tmp/r.md    # custom output path
    python beacon.py --stdout           # print to stdout instead of file
"""

from __future__ import annotations

import argparse
import re
from collections import Counter
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from typing import Iterable

# ----------------------------------------------------------------------------
# Paths & defaults
# ----------------------------------------------------------------------------

OUTREACH_ROOT = Path(
    "/Users/williamkeough/Documents/Claude/Projects/Form LLC/south-shore-site-redesign"
)
SKILL_MD = Path(
    "/Users/williamkeough/.claude/scheduled-tasks/daily-new-proposals---website-redesign/SKILL.md"
)
REPORT_ROOT = Path(
    "/Users/williamkeough/Documents/Lantern Harbor/agent-reports/beacon"
)

# ----------------------------------------------------------------------------
# Predicate patterns (sourced from skill-refinement-2026-04-22.md §Step 11)
# ----------------------------------------------------------------------------

# A. Banned openers — match the audit's BANNED_EMAIL regex, broadened slightly.
BANNED_OPENER_PATTERNS: list[tuple[str, str]] = [
    (r"\bcaught\s+(?:my|our)\s+eye\b", "caught my/our eye"),
    (r"\bon\s+my\s+radar\b", "on my radar"),
    (r"\bshort\s*list\s+of\b", "shortlist of"),
    (r"\bcurated\s+list\b", "curated list"),
    (r"\bThe\s+way\s+this\s+works:\s+I\s+pick\b", "shortlist framing ('The way this works: I pick…')"),
    (r"\bI\s+pick\s+one\s+well-regarded\s+local\b", "'I pick one well-regarded local'"),
]

# B. First-person plural in email (Lantern Harbor is solo).
# Patterns require an apostrophe in contracted forms — bare "were" must not
# match `\bwe['’]?re\b`. Quotations (block, full-line, or inline-paired) are
# excluded by the matcher in `check_email`. In folders identified as
# regulars-list businesses, findings are downgraded to INFO because William's
# family-as-patrons usage is legitimate ("we've been coming in for years").
PLURAL_VOICE_PATTERNS: list[tuple[str, str]] = [
    (r"\bwe\s+help\b", "'we help'"),
    (r"\bwe['’]ve\s+been\b", "'we've been'"),
    (r"\bwe\s+are\b", "'we are'"),
    (r"\bwe['’]re\b", "'we're'"),
    (r"\bour\s+own\s+site\b", "'our own site'"),
    (r"\bour\s+eye\b", "'our eye'"),
    (r"\bour\s+practice\b", "'our practice'"),
]

# C. Required: launch-partner payment sentence (FAIL if absent).
PAYMENT_PATTERN = re.compile(
    r"(?i)(payment\s+(?:is\s+)?due\s+on\s+delivery"
    r"|no\s+deposit"
    r"|nothing\s+changes\s+hands)"
)

# D. Formulaic PDF closers (WARN, not FAIL).
FORMULAIC_PATTERNS: list[tuple[str, str]] = [
    (r"single\s+largest\s+change\s+(?:here|in\s+this\s+redesign)", "single largest change"),
    (r"modern\s+(?:build|site)\s+(?:that\s+you|you)\s+own\s+outright", "modern build/site you own outright"),
    (r"clean\s+code\s+under\s+the\s+hood", "clean code under the hood"),
    (r"site['’]?s\s+job\s+is\s+to\s+make\s+sure", "site's job is to make sure"),
    (r"built\s+to\s+look\s+and\s+sound\s+like\s+\w+\s+years\s+of", "built to look and sound like N years of"),
]

# E. Regulars-flip — heuristic for first-person regular-customer language.
# If a folder's slug matches a regulars-list business, the email opener should
# read like a patron. We surface as INFO when none of these markers appear in
# the first ~12 non-empty lines of the email body.
REGULAR_CUSTOMER_MARKERS: list[str] = [
    r"\bIt['’]s\s+William\b",
    r"\bThursday\s*[- ]?\s*night\b",
    r"\bevery\s+(?:Thursday|Friday|Saturday|Sunday|Monday|Tuesday|Wednesday)\b",
    r"\bevery\s+(?:six|seven|eight|two|three|four|five|ten|few)\s+weeks?\b",
    r"\bFinley['’]?s\b",                # the labradoodle
    r"\bWoodbridge\s+Road\b",                # BC High bus stop years
    r"\bWhiting\s+Street\b",                 # EuroMart hook
    r"\bI['’]?m\s+a\s+regular\b",
    r"\b(?:my|our)\s+(?:dog|son|daughter|kid)\b",
    r"\bwhen\s+you\s+pumped\s+(?:my|our)\b",  # E.L. Margetts septic
    r"\b(?:two|three|four|five)[- ]?slice\b", # Old Country Pizzeria
    r"\bdad\s+and\s+(?:my\s+)?brother\b",     # Red Rose tradition
]

# F. Wordmark drift — log-line patterns in completed-businesses.md.
# The audit at lines 232–238 says >half of 30 entries flagged mark-later is
# too high; default should be wordmark.
LOG_FLAG_PATTERNS = {
    "wordmark-now-mark-later": re.compile(r"wordmark-now-mark-later", re.IGNORECASE),
    "wordmark-only": re.compile(r"\bwordmark(?:-only)?\b(?!-now)", re.IGNORECASE),
    "keep-existing": re.compile(r"\bkeep-existing\b", re.IGNORECASE),
    "mark-now": re.compile(r"\bmark-now\b(?!-)", re.IGNORECASE),
}

# Infrastructure check: does the scheduled SKILL.md still seed the banned phrase?
SKILL_SEED_PATTERN = re.compile(r"caught\s+our\s+eye", re.IGNORECASE)

# ----------------------------------------------------------------------------
# Data model
# ----------------------------------------------------------------------------


@dataclass
class Finding:
    severity: str           # "FAIL", "WARN", "INFO"
    rule: str               # short rule name
    file: Path              # path to the offending file
    line: int               # line number, 1-indexed; 0 if not applicable
    text: str               # the offending line, trimmed
    suggestion: str = ""    # human-readable fix hint


@dataclass
class FolderResult:
    slug: str
    folder: Path
    email: Path | None = None
    pdf_config: Path | None = None
    findings: list[Finding] = field(default_factory=list)


# ----------------------------------------------------------------------------
# Scanning helpers
# ----------------------------------------------------------------------------


def looks_like_quotation(line: str) -> bool:
    """Heuristic: is this line wholly a quotation?"""
    s = line.lstrip()
    if s.startswith(">"):
        return True
    if s.startswith(("\"", "“", "”", "'", "‘", "’")) and s.rstrip().endswith(
        ("\"", "“", "”", "'", "‘", "’")
    ):
        return True
    return False


def match_is_inside_quotes(line: str, start: int, end: int) -> bool:
    """Return True if line[start:end] sits inside paired straight or curly quotes.

    Handles both straight ASCII quotes (count parity to the left) and curly
    open/close pairs (an open before, a close after, no intervening close).
    """
    # Curly: open before match, close after match, no intervening close before match.
    open_pos = max(line.rfind(q, 0, start) for q in ("“", "‘"))
    if open_pos != -1:
        close_pos = min(
            (line.find(q, end) for q in ("”", "’") if line.find(q, end) != -1),
            default=-1,
        )
        if close_pos != -1:
            # Make sure no closing curly happens between open_pos and start.
            mid_close = max(line.rfind(q, open_pos + 1, start) for q in ("”", "’"))
            if mid_close == -1:
                return True
    # Straight: odd number of straight double-quotes before the match.
    left = line[:start]
    if left.count("\"") % 2 == 1:
        # And there's a closing straight quote after the match.
        if "\"" in line[end:]:
            return True
    return False


def find_email_file(folder: Path) -> Path | None:
    """Locate the <slug>-email.md file inside an outreach folder."""
    for p in folder.glob("*-email.md"):
        return p
    return None


def find_pdf_config(slug: str, tools_dir: Path) -> Path | None:
    """Locate _tools/build-<slug>-proposal.py.

    Folder slugs include town suffixes (e.g. 'hornstra-farms-norwell') but the
    cfg filename sometimes omits them ('build-hornstra-farms-proposal.py'). Try
    the exact match first, then fall back to progressively shorter slug
    prefixes — longest match wins.
    """
    candidate = tools_dir / f"build-{slug}-proposal.py"
    if candidate.exists():
        return candidate
    parts = slug.split("-")
    while len(parts) > 1:
        parts = parts[:-1]
        fallback = tools_dir / f"build-{'-'.join(parts)}-proposal.py"
        if fallback.exists():
            return fallback
    return None


def list_outreach_folders(root: Path) -> list[Path]:
    """Return outreach folders sorted by date prefix (oldest → newest)."""
    pat = re.compile(r"^(\d{4}-\d{2}-\d{2})-")
    folders = [p for p in root.iterdir() if p.is_dir() and pat.match(p.name)]
    folders.sort(key=lambda p: p.name)
    return folders


def select_folders(
    folders: list[Path],
    last: int | None,
    since: date | None,
) -> list[Path]:
    """Apply --last / --since filters."""
    if since is not None:
        folders = [f for f in folders if _folder_date(f) and _folder_date(f) >= since]
    if last is not None:
        folders = folders[-last:]
    return folders


def _folder_date(folder: Path) -> date | None:
    m = re.match(r"^(\d{4})-(\d{2})-(\d{2})-", folder.name)
    if not m:
        return None
    try:
        return date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
    except ValueError:
        return None


def slug_from_folder(folder: Path) -> str:
    """Strip the YYYY-MM-DD- prefix to get the business slug."""
    return re.sub(r"^\d{4}-\d{2}-\d{2}-", "", folder.name)


# ----------------------------------------------------------------------------
# Predicates A–C: per-email checks
# ----------------------------------------------------------------------------


def check_email(email_path: Path, is_regular: bool = False) -> list[Finding]:
    findings: list[Finding] = []
    try:
        text = email_path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as e:
        return [
            Finding(
                severity="WARN",
                rule="email_unreadable",
                file=email_path,
                line=0,
                text=str(e),
                suggestion="Investigate file encoding or permissions.",
            )
        ]
    lines = text.splitlines()

    # A. Banned openers — anywhere in the email.
    for i, line in enumerate(lines, start=1):
        for pattern, label in BANNED_OPENER_PATTERNS:
            for m in re.finditer(pattern, line, re.IGNORECASE):
                if match_is_inside_quotes(line, m.start(), m.end()):
                    continue
                findings.append(
                    Finding(
                        severity="FAIL",
                        rule=f"banned_opener:{label}",
                        file=email_path,
                        line=i,
                        text=line.strip()[:160],
                        suggestion="Replace with a concrete local observation per Step 9 'Required elements'.",
                    )
                )

    # B. Plural first-person — skip lines that look like full quotations,
    # skip individual matches inside paired quote marks, and downgrade to INFO
    # for regulars-list businesses (where family-plural is legitimate).
    for i, line in enumerate(lines, start=1):
        if looks_like_quotation(line):
            continue
        for pattern, label in PLURAL_VOICE_PATTERNS:
            for m in re.finditer(pattern, line, re.IGNORECASE):
                if match_is_inside_quotes(line, m.start(), m.end()):
                    continue
                severity = "INFO" if is_regular else "FAIL"
                suggestion = (
                    "Verify manually. Regulars-list emails sometimes use plural-we "
                    "for William's family group ('we've been coming in for years') — "
                    "that's legitimate. Only fix if the 'we' refers to Lantern Harbor."
                    if is_regular
                    else "Rewrite to first-person singular ('I', 'my', 'me') per §1 Singular voice."
                )
                findings.append(
                    Finding(
                        severity=severity,
                        rule=f"plural_voice:{label}",
                        file=email_path,
                        line=i,
                        text=line.strip()[:160],
                        suggestion=suggestion,
                    )
                )

    # C. Missing launch-partner payment sentence.
    if not PAYMENT_PATTERN.search(text):
        findings.append(
            Finding(
                severity="FAIL",
                rule="missing_payment_sentence",
                file=email_path,
                line=0,
                text="(absent)",
                suggestion="Add: 'payment is due on delivery, no deposit — nothing changes hands until the site is live on your domain and you're happy with it.'",
            )
        )

    return findings


# ----------------------------------------------------------------------------
# Predicate D: PDF-config formulaic closers
# ----------------------------------------------------------------------------


def check_pdf_config(cfg_path: Path) -> list[Finding]:
    findings: list[Finding] = []
    try:
        text = cfg_path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as e:
        return [
            Finding(
                severity="WARN",
                rule="cfg_unreadable",
                file=cfg_path,
                line=0,
                text=str(e),
                suggestion="Investigate file encoding or permissions.",
            )
        ]
    for i, line in enumerate(text.splitlines(), start=1):
        for pattern, label in FORMULAIC_PATTERNS:
            if re.search(pattern, line, re.IGNORECASE):
                findings.append(
                    Finding(
                        severity="WARN",
                        rule=f"formulaic_closer:{label}",
                        file=cfg_path,
                        line=i,
                        text=line.strip()[:160],
                        suggestion="Rewrite as if this were the first Lantern Harbor proposal ever (Step 8 bespoke-closer rule).",
                    )
                )
    return findings


# ----------------------------------------------------------------------------
# Predicate E: regulars-flip suspect
# ----------------------------------------------------------------------------


def parse_regulars_slugs(regulars_md: Path) -> set[str]:
    """Extract folder-slug fragments referenced in my-regulars.md.

    Looks for backticked folder paths like `2026-04-20-jackson-square-tavern-weymouth/`.
    """
    if not regulars_md.exists():
        return set()
    text = regulars_md.read_text(encoding="utf-8")
    slugs: set[str] = set()
    for m in re.finditer(r"`(\d{4}-\d{2}-\d{2}-([a-z0-9-]+?))/", text):
        slugs.add(m.group(2))
    # Also accept slugs in markdown-link form: ](2026-04-20-foo/...)
    for m in re.finditer(r"\]\((\d{4}-\d{2}-\d{2}-([a-z0-9-]+?))/", text):
        slugs.add(m.group(2))
    return slugs


def check_regulars_flip(
    folder: Path,
    email_path: Path,
    regulars_slugs: set[str],
) -> list[Finding]:
    slug = slug_from_folder(folder)
    if slug not in regulars_slugs:
        return []
    try:
        text = email_path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError):
        return []
    # Take the first 12 non-empty body lines (after the Subject:).
    body_lines: list[str] = []
    for line in text.splitlines():
        if line.startswith("Subject:") or not line.strip():
            continue
        body_lines.append(line)
        if len(body_lines) >= 12:
            break
    head = "\n".join(body_lines)
    for marker in REGULAR_CUSTOMER_MARKERS:
        if re.search(marker, head, re.IGNORECASE):
            return []
    return [
        Finding(
            severity="INFO",
            rule="regulars_flip_suspect",
            file=email_path,
            line=0,
            text=f"slug '{slug}' is on regulars list; opener lacks first-person customer language",
            suggestion="Verify manually. Regulars-list emails should open with William's real memory (Thursday-night corner, Finley's coat, Woodbridge Road, etc.), not a research-discovered observation.",
        )
    ]


# ----------------------------------------------------------------------------
# Predicate F: wordmark drift across the log
# ----------------------------------------------------------------------------


def check_wordmark_drift(
    log_md: Path,
    last_n: int | None,
) -> list[Finding]:
    if not log_md.exists():
        return [
            Finding(
                severity="INFO",
                rule="log_missing",
                file=log_md,
                line=0,
                text="completed-businesses.md not found",
                suggestion="Confirm the log path is correct.",
            )
        ]
    text = log_md.read_text(encoding="utf-8")
    # Each entry begins with "## " heading. Take the last N entries by heading order.
    entries = re.split(r"\n(?=## )", text)
    entries = [e for e in entries if e.startswith("## ")]
    if last_n is not None:
        entries = entries[-last_n:]
    counts: Counter[str] = Counter()
    for entry in entries:
        for label, pat in LOG_FLAG_PATTERNS.items():
            if pat.search(entry):
                counts[label] += 1
                break  # only count the first classification per entry
    total = sum(counts.values())
    if total == 0:
        return []
    mark_later = counts.get("wordmark-now-mark-later", 0)
    ratio = mark_later / total if total else 0.0
    findings: list[Finding] = []
    if ratio > 0.33:
        findings.append(
            Finding(
                severity="INFO",
                rule="wordmark_drift",
                file=log_md,
                line=0,
                text=f"wordmark-now-mark-later in {mark_later}/{total} of last {len(entries)} entries ({ratio:.0%}); audit threshold is ~33%.",
                suggestion="Default should be wordmark-only. Only escalate to mark-later when the existing logo is visibly dated AND the category benefits from a figural symbol.",
            )
        )
    findings.append(
        Finding(
            severity="INFO",
            rule="wordmark_distribution",
            file=log_md,
            line=0,
            text=f"counts across last {len(entries)} entries: " + ", ".join(f"{k}={v}" for k, v in counts.items()),
            suggestion="",
        )
    )
    return findings


# ----------------------------------------------------------------------------
# Infrastructure check: does SKILL.md still seed the banned phrase?
# ----------------------------------------------------------------------------


def check_skill_md(skill_md: Path) -> list[Finding]:
    if not skill_md.exists():
        return [
            Finding(
                severity="INFO",
                rule="skill_md_missing",
                file=skill_md,
                line=0,
                text="SKILL.md not found at expected path",
                suggestion="Confirm the scheduled-task path.",
            )
        ]
    findings: list[Finding] = []
    for i, line in enumerate(skill_md.read_text(encoding="utf-8").splitlines(), start=1):
        if SKILL_SEED_PATTERN.search(line):
            findings.append(
                Finding(
                    severity="FAIL",
                    rule="skill_md_seeds_banned_phrase",
                    file=skill_md,
                    line=i,
                    text=line.strip()[:200],
                    suggestion="Replace per skill-refinement-2026-04-22.md §1 Honesty rule rewrite. Until SKILL.md is fixed, downstream runs will keep tripping the feedback memory.",
                )
            )
    return findings


# ----------------------------------------------------------------------------
# Portfolio-wide closer-phrase frequency (informational)
# ----------------------------------------------------------------------------


def closer_phrase_frequency(
    cfg_paths: Iterable[Path],
) -> dict[str, int]:
    counts: Counter[str] = Counter()
    total = 0
    for cfg in cfg_paths:
        try:
            text = cfg.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            continue
        total += 1
        for pattern, label in FORMULAIC_PATTERNS:
            if re.search(pattern, text, re.IGNORECASE):
                counts[label] += 1
    counts["__total__"] = total
    return dict(counts)


# ----------------------------------------------------------------------------
# Report rendering
# ----------------------------------------------------------------------------


def render_report(
    run_date: date,
    selected_folders: list[Path],
    folder_results: list[FolderResult],
    skill_findings: list[Finding],
    log_findings: list[Finding],
    closer_freq: dict[str, int],
    outreach_root: Path,
) -> str:
    out: list[str] = []
    out.append(f"# Beacon — drift report {run_date.isoformat()}")
    out.append("")
    out.append(
        f"_Scanned {len(selected_folders)} outreach folder(s) under `{outreach_root}`_."
    )
    out.append("")

    fail_count = sum(
        1 for r in folder_results for f in r.findings if f.severity == "FAIL"
    ) + sum(1 for f in skill_findings if f.severity == "FAIL")
    warn_count = sum(
        1 for r in folder_results for f in r.findings if f.severity == "WARN"
    )
    info_count = sum(
        1 for r in folder_results for f in r.findings if f.severity == "INFO"
    ) + sum(1 for f in log_findings if f.severity == "INFO")

    out.append(f"**Summary:** {fail_count} FAIL · {warn_count} WARN · {info_count} INFO")
    out.append("")

    # Infrastructure section
    out.append("## Infrastructure")
    out.append("")
    if skill_findings:
        for f in skill_findings:
            out.append(_render_finding(f))
    else:
        out.append("- ✅ SKILL.md does not seed the banned `caught our eye` phrase.")
    out.append("")

    # Per-folder section
    out.append("## Per-folder findings")
    out.append("")
    any_findings = False
    for r in folder_results:
        if not r.findings:
            continue
        any_findings = True
        out.append(f"### `{r.folder.name}`")
        out.append("")
        for f in sorted(r.findings, key=lambda x: (_severity_rank(x.severity), x.rule)):
            out.append(_render_finding(f))
        out.append("")
    if not any_findings:
        out.append("_No findings on the selected folders._")
        out.append("")

    # Portfolio-wide closer frequency
    out.append("## Closer-phrase frequency (PDF configs scanned)")
    out.append("")
    total = closer_freq.get("__total__", 0)
    if total == 0:
        out.append("_No PDF configs found in the scan window._")
    else:
        out.append(f"_Across {total} PDF config(s):_")
        out.append("")
        out.append("| Closer phrase | Hits | Share |")
        out.append("|---|---:|---:|")
        for pattern, label in FORMULAIC_PATTERNS:
            hits = closer_freq.get(label, 0)
            share = (hits / total * 100) if total else 0.0
            out.append(f"| {label} | {hits} | {share:.0f}% |")
    out.append("")

    # Wordmark drift
    out.append("## Wordmark classification drift")
    out.append("")
    if log_findings:
        for f in log_findings:
            out.append(_render_finding(f))
    else:
        out.append("_No log data._")
    out.append("")

    # Footer
    out.append("---")
    out.append("")
    out.append(
        "Beacon predicates are sourced from "
        "`skill-refinement-2026-04-22.md`. Findings are advisory — they should "
        "never block a send. If a finding is a false positive, sharpen the "
        "predicate, don't suppress it."
    )
    return "\n".join(out)


def _severity_rank(s: str) -> int:
    return {"FAIL": 0, "WARN": 1, "INFO": 2}.get(s, 3)


def _render_finding(f: Finding) -> str:
    rel = f.file
    loc = f":{f.line}" if f.line else ""
    head = f"- **{f.severity}** `{f.rule}` — `{rel}{loc}`"
    body = []
    if f.text and f.text != "(absent)":
        body.append(f"  - text: `{f.text}`")
    elif f.text == "(absent)":
        body.append("  - text: _(absent)_")
    if f.suggestion:
        body.append(f"  - fix: {f.suggestion}")
    return "\n".join([head, *body])


# ----------------------------------------------------------------------------
# Entry point
# ----------------------------------------------------------------------------


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Beacon — outreach drift sentry.")
    p.add_argument(
        "--root",
        type=Path,
        default=OUTREACH_ROOT,
        help="Root of the south-shore-site-redesign outreach folders.",
    )
    p.add_argument(
        "--last",
        type=int,
        default=None,
        help="Number of most recent folders to include. Defaults to 10 unless --since is given (in which case the default is uncapped). Use 0 to force uncapped.",
    )
    p.add_argument(
        "--since",
        type=lambda s: date.fromisoformat(s),
        default=None,
        help="Only include folders dated on or after YYYY-MM-DD.",
    )
    p.add_argument(
        "--out",
        type=Path,
        default=None,
        help="Output path. Default: agent-reports/beacon/<today>.md",
    )
    p.add_argument(
        "--stdout",
        action="store_true",
        help="Write to stdout instead of a file.",
    )
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    root: Path = args.root
    if not root.exists():
        print(f"Outreach root not found: {root}")
        return 1

    folders = list_outreach_folders(root)
    if not folders:
        print(f"No outreach folders found under {root}")
        return 1

    if args.last is None:
        # No explicit --last: cap at 10 only when there's no --since to scope the run.
        last = None if args.since else 10
    elif args.last == 0:
        last = None
    else:
        last = args.last
    selected = select_folders(folders, last=last, since=args.since)

    regulars_slugs = parse_regulars_slugs(root / "my-regulars.md")
    tools_dir = root / "_tools"

    folder_results: list[FolderResult] = []
    cfg_paths_for_freq: list[Path] = []

    for folder in selected:
        slug = slug_from_folder(folder)
        result = FolderResult(slug=slug, folder=folder)
        result.email = find_email_file(folder)
        result.pdf_config = find_pdf_config(slug, tools_dir)

        is_regular = slug in regulars_slugs
        if result.email is not None:
            result.findings.extend(check_email(result.email, is_regular=is_regular))
            result.findings.extend(
                check_regulars_flip(folder, result.email, regulars_slugs)
            )
        else:
            result.findings.append(
                Finding(
                    severity="INFO",
                    rule="email_missing",
                    file=folder,
                    line=0,
                    text="no <slug>-email.md found",
                    suggestion="Folder may be a skip or in-flight; not necessarily an error.",
                )
            )

        if result.pdf_config is not None:
            result.findings.extend(check_pdf_config(result.pdf_config))
            cfg_paths_for_freq.append(result.pdf_config)
        else:
            result.findings.append(
                Finding(
                    severity="INFO",
                    rule="pdf_config_missing",
                    file=folder,
                    line=0,
                    text=f"no _tools/build-{slug}-proposal.py found",
                    suggestion="Folder may be a skip or in-flight; not necessarily an error.",
                )
            )

        folder_results.append(result)

    skill_findings = check_skill_md(SKILL_MD)
    log_findings = check_wordmark_drift(root / "completed-businesses.md", last_n=last)
    closer_freq = closer_phrase_frequency(cfg_paths_for_freq)

    report = render_report(
        run_date=date.today(),
        selected_folders=selected,
        folder_results=folder_results,
        skill_findings=skill_findings,
        log_findings=log_findings,
        closer_freq=closer_freq,
        outreach_root=root,
    )

    if args.stdout:
        print(report)
    else:
        out_path = args.out or (REPORT_ROOT / f"{date.today().isoformat()}.md")
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(report, encoding="utf-8")
        print(f"Wrote report to: {out_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
