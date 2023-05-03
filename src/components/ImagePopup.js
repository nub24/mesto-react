import usePopupClose from '../hooks/usePopupClose';

function ImagePopup({ name, card, onClose }) {
  usePopupClose(card, onClose);

  return (
    <div
      className={`popup popup_type_${name} 
        ${Object.keys(card).length !== 0 && 'popup_active'}`} >
      <div className="popup__container-view" >
        <button
          type="button"
          className="popup__button-close"
          onClick={onClose}
        ></button>
        <img
          className="popup__photo"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
