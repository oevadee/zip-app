import axios from 'axios';
import config from "../config";

const fetchData = async (uri) => {
  const data = await axios.get(`/api/users`);
  return data;
};

export default fetchData;
