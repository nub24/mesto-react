//props.name (edit, add, delete, avatar)

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen}`}
      onClick={props.onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup__button-close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          action="#"
          className={`popup__form popup__form-${props.name}`}
          name={`form-${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button-save">
            {((props.name === "edit" || props.name === "avatar") &&
              "Сохранить") ||
              (props.name === "add" && "Создать") ||
              (props.name === "delete" && "Да")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
