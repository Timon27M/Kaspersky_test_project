FROM node:20 AS build
WORKDIR /app
COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install --include=dev

RUN rm -rf node_modules/typescript node_modules/.bin/tsc
RUN npm install typescript@latest --force --no-save

RUN cat node_modules/typescript/bin/tsc || echo "TSC FILE EMPTY OR MISSING"

RUN node node_modules/typescript/bin/tsc --version

COPY . .

RUN node node_modules/typescript/bin/tsc

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "dist/app.js"]