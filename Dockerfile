# To use this Dockerfile, run the following:
#
# docker build --build-arg MAPBOX_ACCESS_TOKEN="$MAPBOX_ACCESS_TOKEN" \
#              --build-arg MAPBOX_STYLE="$MAPBOX_STYLE" \
#              --tag rideshare-viz .
#
# docker run -p 8080:80 rideshare-viz

FROM node:10.16-alpine AS builder
WORKDIR /build
COPY . ./
ARG MAPBOX_ACCESS_TOKEN
ARG MAPBOX_STYLE=mapbox://styles/mapbox/light-v9
ENV MAPBOX_ACCESS_TOKEN=$MAPBOX_ACCESS_TOKEN
ENV MAPBOX_STYLE=$MAPBOX_STYLE
RUN npm ci && npm run build

FROM nginx:1.17.3-alpine
COPY --from=builder /build/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]