# Stage 1: Build the frontend
FROM node:14 as build-frontend
WORKDIR /app/frontend
# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm install
# Copy remaining source and build the React app
COPY frontend/ ./
RUN npm run build

# Stage 2: Setup backend and integrate the frontend build
FROM node:14
WORKDIR /app/backend
# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install
# Copy backend source code
COPY backend/ ./
# Copy the built frontend (React) into the backend's public folder
COPY --from=build-frontend /app/frontend/build ./public

# Expose the backend port (adjust if needed)
EXPOSE 8080
# Start the backend server
CMD ["node", "index.js"]
