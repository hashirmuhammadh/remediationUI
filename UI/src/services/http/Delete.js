import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setAlert } from "../../app/features/AlertSlice";
import api from "../Api";

const useFetch_DELETE = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // const dispatch = useDispatch();

  const deleteData = async (url) => {
    setIsLoading(true);
    try {
      const response = await api.delete(url);
      setData(response?.data);
      // dispatch(setAlert({ status: response?.status, open: true }));
    } catch (error) {
      // dispatch(setAlert({ status: error?.response?.status, open: true }));
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        // dispatch(setAlert({ status: null, open: false }));
      }, 3000);
    }
  };

  return { isLoading, error, data, deleteData };
};

export default useFetch_DELETE;
