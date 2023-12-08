# Use Node.js image as the base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire project to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use Nginx image as the production server
FROM nginx:alpine

# Copy the build files from the previous stage to Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
