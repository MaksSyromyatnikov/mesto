"use strict"


export default class Userinfo {
  constructor(profileSelector){
    this._profileName = document.querySelector(profileSelector.name);
    this._profileDescription = document.querySelector(profileSelector.description);
  }
  // получаем данные со страницы
  getUserInfo () {
    const userData = {};
    userData.name = this._profileName.textContent;
    userData.description = this._profileDescription.textContent;
    return userData;
  }

  //отдаем данные на страницу
  setUserInfo (userData) {
    this._profileName.textContent = userData['profile-name'];
    this._profileDescription.textContent = userData['profile-job'];
  }
}
