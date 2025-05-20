# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Cria diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY package*.json ./
COPY . .

# Instala dependências e constrói o projeto
RUN npm install
RUN npm run build

# Etapa 2: Servir os arquivos com um servidor web leve
FROM nginx:alpine

# Remove configurações padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos do build para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia uma configuração personalizada do Nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]
