# Dependencies

FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install

# Copy app source files to our directory
COPY . /app
CMD ["npm", "start"]
