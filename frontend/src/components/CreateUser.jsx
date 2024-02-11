import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const CreateUser = ({ getCharts, initialData }) => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [errors, setErrors] = useState([]);
  const [mode, setMode] = useState("insert");

  useEffect(() => {
    // if (initialData !== undefined) {
    // if (initialData !== undefined) { is equal if (!initialData) {
    if (initialData) {
      setName(initialData.name);
      setAge(initialData.age);
      setGender(initialData.gender);
      setMode("update");
    }
  }, [initialData]);

  const resetData = () => {
    setName("");
    setAge("");
    setGender("");
    setMode("insert");
  };

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
      let returnData;

      if (mode === "update") {
        returnData = (
          await axios.put("http://localhost:8080/api/chart", {
            name,
            age,
            gender,
            id: initialData.id,
          })
        ).data;
      } else {
        returnData = (
          await axios.post("http://localhost:8080/api/chart", {
            name,
            age,
            gender,
          })
        ).data;
      }

      if (returnData?.success) {
        setErrors([]);
        getCharts();
        resetData();
      } else {
        alert(JSON.stringify(returnData));
        setErrors(["Cannot process! Try again"]);
      }
    } catch (error) {
      if (error.response.status === 400) {
        const msgs = error.response.data.errors.map((err) => {
          return err.msg;
        });
        setErrors(msgs);
        return;
      }
      setErrors(["Cannot process! Try again"]);
    }
  };

  return (
    <form onSubmit={handlePost}>
      {errors.map((err) => {
        return <p>{err}</p>;
      })}
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select type="text" onChange={(e) => setGender(e.target.value)}>
        <option>Select Gender</option>
        <option selected={gender === "M"}>M</option>
        <option selected={gender === "F"}>F</option>
      </select>
      {mode === "insert" && <button type="submit">Add</button>}
      {mode === "update" && <button type="submit">Update</button>}
      <button onClick={() => resetData()} type="button">
        Cancel
      </button>
    </form>
  );
};
export default CreateUser;
