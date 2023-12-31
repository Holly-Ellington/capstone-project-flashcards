import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import FormDeck from "../Forms/DeckForm";

function DeckNew() {
  const history = useHistory();
  const formReset = {
    name: "",
    description: "",
  };

  const [newDeck, setNewDeck] = useState(formReset);

  const handleFormChange = ({ target }) => {
    const { id, value } = target;
    setNewDeck({
      ...newDeck,
      [id]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck({
      name: newDeck.name,
      description: newDeck.description,
    });
 
history.push(`/decks/${response.id}`); // updated this line to correct error  
  }

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadCrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item-active" aria-current="page">
          Create Deck
        </li>
      </ol>
    </nav>
  );

            /// creating or editing a deck + FormDeck component for managing deck-related form input  
  return (
    <div>
      {breadcrumb}
      <FormDeck
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
        existingDeck={newDeck}
      />
    </div>
  );
}

export default DeckNew;
