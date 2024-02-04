import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateUser from "./CreateUser";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const getCharts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/chart");
      setDatas(data);
    } catch (err) {
      alert("cannot get data");
      console.log(err);
    }
  };
  useEffect(() => {
    getCharts();
  }, []);

  return (
    <div>
      {datas.map((data) => {
        return (
          <h1>
            {data.name}, {data.age}, {data.gender}
          </h1>
        );
      })}
      <CreateUser getCharts={getCharts} />
    </div>
  );
};

export default Home;
