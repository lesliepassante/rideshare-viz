# Rideshare visualization

This project is a visualization tool for rideshare data. It can display live data in the internal admin panel of a rideshare company, or display the results of a routing simulation. We can watch route requests appearing and being assigned, and drivers picking up and dropping off passengers.

![Screenshot of Rideshare viz](demo/rideshare-viz-screengrab.png?raw=true)

## Demo

Check out a live demo [here](https://rideshare-viz.lesliepassante.com).

## Data format

We expect data to be formatted in a timecoded series of GeoJSON files, representing snapshots of the current state of the system. The GeoJSON files must be annotated with custom properties to designate drivers and riders.

An [example data set](https://rideshare-viz.lesliepassante.com/assets/example-geojson.zip) is available for use. It has been generated based on [taxi data](https://dfhv.dc.gov/page/dfhv-dashboard-and-statistical-data-sets) provided by Washington, D.C. government, but altered to show multiple riders being assigned per driver.

## Configuring your environment

We use [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/api/) to render the interactive map, so Mapbox credentials are required to run this project. Your environment must contain a [Mapbox access token](https://docs.mapbox.com/help/glossary/access-token/) with **public scopes**. If desired, you can also override the default map style with a [custom style](https://docs.mapbox.com/studio-manual/reference/styles/).

To supply the Mapbox access token and map style, either populate a `.env` file in the root of this repo, as shown by [.env.example](.env.example), or set the following environment variables:

```Shell
export MAPBOX_ACCESS_TOKEN=pk.foo.bar # required
export MAPBOX_STYLE=mapbox://styles/foo # optional; will default to mapbox://styles/mapbox/light-v9
```

## Running a development server

After cloning this repository and configuring your environment, run:

```Shell
npm install  # install dependencies
npm start  # start development server on localhost:8080
```

## Building a static site for production

After cloning this repository and configuring your environment, run:

```Shell
npm run build:ci # install dependencies, run unit tests, and build static site
```

This will result in a `/dist` folder containing the static site, ready for publishing.

## Previewing the production build with Docker

This repository contains a `Dockerfile` that builds an image of the static site, served with `nginx`. This is in no way optimized for production use, but intended as a convenient way to preview the production site locally.

After cloning this repository and configuring your environment, run the following commands. Note that `-e MAPBOX_STYLE="$MAPBOX_STYLE"` is optional and will default to [Mapbox Light](https://www.mapbox.com/maps/light-dark/).

```Shell
docker build --tag rideshare-viz . # build image
docker run -d -p 8080:80 -e MAPBOX_ACCESS_TOKEN="$MAPBOX_ACCESS_TOKEN" -e MAPBOX_STYLE="$MAPBOX_STYLE" rideshare-viz # start project on localhost:8080
```

Once the container is running, the demo is accessible on [localhost:8080](http://localhost:8080).
