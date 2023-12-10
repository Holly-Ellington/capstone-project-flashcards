import React from "react";
import { Link } from "react-router-dom";

function CardNotEnough({ totalCards, deckId }) {
  let cardCount = "2 cards";
  cardCount = !totalCards ? "0 cards" : "1 card";
  return (
    <div>
      <h2> Not Enough Cards.</h2>
      <p>
        You need at least 3 cards to study. There are only {cardCount} in this deck currently. Please add more!
      </p>
      <Link to={`/decks/${deckId}/cards/new`}>
        <button type="button" className="btn btn-primary"style={{ backgroundColor: 'green', borderColor:"Green" }}>
          Click here to add more cards
        </button>
      </Link>
    </div>
  );
}

export default CardNotEnough;