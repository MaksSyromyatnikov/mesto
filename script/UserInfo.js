"use strict"

import {
  profile,
  profileName,
  profileDescription
} from './constants.js';

export default class Userinfo {
  constructor({obj}){
    this._nameUser = obj.name;
    this._descriptionUser = obj.description;
  }

  getUserInfo () {

  }

  setUserInfo () {

  }
}
