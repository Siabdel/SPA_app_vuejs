
# Étape de build
FROM node:16-alpine as build-stage

WORKDIR /app

# Copier les fichiers de dépendances d'abord pour mieux utiliser le cache
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers
COPY . .

# Build l'application
RUN npm run build

# Étape de production
FROM nginx:alpine as production-stage

# Copier les fichiers buildés depuis l'étape précédente
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]