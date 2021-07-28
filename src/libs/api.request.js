import HttpRequest from '@/libs/axios';
import config from '@/config';

const baseUrl = `${window.location.protocol}//${window.location.host}/${config.baseUrl}`

const axios = new HttpRequest(baseUrl);
export default axios;
