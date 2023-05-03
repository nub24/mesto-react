import { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value); 
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ name, link });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={props.isOpen && "popup_active"}
          onClose={props.onClose}
          onSubmit={handleSubmit}
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
              onChange={handleChangeName}
              value={name || ''}
            />
            <span className="popup__input-error name-error"></span>
            <input
              type="url"
              name="link"
              className="popup__input popup__input_place_link"
              placeholder="Ссылка на картинку"
              required
              onChange={handleChangeLink}
              value={link || ''}
            />
            <span className="popup__input-error link-error"></span>
          </div>
        </PopupWithForm>
  )
}

export default AddPlacePopup