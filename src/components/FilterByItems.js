import React, { useState, useEffect, useRef } from "react";
import FilterByItem from "./FilterByItem.js";

function FilterByItems({
  filtertext,
  filterNames,
  filterByItem,
  setFilter,
  updateFilter,
}) {
  // ** SET STATE FOR CHECKBOXES ** //
  const [checked, setChecked] = useState(true);

  // ** SET STATE FOR TOGGLEFILTER ** //
  const [toggleFilter, settoggleFilter] = useState(false);

  // ** SET FUNCTION FOR CHANGE CHECKED STATUS ALL ** //
  function handleChange() {
    if (checked) {
      setChecked(false);
      const result = filterNames.map((a) => a.name);
      setFilter(result);
    } else {
      setChecked(true);
      setFilter([]);
    }
  }

  // ** SET USEFFECT FOR CHECKING CHECKBOX ALL BASED ON STATUS ALL CHECKBOXES CHECKED ** //
  const checkboxRef = useRef();
  useEffect(() => {
    let clean = false;
    const filteredArrayLenght = filterByItem.length;
    const filterNamesArrayLenght = filterNames.length;
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
        case filterNamesArrayLenght:
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
  }, [filterByItem, filterNames, toggleFilter]);

  // ** SET FUNCTION FOR TOGGLE THE FILTER ON NAME ** //
  function handletoggleFilter() {
    if (!toggleFilter) {
      // reset filter to default, all checked
      settoggleFilter(true);
      setChecked(true);
      setFilter([]);
    } else {
      //
      settoggleFilter(false);
    }
  }

  // ** SET CONST FOR IETS CHECKBOX BASED ON NAME AND CALL FilterNames COMPONENT ** //
  const filterName = filterNames.map((filterName, index) => (
    <FilterByItem
      filterName={filterName.name}
      CheckedAll={checked}
      key={index}
      updateFilter={updateFilter}
    />
  ));

  return (
    <>
      <button onClick={handletoggleFilter}>By {filtertext}</button>
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
          <div className="filterbox">{filterName}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default FilterByItems;
