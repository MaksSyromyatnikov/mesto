export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  // Возвращает статус, если неок
  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // начальный массив карт с серва
  getInitialCards (){
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then (res => this._getResponseData(res))
  }

  // инфо о себе с сервера
  getUserInfo () {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // изменение инфо о себе
  editUserInfo (name, about) {
    return fetch (`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then ((res) => this._getResponseData(res));
  }

  // меняем аватарку и отправляем
  editAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${url}`,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // постим карточку
  addCard (name, link){
    return fetch (`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then ((res) => this._getResponseData(res));
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // добавление лайка на сервер
  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // удаление лайка с сервера
  removeLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }


}
