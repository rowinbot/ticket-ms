# Ticket Management System (test)

## Description

Simple Node.js + React playground with the following features:

- List tickets
- Use filters to search tickets

## Installation

1. Clone the repository
2. Run `pnpm run setup` in the root directory

## Usage

1. Run `pnpm dev` in the root directory

That will start the api server and the Vite web server in development mode under [localhost:5173](http://localhost:5173/)

## Structure

The project is a monorepo with the following structure:

- `apps/api/`: Node.js API server
- `apps/web/`: React web app
- `packages/types/`: Shared types and structure, for the lack of a better name
