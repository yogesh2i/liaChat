# # Use the official Node.js image as the base image
# FROM node:alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the working directory
# COPY . .

# # Expose the port the backend will run on (default: 8000)
# EXPOSE 8000

# # Set the environment variable for production
# ENV PROD_URL=http://localhost:8000
# # The GOOGLE_GENAI_API_KEY should be passed as an environment variable at runtime
# # Example: docker run -e GOOGLE_GENAI_API_KEY=your_api_key image_name
# ENV PORT=8000
# ENV ALLOWED_ORIGIN=http://localhost:5173
# ENV MONGO_URI=mongodb+srv://yogesh12212071:liachat@liachat.klb1hm.mongodb.net/?retryWrites=true&w=majority&appName=liaChat

# # Start the backend server
# CMD ["npm", "start"]

# Use a Node.js image as the base for the backend
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to install dependencies
# This helps leverage Docker's caching mechanism
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your Node.js backend server is listening on (e.g., 3000)
EXPOSE 8000

# Command to run your backend application
# This assumes your main server entry file is 'index.js' in the backend root
CMD ["npm", "start"]
