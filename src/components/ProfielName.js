import React, { useState } from "react";
import Profielicon from "../icon/profiel.png";

function ProfielName({ studentNames }) {
  // ** SET STATE FOR TOGGLEPROFIEL ** //
  const [toggleProfiel, settoggleProfiel] = useState(false);

  // ** SET FUNCTION FOR CHANGE CHECKED STATUS ALL ** //
  //   function handleChange() {}

  // ** SET CONST FOR IETS CHECKBOX BASED ON NAME AND CALL FilterNames Component ** //
  const studentName = studentNames.map((studentName, index) => (
    <div key={index} className="profiel-name">
      <p>{studentName.name}</p>
      {/* <button>Profiel</button> */}
      <img className="profielicon" src={Profielicon} alt="profiel icon" />
    </div>
  ));

  return (
    <div className="flex-filter">
      <h2>Profiels</h2>
      <button onClick={() => settoggleProfiel(!toggleProfiel)}>Go to</button>
      {toggleProfiel ? <div className="profilebox">{studentName}</div> : <></>}
    </div>
  );
}

export default ProfielName;
