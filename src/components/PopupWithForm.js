//props.name (edit, add, delete, avatar)
import usePopupClose from '../hooks/usePopupClose';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, children }) {
  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_${name} ${isOpen}`}>
      <div className="popup__container" >
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          action="#"
          className={`popup__form popup__form-${name}`}
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
