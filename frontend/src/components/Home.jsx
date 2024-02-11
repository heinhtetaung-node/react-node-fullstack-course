import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateUser from "./CreateUser";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [initialData, setInitialData] = useState();

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

  const edit = (id) => {
    // const editData = datas.find((data) => data.id === id);
    const {
      name,
      age,
      gender,
      id: updateId,
      ...rest
    } = datas.find((data) => data.id === id);
    console.log("rest", rest);
    // setInitialData({
    //   name: name,
    //   age: age,
    //   gender: gender,
    // });
    setInitialData({
      name,
      age,
      gender,
      id: updateId,
    });
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8080/api/chart/${id}`);
    getCharts();
  };

  return (
    <div>
      <CreateUser getCharts={getCharts} initialData={initialData} />
      {datas.map((data) => {
        return (
          <>
            <h1>
              {data.name}, {data.age}, {data.gender}
            </h1>
            <button onClick={() => edit(data.id)}>Edit</button>
            <button onClick={() => deleteItem(data.id)}>Delete</button>
          </>
        );
      })}
    </div>
  );
};

export default Home;
