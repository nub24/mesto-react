import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  function setUserInfo() {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => console.log(`Ошибка получения данных пользователя: ${err}`));
  }

  function setCardsData() {
    api.getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(`Ошибка получения карточек: ${err}`));
  }

  useEffect(() => {
    setUserInfo();
    setCardsData();
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img
            src={userAvatar}
            alt="Фото профиля."
            className="profile__photo"
          />
        </div>

        <div className="profile__content">
          <div className="profile__title-container">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__button-edit"
              type="button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>

        <button
          type="button"
          className="profile__button-add"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
