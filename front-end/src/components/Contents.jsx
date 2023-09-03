import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Contents = () => {
  const [username, setUsername] = useState("");
  const [gotData, setGotData] = useState([]);
  const [showIcon, setShowIcon] = useState(true);
  const handleInputChange=(e)=>{
    setUsername(e.target.value);

    setShowIcon(e.target.value==="");
  }
  const handleInputFocus=()=>{
    setShowIcon(false);
  }
  const handleInputBlur=()=>{
    if(username===""){
      setShowIcon(true);
    }
  }
  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getuserdata`, {
        params: {
          username,
        },
      });
      console.log(response.data);
      setGotData(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="contents">
      <h1>Leetcode Users Info.</h1>
      <label htmlFor="username" className="userlabel">
        Username
      </label>
      <div className="input-group">
        {showIcon&&(<FontAwesomeIcon icon={faSearch} size="2x" className="searchIcon" />)}
        <input
          type="text"
          onChange={handleInputChange}
          className="userInput" onFocus={handleInputFocus} onBlur={handleInputBlur}
        />
        <br />
        <button onClick={getUserData} className="userbtn">
          Show
        </button>
      </div>
      {gotData!=""?
           <table cellSpacing={0}>
           <thead>
             <tr>
               <th>SNO.</th>
               <th>Title</th>
               {/* Add more table headers as needed */}
             </tr>
           </thead>
           <tbody>
             {gotData
               ? gotData.map((item, index) => (
                   <tr key={index}>
                     <td>{index + 1}</td>
                     <td>{item.title}</td>
                     {/* Render more table cells based on your data structure */}
                   </tr>
                 ))
               : ""}
           </tbody>
         </table>:""
      }
    </div>
  );
};

export default Contents;
