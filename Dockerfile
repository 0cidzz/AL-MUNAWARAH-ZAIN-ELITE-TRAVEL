FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json ./
RUN npm install

FROM node:22-alpine AS dev

WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

FROM deps AS build

WORKDIR /app
COPY . .
RUN npm run build
