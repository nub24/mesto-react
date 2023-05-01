import React, { useState, useEffect, useContext } from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card";

function Main(props) {
  const currentUser = useContext(CurrentUserContext)
  const [cards, setCards] = useState([]);

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
  }

  function setCardsData() {
    api.getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(`Ошибка получения карточек: ${err}`));
  }

  useEffect(() => {
    setCardsData();
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Фото профиля."
            className="profile__photo"
          />
        </div>

        <div className="profile__content">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>

        <button
          type="button"
          className="profile__button-add"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card 
            key={card._id} 
            card={card} 
            onCardClick={props.onCardClick} 
            onCardLike={handleCardLike}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
