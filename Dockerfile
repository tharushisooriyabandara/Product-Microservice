FROM node:20
 
WORKDIR /app
 
# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./
 
# Install npm dependencies
RUN npm install
 
# Copy the rest of the application code
COPY . .
 
# Expose port 5000
EXPOSE 8002
 
# Start the application
CMD ["node", "index.js"]