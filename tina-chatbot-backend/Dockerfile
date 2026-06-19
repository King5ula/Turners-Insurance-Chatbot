# Step 1: Use the official lightweight Node.js environment
FROM node:20-alpine

# Step 2: Create a secure folder inside the container for our application
WORKDIR /app

# Step 3: Copy our dependencies manifest configurations first
COPY package*.json ./

# Step 4: Install a clean production package layer inside the container
RUN npm install --only=production

# Step 5: Copy the rest of our backend code into the container
COPY . .

# Step 6: Inform Docker which network port our server uses
EXPOSE 3000

# Step 7: The actual runtime command to fire up our Express server
CMD ["npm", "start"]