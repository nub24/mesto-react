import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import ConfirmDeletePopup from './ConfirmDeletePopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (props) => {
    setSelectedCard(props);
  };

  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .toggleLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
      .catch(err => console.log(`Ошибка обновления лайка: ${err}`));
  }

  function handleCardDelete (evt) {
    setIsLoading(true);
    evt.preventDefault();
    api.delCard(cardToDelete._id)
      .then(() => {
      setCards((state) => state.filter((item) => item._id !== cardToDelete._id));
      closeAllPopups();
    }).catch(err => console.log(`Ошибка удаления: ${err}`))
    .finally(() => setIsLoading(false));
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
    setIsLoading(true);
    api
      .patchProfile({ name, about })
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка обновления данных профиля: ${err}`))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar (avatar) {
    setIsLoading(true);
    api.patchAvatar(avatar)
    .then((newData) => {
      setCurrentUser(newData);
      closeAllPopups();
    })
    .catch(err => console.log(`Ошибка обновления аватара: ${err}`))
    .finally(() => setIsLoading(false))
  }

  function handleAddPlace({name, link}) {
    setIsLoading(true);
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка обновления данных профиля: ${err}`))
      .finally(() => setIsLoading(false))
  }

  // get user data & cards
  useEffect(() => {
    getUserData();
    setCardsData();
  }, [])

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
          buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen && "popup_active"}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen && "popup_active"}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          buttonText={isLoading ? 'Сохранение...' : 'Создать'}
        />
          

        <ConfirmDeletePopup
          onClose={closeAllPopups}
          isOpen={isConfirmPopupOpen && 'popup_active'}
          onSubmit={handleCardDelete}
          buttonText={isLoading ? 'Удаление...' : 'Да'}
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
