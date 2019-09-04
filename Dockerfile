# docker build --tag rideshare-viz .
# docker run -d -p 8080:80 -e MAPBOX_ACCESS_TOKEN="$MAPBOX_ACCESS_TOKEN" -e MAPBOX_STYLE="$MAPBOX_STYLE" rideshare-viz

FROM node:10.16-alpine AS builder
WORKDIR /build
COPY . ./
RUN npm run build:ci

FROM nginx:1.17.3-alpine
COPY --from=builder /build/dist /usr/share/nginx/html
COPY ./scripts/docker-startup.sh /startup.sh 
RUN chmod +x /startup.sh
EXPOSE 80
ENTRYPOINT ["/startup.sh", "/usr/share/nginx/html"]