import axios from 'axios';

const fetchData = async (uri) => {
  const data = await axios.get('http://localhost:8080/api/users');
  return data;
};

export default fetchData;
