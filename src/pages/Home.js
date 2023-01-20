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

  // ** SET STATE FOR FILTERD ASSIGNMENTS ** // ####
  const [filterByAssignment, setFilterByAssignment] = useState([]);

  // ** SET INPUT FOR FILTERNAMES ** //
  const studentNames = [];
  for (const item of data) {
    const isDuplicate = studentNames.find((obj) => obj.name === item.name);
    if (!isDuplicate) {
      studentNames.push({ name: item.name });
    }
  }

  // ** SET INPUT FOR FILTER ASSIGNMENT ** // #####
  const assignmentNames = [];
  for (const item of data) {
    const isDuplicate = assignmentNames.find(
      (obj) => obj.name === item.assignment
    );
    if (!isDuplicate) {
      assignmentNames.push({ name: item.assignment });
    }
  }

  // ** SET FUNCTION FOR ADDING FILTERNAMES ** //
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

  // ** SET FUNCTION FOR ADDING FILTER ASSIGNMENTS ** // #####
  function updateAssignmentToFilter(filterassignment) {
    if (filterByAssignment.includes(filterassignment)) {
      // "check assignment in filter, true?", delete assignment from array
      const deleteFilteredNames = filterByAssignment.filter((name) => {
        return !name.includes(filterassignment);
      });
      setFilterByAssignment(deleteFilteredNames);
    } else {
      const addFilteredNames = [...filterByAssignment, filterassignment];
      setFilterByAssignment(addFilteredNames);
      // "New array with assignment"
    }
  }

  // ** SET CONST FOR SET FILTER BY NAME & ASSIGNMENT ** // ######
  const filteredAssignment = data.filter((e) => {
    return !filterByAssignment.includes(e.assignment);
  });

  const filteredNames = filteredAssignment.filter((e) => {
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
        <h1>Students Dashboard</h1>
      </header>
      <div className="wrapper">
        <div className="sidebar">
          <ProfielBox studentNames={studentNames} />
          <FiltersBox
            studentNames={studentNames}
            assignmentNames={assignmentNames}
            setFilterByName={setFilterByName}
            setFilterByAssignment={setFilterByAssignment}
            updateNamesToFilter={updateNamesToFilter}
            updateAssignmentToFilter={updateAssignmentToFilter}
            filterByName={filterByName}
            filterByAssignment={filterByAssignment}
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
