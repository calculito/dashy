import React, {useState} from "react";


const Links = () => {
  const [savedLink, setLinkSaved] = useState([]);
  const [linkFromInput, setLinkFromInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setLinkFromInput(event.target.value)
  }

  const createLink = () => {
      if (linkFromInput !== "") {
          setErrorMessage("")
          setLinkSaved(savedLink.concat(linkFromInput))
      } else {
          setErrorMessage("Please enter a link")
      }
  };

  

  return (
      <div id="links">
          <h3>You have {savedLink.length} links</h3>   

          <input type="text" placeholder="Save your link" value={linkFromInput} onChange={handleInputChange} />

          {errorMessage ? <a>{errorMessage}</a> : null}

          <button onClick={createLink}>Save</button>

          {savedLink.map((link, index) => {
              return <div>
                <ul>
                  <li>
                    <a href={linkFromInput} target="_blank" key={index}>{link}</a>
                  </li>
                </ul>
             </div>
              
          })}         
          
      </div>
  );
}


export default Links;
