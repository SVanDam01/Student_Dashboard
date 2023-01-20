import React, { useState, useEffect, useRef } from "react";
import FilterNames from "../components/FilterNames.js";

function Filters({
  studentNames,
  filterByName,
  setFilterByName,
  updateNamesToFilter,
}) {
  // ** SET STATE FOR CHECKBOXES ** //
  const [checked, setChecked] = useState(true);

  // ** SET STATE FOR TOGGLEFILTER ** //
  const [toggleFilter, settoggleFilter] = useState(false);

  // ** SET FUNCTION FOR CHANGE CHECKED STATUS ALL ** //
  function handleChange() {
    if (checked) {
      setChecked(false);
      const result = studentNames.map((a) => a.name);
      setFilterByName(result);
    } else {
      setChecked(true);
      setFilterByName([]);
    }
  }

  // ** SET USEFFECT FOR CHECKING CHECKBOX ALL BASED ON STATUS ALL CHECKBOXES CHECKED ** //
  const checkboxRef = useRef();
  useEffect(() => {
    let clean = false;
    const filteredArrayLenght = filterByName.length;
    const studentNamesArrayLenght = studentNames.length;
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
  }, [filterByName, studentNames, toggleFilter]);

  // ** SET FUNCTION FOR TOGGLE THE FILTER ON NAME ** //
  function handletoggleFilter() {
    if (!toggleFilter) {
      // reset filter to default, all checked
      settoggleFilter(true);
      setChecked(true);
      setFilterByName([]);
    } else {
      //
      settoggleFilter(false);
    }
  }

  // ** SET CONST FOR IETS CHECKBOX BASED ON NAME AND CALL FilterNames COMPONENT ** //
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
      <button onClick={handletoggleFilter}>By Name</button>
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
          <div className="filterbox">{studentName}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Filters;
