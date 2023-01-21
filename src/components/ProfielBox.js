import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profielicon from "../icon/profiel.png";

function ProfielBox({ studentNames }) {
  // ** SET STATE FOR TOGGLEPROFIEL ** //
  const [toggleProfiel, settoggleProfiel] = useState(false);

  // ** SET CONST FOR IETS CHECKBOX BASED ON NAME AND CALL FilterNames Component ** //
  const studentName = studentNames.map((studentName, index) => (
    <div key={index}>
      <Link className="profiel-name" to={`/student/${studentName.name}`}>
        <img className="icon" src={Profielicon} alt="profiel icon" />
        {studentName.name}
      </Link>
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

export default ProfielBox;
