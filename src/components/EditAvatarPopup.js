import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = useRef();

  function handlesubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value)
    avatarRef.current.value='';
  }

  return (
    <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handlesubmit}
        >
          <div className="popup__input-container">
            <input
              type="url"
              name="avatar"
              className="popup__input popup__input_avatar_link"
              placeholder="Ссылка на картинку"
              required
              ref={avatarRef}
            />
            <span className="popup__input-error avatar-error"></span>
          </div>
        </PopupWithForm>
  )
}

export default EditAvatarPopup