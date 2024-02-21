FROM node:20 AS build
WORKDIR /app
COPY ClientApp/package*.json ./
RUN npm install
COPY ClientApp/ ./
RUN npm run build

FROM nginx:alpine AS runtime
COPY --from=build /app/dist/browser /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
