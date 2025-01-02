import {initialCards} from './scripts/cards.js';
import './styles/index.css';

const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places__list');

function addCardTemplateClone() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

function addCardDeleteButtonListener(cardElement) {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
}

function fillCard(element) {
    const cardElement = addCardTemplateClone();
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    addCardDeleteButtonListener(cardElement);
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
