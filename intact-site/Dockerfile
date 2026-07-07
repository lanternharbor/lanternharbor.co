# Multi-stage build: compile the static Astro site, then serve it with nginx.
# Fly's remote builder runs this same Dockerfile, so a local `docker build`
# reproduces the deploy exactly.

FROM node:22-alpine AS build
WORKDIR /app

# Install deps against the committed lockfile for a reproducible build.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Canonical URL for <link rel=canonical>, Open Graph, and the sitemap.
# Overridden at deploy time: `fly deploy --build-arg SITE_URL=https://<app>.fly.dev`
ARG SITE_URL=https://wholefromthestart.example
ENV SITE_URL=$SITE_URL
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
