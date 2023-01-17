import React, { useState } from "react";
import Data from "../data/Data.js";
import Table from "../components/Table.js";
import Filters from "../components/Filters.js";

function Home() {
  const { data, loading, error } = Data();
  const [filter, setFilter] = useState([]);

  // ** SET INPUT FOR FILTERNAMES ** //
  const studentNames = [];
  for (const item of data) {
    const isDuplicate = studentNames.find((obj) => obj.name === item.name);
    if (!isDuplicate) {
      studentNames.push({ name: item.name });
    }
  }

  // // ** SET FUNCTION FOR ADDING FILTERNAMES ** //
  function updateNamesToFilter(filtername) {
    if (filter.includes(filtername)) {
      // console.log("array voor deleting naam", filter);
      // console.log("check naam in filter, true?", filter.includes(filtername));
      const deleteFilteredNames = filter.filter((e) => {
        return !e.includes(filtername);
      });
      setFilter(deleteFilteredNames);
      // console.log("nieuwe array zonder naam", deleteFilteredNames);
    } else {
      const addFilteredNames = [...filter, filtername];
      setFilter(addFilteredNames);
      // console.log("nieuwe array met naam", addFilteredNames);
    }
  }

  // console.log(studentNames);

  // ["Evelyn", "Maurits", "Sandra", "Aranka"]

  // console.log(filter);

  // ** SET FUNCTION FOR SET FILTER BY NAME ** //
  const filteredNames = data.filter((e) => {
    return !filter.includes(e.name);
  });

  // console.log(filteredNames);

  return (
    <div className="home">
      <header>
        <h1>Student Dashboard</h1>
      </header>
      <div className="wrapper">
        <div className="sidebar">
          <Filters
            studentNames={studentNames}
            setFilter={setFilter}
            updateNamesToFilter={updateNamesToFilter}
          />
        </div>
        <main className="main">
          {loading ? (
            <p>laden...</p>
          ) : error ? (
            <p>Oeps.. Er gaat iets mis</p>
          ) : (
            <Table data={filteredNames} />
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
