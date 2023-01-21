import React, { useEffect, useState } from "react";

function FilterByItem({ filterName, CheckedAll, updateFilter }) {
  // ** SET STATE FOR CHECKBOX NAME ** //
  const [checkedName, setCheckedName] = useState(true);

  // ** SET FUNCTION FOR CHANGING FILTER STATE NAME ** //
  function handleChange(event) {
    const useFilterName = event.target.name;
    setCheckedName(!checkedName);
    updateFilter(useFilterName);
  }

  // ** SET EFFECT FOR FILTER STATE NAME DEPENDING ON FILTER 'ALL' ** //
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      switch (CheckedAll) {
        case true:
          setCheckedName(true);
          break;
        case false:
          setCheckedName(false);
          break;
        default:
      }
    }
    return () => {
      isCancelled = true;
    };
  }, [CheckedAll]);

  return (
    <label className="filter-item-name">
      <input
        className="filter-checkbox"
        type="checkbox"
        name={filterName}
        value={checkedName}
        checked={checkedName}
        onChange={handleChange}
      />
      {filterName}
    </label>
  );
}

export default FilterByItem;
