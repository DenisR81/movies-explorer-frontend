import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ handleCheckbox, checkBoxActive}) {
  return (
    <label className="filter-checkbox" htmlFor="shorts">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        name="shorts"
        id="shorts"
        checked={checkBoxActive ? true : false}
        onChange={handleCheckbox} 
  
      />
      <div className="filter-checkbox__switch">
        <div className="filter-checkbox__switch-slider" />
      </div>
    </label>
  );
}

export default FilterCheckbox;
