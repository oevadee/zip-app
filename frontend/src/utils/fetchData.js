import axios from 'axios';
import { API_HOST } from "../config/index";


const fetchData = async (uri) => {
  const data = await axios.get(`http://${API_HOST}/api/users`);
  return data;
};

export default fetchData;
