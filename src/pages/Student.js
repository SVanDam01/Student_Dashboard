import Data from "../data/Data.js";
import ProfileData from "../data/ProfileData.js";
import Table from "../components/Table.js";
import Profiel from "../components/Profiel.js";
import BarChart from "../components/BarChart.js";
import { Link } from "react-router-dom";
import Profielicon from "../icon/home.png";
import { useParams } from "react-router-dom";

function Student() {
  // GET NAME FROM URL
  const { name } = useParams();
  const filterByName = name;

  // ** IMPORT DATA FORM DATA FILE ** //
  const { data, loading, error } = Data();

  // ** SET CONST FOR PROFILEDATA ** //
  const profile = ProfileData.filter((e) => {
    return filterByName.includes(e.name);
  });

  // ** SET CONST FOR SET FILTER BY NAME ** //
  const filteredNames = data.filter((e) => {
    return filterByName.includes(e.name);
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
    <div>
      <header className="student">
        <div>
          <Link className="back-to-home" to={"/"}>
            <img className="icon" src={Profielicon} alt="home icon" />
            Back
          </Link>
        </div>
        <h1>Dashboard of {name} </h1>
      </header>
      <div className="wrapper">
        <div className="sidebar">
          <Profiel profile={profile} />
        </div>
        <main className="main">
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            <p>Oeps.. Sommething is wrong...</p>
          ) : (
            <div>
              <div className="chart-container">
                <h2>OUTCOME PER ASSIGNMENT</h2>
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

export default Student;
