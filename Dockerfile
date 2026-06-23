# Base image with Node.js 20 and Chromium for PDF generation
FROM node:20-alpine

# Install Chromium and its dependencies
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    font-noto \
    font-noto-cjk \
    ttf-freefont \
    && rm -rf /var/cache/apk/*

# Set Chromium path for scripts that need it
ENV CHROMIUM_PATH=/usr/bin/chromium-browser

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "start"]
