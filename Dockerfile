FROM node:12.16.1-alpine

# To Build: 
# 1. npm run deploy-to-docker
# docker run --rm --name woowoofund-app -p 8080:3000 -ti woohoofund/app:latest

# Change working directory
WORKDIR /app

COPY package*.json ./

# Install npm production packages 
RUN npm install --production

COPY dist_prod /app/dist_prod

ARG NAMESPACE=app

ENV NAMESPACE=${NAMESPACE}

EXPOSE 3000

USER node

CMD ["npm", "run", "launch-production"]
