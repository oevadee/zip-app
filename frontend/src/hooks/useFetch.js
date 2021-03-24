import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);

  const fetch = async () => {
    const { data: newData } = await axios.get(
      'http://localhost:8080/api' + url,
    );
    console.log(newData);
    setData(newData);
  };

  useEffect(() => {
    fetch();
  }, []);


  return data;
};

export default useFetch;
