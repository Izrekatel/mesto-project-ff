import '.././styles/index.css';

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

function fillCard(link, name) {
    const cardElement = addCardTemplateClone();
    cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    return cardElement;
}

function addCard(cardElement) {
    cardContainer.append(cardElement);
    addCardDeleteButtonListener(cardElement);
    return cardElement;
}

initialCards.forEach(function (element) {
    const createdCard = fillCard(element.link, element.name);
    addCard(createdCard);
});
