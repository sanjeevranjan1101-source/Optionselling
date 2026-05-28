# Use official Node image
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
COPY tsconfig.json ./
COPY src ./src
COPY migrations ./migrations
COPY public ./public

RUN npm install --production=false
RUN npm run build

# Build frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install --production=false
COPY frontend/tsconfig.json ./
COPY frontend/vite.config.ts ./
COPY frontend/index.html ./
COPY frontend/src ./src
RUN npm run build

# Final image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/frontend/dist ./public/app

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node","dist/server.js"]
