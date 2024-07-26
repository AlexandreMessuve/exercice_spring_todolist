#Stage 1 on utilise l'image node qui sera l'image qui buildera notre application
FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

#Installation des dépendance
RUN npm install

COPY . .
#Build de l'application
RUN npm run build

#Stage 2 on creer une image a partir d'nginx
FROM nginx:stable-alpine

LABEL author="alexandre.messuves@gmail.com"

#On copie notre application build dans le dossier html de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# On remplace la configuration par default pour pouvoir éviter les erreur 404
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]