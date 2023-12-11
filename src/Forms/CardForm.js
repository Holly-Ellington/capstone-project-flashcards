import React from "react";
import { useHistory } from "react-router-dom";

function FormCard({ flashCard, handleFormChange, handleSubmit }) {
  
  ///FormCard Component = Renders a form for creating or editing flash cards.


  const history = useHistory();

// Determine button labels based on whether the flashCard has an ID

  const backButton = flashCard.id ? "Cancel" : "Done";
  const nextButton = flashCard.id ? "Submit" : "Save";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            className="form-control"
            id="front"
            placeholder="Add the front of the card"
            onChange={handleFormChange}
            value={flashCard.front}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            type="text"
            className="form-control"
            id="back"
            placeholder="Add the back of the card"
            onChange={handleFormChange}
            value={flashCard.back}
          ></textarea>
        </div>
        <button
          type="button"
          onClick={() => history.goBack()}
          className="btn btn-secondary mr-2"
        >
          {backButton}
        </button>
        <button type="submit" className="btn btn-primary">
          {nextButton}
        </button>
      </form>
    </div>
  );
}

export default FormCard;
