import {initialCards} from './cards.js';
import {fillCard, addCard, addCardLikeButtonListener} from '../components/card.js';
import {showPopup, closePopup} from '../components/modal.js';
import '.././styles/index.css';

const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places__list');
const profileEditButton = container.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const profileAddButton = container.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');
const profileTtitle = container.querySelector('.profile__title');
const profileDescription = container.querySelector('.profile__description');
const profileForm = popupEdit.querySelector('.popup__form');
const inputName = profileForm.querySelector('.popup__input_type_name');
const inputDescription = profileForm.querySelector('.popup__input_type_description');
const cardForm = popupNewCard.querySelector('.popup__form');
const inputCardName = cardForm.querySelector('.popup__input_type_card-name');
const inputCardLink = cardForm.querySelector('.popup__input_type_url');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTtitle.textContent = inputName.value;
    profileDescription.textContent =  inputDescription.value;
    closePopup(popupEdit);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const element = {};
    element.name = inputCardName.value;
    element.link =  inputCardLink.value;
    addCard(fillCard(element), cardContainer, true);
    inputCardName.value = '';
    inputCardLink.value = '';
    closePopup(popupNewCard);
}

function addImageClickListener(evt) {
    if (evt.target.classList.contains('card__image')) {
        const popupImg = popupCardImage.querySelector('.popup__image');
        popupImg.src = evt.target.src;
        popupImg.alt = evt.target.alt;
        showPopup(popupCardImage);
    }
};

initialCards.forEach(function (element) {
    const createdCard = fillCard(element);
    addCard(createdCard, cardContainer);
});

profileEditButton.addEventListener('click', () => {
    inputName.value = profileTtitle.textContent;
    inputDescription.value = profileDescription.textContent;
    showPopup(popupEdit);
});
profileAddButton.addEventListener('click', () => showPopup(popupNewCard));
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
container.addEventListener('click', addCardLikeButtonListener);
container.addEventListener('click', addImageClickListener);
