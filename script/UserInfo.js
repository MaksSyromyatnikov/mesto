"use strict"


export default class Userinfo {
  constructor(profileSelectors){
    this._profileName = document.querySelector(profileSelectors.name);
    this._profileDescription = document.querySelector(profileSelectors.description);
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
