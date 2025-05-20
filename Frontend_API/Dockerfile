# Etapa 1: Build da aplicação
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Imagem NGINX para servir os arquivos estáticos
FROM nginx:alpine

# Copia os arquivos gerados pelo build para o diretório do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia um arquivo customizado de config do NGINX, se quiser (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
