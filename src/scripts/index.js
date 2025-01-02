import {initialCards} from './cards.js';
import '.././styles/index.css';

const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places__list');
const profileEditButton = container.querySelector('.profile__edit-button');
const popupEditButton = document.querySelector('.popup_type_edit');
const profileAddButton = container.querySelector('.profile__add-button');
const popupNewCardButton = document.querySelector('.popup_type_new-card');
const popupCardImage = document.querySelector('.popup_type_image');


function addCardTemplateClone() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function showPopup(popup, cardImage='') {
    if (cardImage) {
        const popupImg = popup.querySelector('.popup__image');
        popupImg.src = cardImage.src;
        popupImg.alt = cardImage.alt;
    }
    popup.classList.toggle('popup_is-opened');
}

function addCardDeleteButtonListener(cardElement) {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
}

function addCardImageClickListener(cardImage) {
    cardImage.addEventListener('click', () => showPopup(popupCardImage, cardImage));
}

function fillCard(element) {
    const cardElement = addCardTemplateClone();
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    addCardDeleteButtonListener(cardElement);
    addCardImageClickListener(cardImage);
    return cardElement;
}

function addCard(cardElement) {
    cardContainer.append(cardElement);
    return cardElement;
}

initialCards.forEach(function (element) {
    const createdCard = fillCard(element);
    addCard(createdCard);
});

profileEditButton.addEventListener('click', () => showPopup(popupEditButton));
profileAddButton.addEventListener('click', () => showPopup(popupNewCardButton));
