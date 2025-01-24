import React from "react";

function CardsContainer({ clubName, presidentName, imageUrl }) {
  return (
    <>
      <div className="cards-container">
        <div className="cards-banner">
          <img src={imageUrl} alt="" />
        </div>
        <div className="cards-content">
          <p className="card-title">{clubName}</p>
          <p className="card-subtitle">{presidentName}</p>
        </div>
      </div>
    </>
  );
}

export default CardsContainer;
