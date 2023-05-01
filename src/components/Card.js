import {useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  
  const cardLikeButtonClassName = (
    `card__button-like ${isLiked && 'card__button-like_active'}`
  )

  function handleclick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick () {
    props.onCardLike(props.card)
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
          <button 
            type="button" 
            className={cardLikeButtonClassName}
            onClick = {handleLikeClick}
            ></button>
          <p className="card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button type="button" className="card__button-delete" />}
    </article>
  );
}

export default Card;
