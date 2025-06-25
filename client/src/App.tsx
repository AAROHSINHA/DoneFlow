import { useState } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");
  const handleSubmit = async () => {
    if (!name) return alert("Name is empty!");

    try{
      await axios.post("http://localhost:5000/api/names", { name }, {
        withCredentials: true
      });
      alert("Name Submitted");
      setName("");
    }catch(error){
      console.log("Failed To Send Name");
      alert("Error Submitting Name");
    }

  }
  return (
    <div className="w-[100vw] h-[100vh] bg-red-100 flex flex-col items-center">
      <p className="font-bold text-5xl">DONEFLOW</p>
      <input type="text" className="bg-white w-[40%] h-[5vh]" onChange={(e) => setName(e.target.value)}/>
      <button className="bg-black text-white w-[20vh] h-[5vh] hover:cursor-pointer" onClick={handleSubmit}>SUBMIT</button>
      <p>{name}</p>
    </div>
  )
}

export default App;
