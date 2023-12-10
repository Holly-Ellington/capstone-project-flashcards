/// DONE
import React, { useState, useEffect } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardStudy from "../Cards/CardStudy";
import CardNotEnough from "../Cards/CardNotEnough";

const DeckStudy = () => {
  const history = useHistory();
  const { deckId } = useParams();

  const [flashDeck, setFlashDeck] = useState();
  const [flashCard, setFlashCard] = useState({
    cardNumber: 1,
    cardFlipped: false,
    nextButton: false,
  });

  useEffect(() => {
    const getCardsAndDeck = async () => {
      try {
        const deckFromApi = await readDeck(deckId);
        setFlashDeck(deckFromApi);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };
    getCardsAndDeck();
  }, [deckId]);

  const totalCards = flashDeck?.cards?.length;
  const { cardNumber, cardFlipped, nextButton } = flashCard;

  const handleFlip = () => {
    setFlashCard({ ...flashCard, cardFlipped: !cardFlipped, nextButton: true });
  };


  const handleNext = () => {
    if (cardNumber >= totalCards && totalCards >= 3) {
      const shouldRestart = window.confirm(`Restart cards? Click 'cancel' to return to homepage.`);
      shouldRestart ? setFlashCard({ cardNumber: 1, cardFlipped: false, nextButton: false }) : history.push("/");
    } else {
      setFlashCard({ ...flashCard, cardNumber: cardNumber + 1, cardFlipped: false, nextButton: false });
    }
  };

  const flashCards = flashDeck?.cards?.map((card) => (
    <CardStudy
      key={card.id}
      cardNumber={cardNumber}
      cardFlipped={cardFlipped}
      card={card}
      total={totalCards}
      handleNext={handleNext}
      handleFlip={handleFlip}
      nextButton={nextButton}
    />
  ));

  if (!flashDeck) {
    return <p>Loading...</p>;
  }

  const displayResult = totalCards <= 2 ? <CardNotEnough total={totalCards} deckId={flashDeck.id} /> : flashCards[cardNumber - 1];

  return (
     <div>
       <nav aria-label="breadcrumb">
         <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
           </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${flashDeck.id}`}>{flashDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
           </li>
         </ol>
       </nav>
       <h1>{flashDeck.name}: Study</h1>
       <div style={{ marginTop: "30px" }}>{displayResult}</div>
    </div>
  );
};

export default DeckStudy;


