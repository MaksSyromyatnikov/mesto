// объявление массива карточек
export const initialCards = [
  {
    name: 'Токио',
    link: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Тбилиси',
    link: 'https://images.unsplash.com/photo-1594766508832-b111829239cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=473&q=80'
  },
  {
    name: 'Лондон',
    link: 'https://images.unsplash.com/photo-1536890992765-f42a1ee1e2a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
  },
  {
    name: 'Ереван',
    link: 'https://images.unsplash.com/photo-1575365717666-1a84be3fd104?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Нью-Йорк',
    link: 'https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=536&q=80'
  },
  {
    name: 'Бордо',
    link: 'https://images.unsplash.com/photo-1612520557101-48a83a15d1e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }
];

//объявление модального окна с картинкой
export const popupImage = document.querySelector('.popup_type_image');
export const popupImageFull = popupImage.querySelector('.popup__image');
export const popupImageSubtitle = popupImage.querySelector('.popup__subtitle');

//Объявление Данных из профиля
export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector(".profile__name");
export const profileDescription = profile.querySelector(".profile__description");
