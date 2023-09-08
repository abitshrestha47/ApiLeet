import { useState ,useEffect} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Contents = () => {
  const [username, setUsername] = useState("");
  const [gotData, setGotData] = useState([]);
  const [showIcon, setShowIcon] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]=useState(null);
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
  useEffect(() => {
    if (username === "") {
      resetData();
    }
  }, [username]);
  const resetData=()=>{
    setGotData([]);
    setError(null);
  }
  const getUserData = async () => {
    try {
      setIsLoading(true);
      resetData();
      const response = await axios.get(`http://localhost:3000/getuserdata`, {
        params: {
          username,
        },
      });
      const responsedata=response.data;
      // console.log(responsedata);
      if(responsedata.length===0){
        setError('No data available or empty for this user.')
      }
      else{
        setGotData(responsedata);
      }
    } catch (err) {
      console.log(err.message);
      if(err.message==='Request failed with status code 500'){
        setError('User not found');
      }
      if(err.message==='Network Error'){
        setError("Internet is not available");
      }
    }finally {
      setIsLoading(false); 
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
      <br />
      {isLoading?<div><p>Loading...</p><br/><p className="sometime">!! This may take sometime...</p></div>:''}
      {error && <p className="errormessage">{error}</p>}
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
                     <td>{item}</td>
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
