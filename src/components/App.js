import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState("");
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState("");
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState("");
  const [isViewPopupOpen, setIsViewPopupOpen] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleCardClick = (props) => {
    setSelectedCard(props);
    setIsViewPopupOpen(true);
  };

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen("");
    setIsAddPlacePopupOpen("");
    setIsEditAvatarPopupOpen("");
    setIsViewPopupOpen("");
    setSelectedCard({});
  };

  const onKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "Escape") {
      closeAllPopups();
    }
  };

  return (
    <div className="page" onKeyDown={onKeyDown} tabIndex={0}>
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
        isOpen={isViewPopupOpen && "popup_active"}
        name="view"
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <Footer />
    </div>
  );
}

export default App;
