import React from "react";
import FilterByNames from "./FilterByNames.js";
import FilterByAssignments from "./FilterByAssignments.js";

function FiltersBox({
  studentNames,
  assignmentNames,
  filterByName,
  filterByAssignment,
  setFilterByName,
  setFilterByAssignment,
  updateNamesToFilter,
  updateAssignmentToFilter,
}) {
  return (
    <div className="flex-filter">
      <h2>Filters</h2>
      <FilterByNames
        studentNames={studentNames}
        filterByName={filterByName}
        setFilterByName={setFilterByName}
        updateNamesToFilter={updateNamesToFilter}
      />
      <FilterByAssignments
        assignmentNames={assignmentNames}
        filterByAssignment={filterByAssignment}
        setFilterByAssignment={setFilterByAssignment}
        updateAssignmentToFilter={updateAssignmentToFilter}
      />
    </div>
  );
}

export default FiltersBox;
