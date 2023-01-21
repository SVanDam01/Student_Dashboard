import React from "react";
import FilterByItems from "./FilterByItems.js";

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
      <FilterByItems
        filtertext={"name"}
        filterNames={studentNames}
        filterByItem={filterByName}
        setFilter={setFilterByName}
        updateFilter={updateNamesToFilter}
      />
      <FilterByItems
        filtertext={"assignment"}
        filterNames={assignmentNames}
        filterByItem={filterByAssignment}
        setFilter={setFilterByAssignment}
        updateFilter={updateAssignmentToFilter}
      />
    </div>
  );
}

export default FiltersBox;
