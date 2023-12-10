import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Reusable Button component instead of // style={{ backgroundColor: "Green", border: "Green", color: "white" }}
const Button = ({ to, onClick, className, style, children }) => (
  <Link to={to}>
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={{ backgroundColor: "green", color: "white", ...style }}
    >
      {children}
    </button>
  </Link>
);

function CardButtons({ id, handleDelete }) {
  const { deckId } = useParams();

  return (
    <div className="btn-group" role="group" aria-label="Card Buttons group">
      <Button to={`/decks/${deckId}/cards/${id}/edit`} className="btn btn-sm btn-secondary mr-2" style={{ backgroundColor: "navy" }}>
        Edit
      </Button>
      <button
        type="button"
        onClick={() => handleDelete(id)}
        className="btn btn-sm btn-danger"
      >
        Remove
      </button>
    </div>
  );
}

export default CardButtons;
 