import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../apiConfig";

export default function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${endpoint}`);
        setData(response.data.drinks);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [endpoint]);

  return { data, loading };
}
