import axios from 'axios';
import https from 'https';

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // Disable SSL certificate verification
  }),
});

export default axiosInstance;
