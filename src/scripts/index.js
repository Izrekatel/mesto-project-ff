import {initialCards} from './cards.js';
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


function addCardTemplateClone() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function changeVisibilityPopup(popup) {
    popup.classList.toggle('popup_is-opened');
};

function addClosePopupListener(popup) {
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            changeVisibilityPopup(popup);
        }
        else addClosePopupListener(popup);
    }, {once: true});
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            changeVisibilityPopup(popup);
        }
    }, {once: true});
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTtitle.textContent = inputName.value;
    profileDescription.textContent =  inputDescription.value;
    changeVisibilityPopup(popupEdit);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const element = {};
    element.name = inputCardName.value;
    element.link =  inputCardLink.value;
    addCard(fillCard(element));
    inputCardName.value = '';
    inputCardLink.value = '';
    changeVisibilityPopup(popupNewCard);
}

function showPopup(popup, cardImage='') {
    popup.classList.add('popup_is-animated');
    if (cardImage) {
        const popupImg = popup.querySelector('.popup__image');
        popupImg.src = cardImage.src;
        popupImg.alt = cardImage.alt;
    };
    if (popup == popupEdit) {
        inputName.value = profileTtitle.textContent;
        inputDescription.value = profileDescription.textContent;
        profileForm.addEventListener('submit', handleProfileFormSubmit); 
    };
    if (popup == popupNewCard) {
        cardForm.addEventListener('submit', handleCardFormSubmit); 
    };
    changeVisibilityPopup(popup);
    addClosePopupListener(popup);

}

function addCardDeleteButtonListener(cardElement) {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
}

function addCardImageClickListener(cardImage) {
    cardImage.addEventListener('click', () => showPopup(popupCardImage, cardImage));
}

function addCardLikeButtonListener(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');;
    }
};

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
    cardContainer.prepend(cardElement);
    return cardElement;
}

initialCards.forEach(function (element) {
    const createdCard = fillCard(element);
    addCard(createdCard);
});

profileEditButton.addEventListener('click', () => showPopup(popupEdit));
profileAddButton.addEventListener('click', () => showPopup(popupNewCard));
container.addEventListener('click', addCardLikeButtonListener); 