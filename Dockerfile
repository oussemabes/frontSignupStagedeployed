# build environment
FROM node:19-alpine as build
WORKDIR /app
COPY package*.json ./
RUN ["npm","ci"]
COPY ./ ./
EXPOSE 80
RUN ["npm", "run","build"]

# production environment
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html


# Add bash
RUN apk add --no-cache bash

# Make our shell script executable

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]