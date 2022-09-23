import React from "react";
import "./ShowButMore.css";

function ShowButMore({ onClick }) {
  return (
    <div className="show-but">
      <button className="show-but__but" onClick={onClick}>
        Ещё
      </button>
    </div>
  );
}

export default ShowButMore;
