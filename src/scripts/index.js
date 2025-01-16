import {
    initialCards
}
from './cards.js';
import {
    fillCard,
    addCard
}
from '../components/card.js';
import {
    showPopup,
    closePopup
}
from '../components/modal.js';
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
    profileDescription.textContent = inputDescription.value;
    closePopup(popupEdit);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const element = {};
    element.name = inputCardName.value;
    element.link = inputCardLink.value;
    addCard({
        cardElement: fillCard(element),
        cardContainer: cardContainer,
        prepend: true,
        cardDeleteButtonListener: addCardDeleteButtonListener,
        cardLikeButtonListener: addCardLikeButtonListener,
        cardImageClickListener: addCardImageClickListener
    });
    inputCardName.value = '';
    inputCardLink.value = '';
    closePopup(popupNewCard);
}

function addCardDeleteButtonListener(cardElement) {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
}

function addCardLikeButtonListener(cardElement) {
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle('card__like-button_is-active');
    });
};

function addCardImageClickListener(cardElement) {
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        const popupImg = popupCardImage.querySelector('.popup__image');
        popupImg.src = cardImage.src;
        popupImg.alt = cardImage.alt;
        showPopup(popupCardImage);
    });
};
initialCards.forEach(function(element) {
    const createdCard = fillCard(element);
    addCard({
        cardElement: createdCard,
        cardContainer: cardContainer,
        cardDeleteButtonListener: addCardDeleteButtonListener,
        cardLikeButtonListener: addCardLikeButtonListener,
        cardImageClickListener: addCardImageClickListener
    });
});
profileEditButton.addEventListener('click', () => {
    inputName.value = profileTtitle.textContent;
    inputDescription.value = profileDescription.textContent;
    showPopup(popupEdit);
});
profileAddButton.addEventListener('click', () => showPopup(popupNewCard));
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
