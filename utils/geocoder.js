import GeoCoder from 'node-geocoder';
import dotenv from 'dotenv';
dotenv.config();

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: 'http',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = GeoCoder(options);

export default geocoder;
