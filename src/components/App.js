import React, { useState, useEffect, useMemo } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (props) => {
    setSelectedCard(props);
  };

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  //Закрытие по Escape -->
  const isOpenPopups = [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard
  ];

  useEffect(() => {
    function onKeyDown(e) { if (e.key === "Escape") { closeAllPopups() }}

    if (isOpenPopups.some((popup) => { return popup === true }) ||
      Object.keys(selectedCard).length !== 0 ){ 
      document.addEventListener("keydown", onKeyDown) }

    return () => { document.removeEventListener("keydown", onKeyDown) };
  }, [isOpenPopups]);
  // <-- Закрытие по Eacape

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen && "popup_active"}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            type="text"
            name="name"
            className="popup__input popup__input_profile_name"
            placeholder="Введите имя"
            required
            minength="2"
            maxLength="40"
          />
          <span className="popup__input-error name-error"></span>
          <input
            type="text"
            name="about"
            className="popup__input popup__input_profile_description"
            placeholder="Введите описание"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="popup__input-error about-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="add"
        title="Новое место"
        isOpen={isAddPlacePopupOpen && "popup_active"}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            type="text"
            name="name"
            className="popup__input popup__input_place_name"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__input-error name-error"></span>
          <input
            type="url"
            name="link"
            className="popup__input popup__input_place_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error link-error"></span>
        </div>
      </PopupWithForm>

      <PopupWithForm name="delete" title="Вы уверены?" />

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen && "popup_active"}
        onClose={closeAllPopups}
      >
        <div className="popup__input-container">
          <input
            type="url"
            name="avatar"
            className="popup__input popup__input_avatar_link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error avatar-error"></span>
        </div>
      </PopupWithForm>

      <ImagePopup
        name="view"
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <Footer />
    </div>
  );
}

export default App;
