# Stage 1: Build with libs

FROM node:lts-alpine3.20 as builder

# Set working directory to /app
WORKDIR /app

# Copy package.json, yarn.lock
# Root
COPY package.json package.json
COPY yarn.lock yarn.lock
# Libs
COPY libs/eslint-config/package.json libs/eslint-config/package.json
COPY libs/tsconfig/package.json libs/tsconfig/package.json
# Packages
COPY packages/api/package.json packages/api/package.json
COPY packages/weather-app/package.json packages/weather-app/package.json

# RUN yarn install
RUN yarn install

# Copy libs code
COPY . .

# Build Apps
RUN yarn workspace @congenial-eureka/api build
RUN yarn workspace @congenial-eureka/weather-app build

# Stage 2: Runtime - NestJS

FROM node:lts-alpine3.20 as apiServer

# Set working directory to /app
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

COPY --from=builder /app/libs ./libs

COPY --from=builder /app/packages/api/node_modules ./packages/api/node_modules
COPY --from=builder /app/packages/api/package.json ./packages/api/package.json
COPY --from=builder /app/packages/api/dist ./packages/api/dist

# yarn workspace @congenial-eureka/api start
# Expose the port
EXPOSE 3000

# Run the application
CMD ["yarn", "workspace", "@congenial-eureka/api", "start:prod"]




# Stage 3: Runtime - CaddyReact

FROM caddy:latest as ReactServer

# Set working directory to /app
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/packages/weather-app/build .

# Expose the port
EXPOSE 80

# Run the application
# Run the Caddy server with configuration
CMD ["caddy", "file-server", "--root", "/app"]