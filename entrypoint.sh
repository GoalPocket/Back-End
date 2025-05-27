#!/bin/sh

echo "🛠️ Running Prisma Migrate Deploy..."
npx prisma migrate deploy

echo "🚀 Starting the server..."
node src/server.js
