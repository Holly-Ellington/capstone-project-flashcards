import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useHistory, useParams } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import DeckView from "./DeckView";
import DeckStudy from "./DeckStudy";
import DeckEdit from "./DeckEdit";
import DeckNew from "./DeckNew";
import Deck from "./Deck";
import CardEdit from "../Cards/CardEdit";
import CardNew from "../Cards/CardNew";
import NotFound from "../Layout/NotFound";

function Decks() {
  const { deckId } = useParams();
  const history = useHistory();

  const [flashDecks, setFlashDecks] = useState([]);

  useEffect(() => {
    async function getFlashDecks() {
      const flashDecksFromApi = await listDecks();
      setFlashDecks(flashDecksFromApi);
    }
    getFlashDecks();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this deck?")) {
      deleteDeck(id);

      setFlashDecks((currentDecks) =>
        currentDecks.filter((deck) => deck.id !== id)
      );

      history.push("/");
    }
  };

  const renderDeckList = () => {
    return flashDecks.map((deck) => (
      <Deck
        key={deck?.id}
        id={deck?.id}
        name={deck?.name}
        description={deck?.description}
        totalCards={deck?.cards?.length}
        handleDelete={handleDelete}
      />
    ));
  };

/// the routes for creating a new deck
  return (
    <div className="container" style={{ maxWidth: "800px", paddingBottom: "20px" }}>
      <Switch>
        <Route exact path="/">
          {flashDecks.length > 0 && (
            <Link to="/decks/new">
              <button type="button" className="btn btn-secondary mb-4">
                Create a New Deck
              </button>
            </Link>
          )}
          {renderDeckList()}
        </Route>

         <Route path="/decks/:deckId/cards/:cardId/edit">
          <CardEdit />
         </Route>

         <Route path="/decks/:deckId/cards/new">
          <CardNew />
         </Route>

        <Route path="/decks/:deckId/study">
          <DeckStudy />
        </Route>

        <Route path="/decks/:deckId/edit">
          <DeckEdit />
         </Route>

         <Route path="/decks/new">
          <DeckNew />
        </Route>

        <Route path="/decks/:deckId">
          <DeckView handleDelete={handleDelete} />
        </Route>

         <Route>
          <NotFound />
         </Route>
      </Switch>
    </div>
  );
}

export default Decks;

