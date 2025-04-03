# Use Node.js as the base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Build React app
RUN npm run build

# Install a simple web server for serving the app
RUN npm install -g serve

# Expose frontend port
EXPOSE 3000

# Serve the frontend application
CMD ["serve", "-s", "build"]
