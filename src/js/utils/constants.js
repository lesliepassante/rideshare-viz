export const FILES_PER_SECOND = 1;
export const FRAMERATE = 30;
export const FRAMES_PER_FILE = Math.ceil(FRAMERATE / FILES_PER_SECOND);
export const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
export const MAPBOX_STYLE = process.env.MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v9';
export const SECONDS_TO_BUFFER = 5;
export const SECONDS_TO_SKIP = 2;
