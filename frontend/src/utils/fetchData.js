import axios from 'axios';
import config from "../config";

const fetchData = async (uri) => {
  const data = await axios.get(`http://${config.API_HOST}/api/users`);
  return data;
};

export default fetchData;
