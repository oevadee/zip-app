import axios from 'axios';

const fetchData = async (uri) => {
  const data = await axios.get('/api/users');
  return data;
};

export default fetchData;
