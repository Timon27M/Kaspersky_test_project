# Этап сборки
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап запуска (Vite preview)
# FROM node:20-slim
# WORKDIR /app
# COPY --from=build /app/dist ./dist
# COPY package*.json ./
# RUN npm install --only=production

# EXPOSE 5173
# CMD ["npm", "start"]
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]