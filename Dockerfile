# Etapa 1: Build com variáveis
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production && npm install --only=dev
COPY . .

# Copia .env ou .env.production (dependendo do que você usar)
COPY .env.example .env

RUN npm run build

# Etapa 2: Servir com nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
