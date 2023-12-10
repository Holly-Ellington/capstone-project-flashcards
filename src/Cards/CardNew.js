import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import FormCard from "../Forms/CardForm"; 

function CardNew() {
 

  const { deckId } = useParams();

  const formReset = {
    front: "",
    back: "",
  };

  const deckReset = {
    id: deckId,
    name: "",
    description: "",
  };

  const [flashDeck, setFlashDeck] = useState(deckReset);

  useEffect(() => {
    async function getFlashDeck() {
      try {
        
        const deckFromApi = await readDeck(deckId);
       
        setFlashDeck(deckFromApi);
      } catch (error) {
        throw new Error(`API readDeck(${deckId}) had an error: ${error}`);
      }
    }
    getFlashDeck();
  }, [deckId]);

  const [newCard, setNewCard] = useState(formReset);

  const handleFormChange = ({ target }) => {
    setNewCard({
      ...newCard,
      [target.id]: target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // run console.log("FormCard(new) Submitted:", newCard); to debug
    await createCard(deckId, newCard);
    // console.log("Created newCard!", newCard); to check & remove this after
    setNewCard(formReset);
    // history.go(0); to check
  }

  // this will be for the breadcrumb  
  let deckName = flashDeck?.name ?  flashDeck?.name : "loading...";

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
         </li>
         <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deckName}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">

          Add Card

         </li>
       </ol>
     </nav>
  );

  return (
    <div>
       {breadcrumb}
       <h2>{deckName}: Add Card</h2>
       <FormCard
         handleSubmit={handleSubmit}
         handleFormChange={handleFormChange}
         flashCard={newCard}
      />
    </div>

  );
}

export default CardNew;