FROM node:17-alpine

WORKDIR /fronend

COPY . .

RUN npm install 
RUN npm i @angular/cli

EXPOSE 4200

CMD ["npm", "start"]

