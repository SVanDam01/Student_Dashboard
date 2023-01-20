// import React, { useState } from "react";

function Profiel({ profile }) {
  return (
    <div className="flex-filter">
      <h2>Profile</h2>
      <div className="studentProfile">
        <img src={profile[0].photo} alt="profile" />
        <p>Name:</p> {profile[0].name}
        <p>Age:</p> {profile[0].age}
        <p>gender:</p> {profile[0].gender}
        <p>E-mail address:</p> {profile[0].email}
        <p>Phone number:</p> {profile[0].phone}
      </div>
    </div>
  );
}

export default Profiel;
