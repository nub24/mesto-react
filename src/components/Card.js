function Card(props) {
  function handleclick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__photo"
        onClick={handleclick}
      />
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-block">
          <button type="button" className="card__button-like"></button>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="card__button-delete"></button>
    </article>
  );
}

export default Card;
