FROM node:19

WORKDIR /node_app
COPY package.json ./
COPY package-lock.json ./
RUN npm install

WORKDIR /node_app/app
COPY . .
EXPOSE 5173

CMD ["npm", "run", "dev --host"]
