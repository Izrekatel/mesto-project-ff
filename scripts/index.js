const container = document.querySelector('.content');
const cardContainer = container.querySelector('.places__list');

function addCardTemplateClone() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
}

function addCardDeleteButtonListener(cardElement) {
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function () {
        cardElement.remove();
    });
}

function addCard(link, name) {
    const cardElement = addCardTemplateClone();
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardContainer.append(cardElement);
    addCardDeleteButtonListener(cardElement);
    return cardElement;
}

initialCards.forEach(function (element) {
    addCard(element.link, element.name);
});
