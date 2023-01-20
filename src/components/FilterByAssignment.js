import React, { useEffect, useState } from "react";

function FilterByAssignment({
  assignmentName,
  CheckedAll,
  updateAssignmentToFilter,
}) {
  // ** SET STATE FOR CHECKBOX NAME ** //
  const [checkedAssignment, setCheckedAssignment] = useState(true);

  // ** SET FUNCTION FOR CHANGING FILTER STATE NAME ** //
  function handleChange(event) {
    const useFilterAssignment = event.target.name;
    setCheckedAssignment(!checkedAssignment);
    updateAssignmentToFilter(useFilterAssignment);
  }

  // ** SET EFFECT FOR FILTER STATE NAME DEPENDING ON FILTER 'ALL' ** //
  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      switch (CheckedAll) {
        case true:
          setCheckedAssignment(true);
          break;
        case false:
          setCheckedAssignment(false);
          break;
        default:
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
        name={assignmentName}
        value={checkedAssignment}
        checked={checkedAssignment}
        onChange={handleChange}
      />
      {assignmentName}
    </label>
  );
}

export default FilterByAssignment;
