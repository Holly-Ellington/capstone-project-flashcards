import React from "react";
import CardButtons from "./CardButtons.js";

function CardList({ cards, handleDelete }) {
  return (
    <div>
      <h2>Cards</h2>
      <div>
        {cards ? (
          cards.map((card) => (
            <div
              className="card justify-content-between mb-1 border border-dark"
              key={card.id}
            >
              <div className="col-12">
                 <div className="row">
                   <div className="col-6">
                     <div className="card-body border-right">{card.front}</div>
                   </div>
                   <div className="col-6">
                     <div className="card-body border-left">{card.back}</div>
                   </div>
                 </div>
                 <div className="text-right mb-1">
                  <CardButtons id={card.id} handleDelete={handleDelete} />
                 </div>
               </div>
            </div>
          ))
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}

export default CardList;
