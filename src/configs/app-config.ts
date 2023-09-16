import 'dotenv/config';

export const appConfig = {
  port: process.env.PORT || 3000,
  keys: {
    google: { maps: process.env.GOOGLE_MAPS_API_KEY || '' },
  },
};
