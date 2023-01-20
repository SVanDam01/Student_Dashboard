import React, { useState } from "react";
import Data from "../data/Data.js";
import Table from "../components/Table.js";
import FiltersBox from "../components/FiltersBox.js";
import ProfielBox from "../components/ProfielBox.js";
import BarChart from "../components/BarChart.js";

function Home() {
  // ** IMPORT DATA FORM DATA FILE ** //
  const { data, loading, error } = Data();

  // ** SET STATE FOR FILTERD NAMES ** //
  const [filterByName, setFilterByName] = useState([]);

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
    if (filterByName.includes(filtername)) {
      // "check naam in filter, true?", delete naam from array
      const deleteFilteredNames = filterByName.filter((name) => {
        return !name.includes(filtername);
      });
      setFilterByName(deleteFilteredNames);
    } else {
      const addFilteredNames = [...filterByName, filtername];
      setFilterByName(addFilteredNames);
      // "New array with name"
    }
  }

  // ** SET CONST FOR SET FILTER BY NAME ** //
  const filteredNames = data.filter((e) => {
    return !filterByName.includes(e.name);
  });

  // ** GROUP DATA PER ASSIGNMENT ** //
  const dataGroupedByAssignment = filteredNames.reduce((groupedItem, item) => {
    const assignment = item.assignment;
    if (groupedItem[assignment] == null) groupedItem[assignment] = [];
    groupedItem[assignment].push(item);
    return groupedItem;
  }, {});

  // ** SET AVERAGE FOR FUN & DIFFICULTY PER ASSIGNMENT ** //
  const calculateAverage = Object.fromEntries(
    Object.entries(dataGroupedByAssignment).map(([key, values]) => {
      const averages = {};
      ["difficulty", "fun"].forEach((key) => {
        averages[key] =
          values.reduce((total, value) => total + value[key], 0) /
          values.length;
      });
      return [key, averages];
    })
  );

  return (
    <div className="home">
      <header>
        <h1>Student Dashboard</h1>
      </header>
      <div className="wrapper">
        <div className="sidebar">
          <ProfielBox studentNames={studentNames} />
          <FiltersBox
            studentNames={studentNames}
            setFilterByName={setFilterByName}
            updateNamesToFilter={updateNamesToFilter}
            filterByName={filterByName}
          />
        </div>
        <main className="main">
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            <p>Oeps.. Sommething is wrong...</p>
          ) : (
            <div>
              <div className="chart-container">
                <h2>AVERAGE OUTCOME PER ASSIGNMENT</h2>
                <BarChart inputBarChart={calculateAverage} />
              </div>
              <div className="table-container">
                <h2>TABLE OF DETAIL</h2>
                <Table data={filteredNames} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
