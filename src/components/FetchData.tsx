import React, { useEffect } from "react";

const fetchDataFromApi = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return await response.json();
};

const FetchData = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDataFromApi().then((data) => console.log(data));
    }, 100000);
    return () => clearInterval(intervalId);
  }, []);
  return <div>FetchData</div>;
};

export default FetchData;
