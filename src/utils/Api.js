import { address, token } from "./constants";

class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
    this._headers = {
      authorization: this._token,
      "Content-Type": "application/json",
    };
  }

  //обработка запроса
  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Ошибка ${res.status}`);
    }
  };

  //получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //получение карточек
  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //передача карточки на сервер
  postCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  //простановка лайка
  _putLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //удоление лайка
  _delLike(id) {
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //установка/снятие лайка
  toggleLike(cardId, isLiked) {
    return isLiked ? this._delLike(cardId) : this._putLike(cardId);
  }

  //удоление карточки
  delCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  //передача информации о пользователе на сервер
  patchProfile({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then(this._handleResponse);
  }

  //передача аватарки на сервер
  patchAvatar(avatar) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

export const api = new Api({ address, token });
