import React, { useState } from "react";
import FilterNames from "../components/FilterNames.js";

function Filters({ studentNames, setFilter, updateNamesToFilter }) {
  // ** SET STATE FOR CHECKBOXES ** //
  const [checked, setChecked] = useState(true);

  // ** SET FUNCTION FOR CHANGE CHECKED STATUS ALL ** //
  function handleChange(event) {
    setChecked(!checked);
    if (!checked) {
      setFilter([]);
    } else {
      const result = studentNames.map((a) => a.name);
      setFilter(result);
    }
  }

  const studentName = studentNames.map((studentName, index) => (
    <FilterNames
      studentName={studentName.name}
      CheckedAll={checked}
      key={index}
      updateNamesToFilter={updateNamesToFilter}
    />
  ));

  return (
    <div className="flex-filter">
      <h2>Filter</h2>
      <div className="filter-item">
        <label className="filter-name">
          <input
            className="filter-checkbox"
            type="checkbox"
            name="All"
            value="All"
            checked={checked}
            onChange={handleChange}
          />
          All
        </label>
        <div className="name">{studentName}</div>
      </div>
    </div>
  );
}

export default Filters;
