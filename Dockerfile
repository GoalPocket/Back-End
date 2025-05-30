FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

# RUN npm run build  # kalau tidak perlu build vite, bisa dikomentari

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3002

CMD ["./entrypoint.sh"]
