"use strict"


export default class Userinfo {
  constructor({profileSelector, profileDescription, profileAvatar}){
    this._profileName = document.querySelector(profileSelector);
    this._profileDescription = document.querySelector(profileDescription);
    this._profileAvatar = document.querySelector(profileAvatar);
  }
  // получаем данные со страницы
  getUserInfo () {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    }
  }

  //отдаем данные на страницу
  setUserInfo ({name, about}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }

}
