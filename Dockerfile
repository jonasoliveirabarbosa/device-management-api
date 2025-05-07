FROM node:20

# Set working directory for all build stages.
WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD [ "yarn", "run", "start:dev" ]
