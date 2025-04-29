# Product Management API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

A RESTful API for managing products built with Node.js, Express, and TypeScript.

## Features

- Create, read, update, and delete products
- TypeScript support
- Environment variable configuration
- Seeding capability for initial data

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB (or MongoDB Atlas for cloud database)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wahabtaofeeqo/breet.git
   cd breet
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your configuration.

4. Seed the database with initial product data:
   ```bash
   npx ts-node database/product.seed.ts
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

For detailed API documentation with examples, please refer to:
[Postman Documentation](https://documenter.getpostman.com/view/12718294/2sB2j1itEq)

## Available Scripts

- `npm run dev`: Start the development server