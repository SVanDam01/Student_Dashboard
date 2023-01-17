import React, { useEffect, useState } from "react";

function FilterNames({ studentName, CheckedAll, updateNamesToFilter }) {
  // ** SET STATE FOR CHECKBOX NAME ** //
  const [checkedName, setCheckedName] = useState(true);

  // ** SET FUNCTION FOR CHANGING FILTER STATE NAME ** //
  function handleChange(event) {
    const useFilterName = event.target.name;
    setCheckedName(!checkedName);
    updateNamesToFilter(useFilterName);
    // console.log("checked name", useFilterName);
  }

  // ** SET EFFECT FOR FILTER STATE NAME DEPENDING ON FILTER 'ALL' ** //
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      if (CheckedAll) {
        setCheckedName(true);
      } else {
        setCheckedName(false);
      }
    }
    return () => {
      isCancelled = true;
    };
  }, [CheckedAll]);

  return (
    <label className="filter-name">
      <input
        className="filter-checkbox"
        type="checkbox"
        name={studentName}
        value={checkedName}
        checked={checkedName}
        onChange={handleChange}
      />
      {studentName}
    </label>
  );
}

export default FilterNames;
