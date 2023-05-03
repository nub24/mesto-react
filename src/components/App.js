import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { api } from "../utils/Api";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);

  const handleCardClick = (props) => {
    setSelectedCard(props);
  };

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
  }

  function handleCardDelete (evt) {
    evt.preventDefault();
    api.delCard(cardToDelete._id)
      .then(() => {
      setCards(() => cards.filter((item) => item !== cardToDelete));
      closeAllPopups();
    }).catch(err => console.log(`Ошибка удаления: ${err}`));
  }

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsConfirmPopupOpen(false);
    setCardToDelete({});
  };

  //Закрытие по Escape -->
  const isOpenPopups = [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    selectedCard
  ];

  function getUserData () {
    api
      .getUserInfo()
      .then(userData => setCurrentUser(userData))
      .catch(err => `Ошибка получения данных пользователя: ${err}`);
  }

  function setCardsData() {
    api.getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => console.log(`Ошибка получения карточек: ${err}`));
  }

  function handleUpdateUser({name, about}) {
    api
      .patchProfile({ name, about })
      .then(() => {
        getUserData();
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка обновления данных профиля: ${err}`))
  }

  function handleUpdateAvatar (avatar) {
    api.patchAvatar(avatar)
    .then(() => {
      getUserData();
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка обновления аватара: ${err}`))
  }

  function handleAddPlace({name, link}) {
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка обновления данных профиля: ${err}`))
  }

  // get user data & cards
  useEffect(() => {
    getUserData();
    setCardsData();
  }, [])

  useEffect(() => {
    function onKeyDown(e) { if (e.key === "Escape") { closeAllPopups() }}

    if (isOpenPopups.some((popup) => { return popup === true }) ||
      Object.keys(selectedCard).length !== 0 ){ 
      document.addEventListener("keydown", onKeyDown) }

    return () => { document.removeEventListener("keydown", onKeyDown) };
  }, [isOpenPopups]);

  function confirmDeleteRequest(card) {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={confirmDeleteRequest}
          cards={cards}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen && "popup_active"}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen && "popup_active"}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen && "popup_active"}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
          

        <PopupWithForm 
          name="delete" 
          title="Вы уверены?"
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen && 'popup_active'}
          onSubmit={handleCardDelete}
          />

        <ImagePopup
          name="view"
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
