import React, { useEffect, useState } from "react";

const Realestate = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const url =
      "http://localhost:8080/apis/v1/conversations/messages?%20realEstateId=2&buyerId=2&sellerId=3";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })

      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return error;
  return (
    <div>
      <div className="deal"></div>
      <div className="appointment"></div>
    </div>
  );
};

export default Realestate;
