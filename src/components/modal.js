function addClosePopupListener(popup) {
    popup.addEventListener('click', function(evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
            evt.stopImmediatePropagation();
        }
    });
}

function addDocumentEscapeListener(evt) {
    const activePopup = document.querySelector('.popup_is-opened')
    if (evt.key === 'Escape' && activePopup) {
        closePopup(activePopup);
    }
}

export function showPopup(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
    addClosePopupListener(popup);
    document.addEventListener('keydown', addDocumentEscapeListener);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', addDocumentEscapeListener);
}
