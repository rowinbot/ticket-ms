#!/bin/bash

# Install dependencies

pnpm install
echo "✅ Dependencies installed..."

# Setup the

cd apps/api
rm -rf prisma/dev.db
pnpm prisma generate
pnpm prisma db push
pnpm prisma db seed

echo "✅ Prisma SQLite DB setup..."