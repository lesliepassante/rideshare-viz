#!/bin/sh
[ -z "$MAPBOX_ACCESS_TOKEN" ] && echo "MAPBOX_ACCESS_TOKEN must be supplied via the -e flag. Exiting." && exit 1
template='{"MAPBOX_ACCESS_TOKEN":"%s","MAPBOX_STYLE":"%s"}'
config_file=$(printf "$template" "$MAPBOX_ACCESS_TOKEN" "$MAPBOX_STYLE")
echo "$config_file" > $1/config.json
nginx -g 'daemon off;'
