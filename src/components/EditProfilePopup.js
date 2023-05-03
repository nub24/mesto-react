import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({buttonText, isOpen, onClose, onUpdateUser}) {

  const currentUser=useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name, about });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen])


  return (
    <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          buttonText={buttonText}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
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
              value={name || ''}
              onChange={handleChangeName}
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
              value={about || ''}
              onChange={handleChangeAbout}
            />
            <span className="popup__input-error about-error"></span>
          </div>
        </PopupWithForm>
  )
}

export default EditProfilePopup