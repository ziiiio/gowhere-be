# Use an official Node.js runtime as the base image
FROM node:18-alpine3.17

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm ci

# Copy the rest of your application code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "start"]
