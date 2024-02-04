import axios from "axios";
import { useState } from "react";

const CreateUser = ({ getCharts }) => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();

  const handlePost = async (e) => {
    e.preventDefault();
    // let data = JSON.stringify({
    //     "name": "Bhone",
    //     "age": "24",
    //     "gender": "M"
    //   });
    //   let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'http://localhost:8080/api/chart',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data : data
    //   };
    //   axios.request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    try {
      const { data } = await axios.post("http://localhost:8080/api/chart", {
        name,
        age,
        gender,
      });
      if (data?.success) {
        getCharts();
      } else {
        alert(JSON.stringify(data));
        alert("cannot create");
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <form onSubmit={handlePost}>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <input type="text" onChange={(e) => setAge(e.target.value)} />
      <input type="text" onChange={(e) => setGender(e.target.value)} />
      <button>Add</button>
    </form>
  );
};
export default CreateUser;
