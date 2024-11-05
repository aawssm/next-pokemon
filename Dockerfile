# Use an official Node.js runtime as a parent image
FROM node:20-alpine3.20


# Install Yarn package manager
# RUN apk add --no-cache npm

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package*.json ./

# Copy the rest of the application code to the container
COPY . .

# Install dependencies
RUN npm install

# Build the application
#RUN npm run build

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm","run", "start"]
