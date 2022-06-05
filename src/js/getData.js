const axios = require('axios').default;

export default function getConfiguration(url) {
  const data = axios.get(url);
  return data;
}
