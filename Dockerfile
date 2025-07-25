FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3002

CMD ["./entrypoint.sh"]
