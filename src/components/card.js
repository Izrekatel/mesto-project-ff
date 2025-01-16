function addCardTemplateClone() {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
}

export function fillCard(element) {
    const cardElement = addCardTemplateClone();
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = element.link;
    cardImage.alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;
    return cardElement;
}

export function addCard({
    cardElement,
    cardContainer,
    prepend = false,
    cardDeleteButtonListener,
    cardLikeButtonListener,
    cardImageClickListener
}) {
    cardDeleteButtonListener(cardElement);
    cardLikeButtonListener(cardElement);
    cardImageClickListener(cardElement);
    if (prepend) {
        cardContainer.prepend(cardElement);
    } else {
        cardContainer.append(cardElement);
    }
    return cardElement;
}
