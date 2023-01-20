import React, { useState, useEffect, useRef } from "react";
import FilterByAssignment from "./FilterByAssignment.js";

function FilterByAssignments({
  assignmentNames,
  filterByAssignment,
  setFilterByAssignment,
  updateAssignmentToFilter,
}) {
  // ** SET STATE FOR CHECKBOXES ** //
  const [checked, setChecked] = useState(true);

  // ** SET STATE FOR TOGGLEFILTER ** //
  const [toggleFilter, settoggleFilter] = useState(false);

  // ** SET FUNCTION FOR CHANGE CHECKED STATUS ALL ** //
  function handleChange() {
    if (checked) {
      setChecked(false);
      const result = assignmentNames.map((a) => a.name);
      setFilterByAssignment(result);
    } else {
      setChecked(true);
      setFilterByAssignment([]);
    }
  }

  // ** SET USEFFECT FOR CHECKING CHECKBOX ALL BASED ON STATUS ALL CHECKBOXES CHECKED ** //
  const checkboxRef = useRef();
  useEffect(() => {
    let clean = false;
    const filteredArrayLenght = filterByAssignment.length;
    const studentNamesArrayLenght = assignmentNames.length;
    if (!toggleFilter) {
      return;
    }
    if (!clean) {
      switch (filteredArrayLenght) {
        case 0:
          setChecked(true);
          checkboxRef.current.checked = true;
          checkboxRef.current.indeterminate = false;
          break;
        case studentNamesArrayLenght:
          setChecked(false);
          checkboxRef.current.checked = false;
          checkboxRef.current.indeterminate = false;
          break;
        default:
          setChecked(null);
          checkboxRef.current.checked = false;
          checkboxRef.current.indeterminate = true;
      }
    }
    return () => {
      clean = true;
    };
  }, [filterByAssignment, assignmentNames, toggleFilter]);

  // ** SET FUNCTION FOR TOGGLE THE FILTER ON NAME ** //
  function handletoggleFilter() {
    if (!toggleFilter) {
      // reset filter to default, all checked
      settoggleFilter(true);
      setChecked(true);
      setFilterByAssignment([]);
    } else {
      //
      settoggleFilter(false);
    }
  }

  // ** SET CONST FOR IETS CHECKBOX BASED ON NAME AND CALL FilterNames COMPONENT ** //
  const assignmentName = assignmentNames.map((assignmentName, index) => (
    <FilterByAssignment
      assignmentName={assignmentName.name}
      CheckedAll={checked}
      key={index}
      updateAssignmentToFilter={updateAssignmentToFilter}
    />
  ));

  return (
    <>
      <button onClick={handletoggleFilter}>By Assignment</button>
      {toggleFilter ? (
        <div className="filter-item">
          <label className="filter-name">
            <input
              className="filter-checkbox"
              type="checkbox"
              name="All"
              ref={checkboxRef}
              onChange={handleChange}
            />
            All
          </label>
          <div className="filterbox">{assignmentName}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default FilterByAssignments;
