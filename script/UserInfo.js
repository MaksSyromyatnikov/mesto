"use strict"

import {
  profile,
  profileName,
  profileDescription
} from './constants.js';

export default class Userinfo {
  constructor({profileName, profileDescription}){
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }
  // получаем данные со страницы
  getUserInfo () {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    };
  }
  //отдаем данные на страницу
  setUserInfo ({name, description}) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }
}
