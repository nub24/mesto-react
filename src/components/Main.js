import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card";

function Main(props) {
  const currentUser = useContext(CurrentUserContext)

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
        {props.cards.map((card) => (
          <Card 
            key={card._id} 
            card={card} 
            onCardClick={props.onCardClick} 
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
