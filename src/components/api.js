const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-31",
  headers: {
    authorization: "bbe660d8-ae1b-488f-a019-45d0e866ebd2",
    "Content-Type": "application/json",
  },
}

const checkApiAnswer = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

const makeRequest = (url, method, body = null) => {
  const options = {
    method,
    headers: config.headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(`${config.baseUrl}${url}`, options).then(checkApiAnswer);
};

export const getUserData = () => makeRequest("/users/me", "GET");


export const getInitialCards = () => makeRequest("/cards", "GET");

export const patchUserData = (newUserData) =>
    makeRequest("/users/me", "PATCH", {
      name: newUserData.profileTitle,
      about: newUserData.profileDescription,
    });

export const postNewCard = (newCardData) =>
    makeRequest("/cards", "POST", {
        name: newCardData.name,
        link: newCardData.link,
    });

export const deleteCard = (cardId) => makeRequest(`/cards/${cardId}`, "DELETE");

export const putLike = (cardId) => makeRequest(`/cards/likes/${cardId}`, "PUT");

export const deleteLike = (cardId) =>
    makeRequest(`/cards/likes/${cardId}`, "DELETE");

export const patchAvatar = (avatar) =>
    makeRequest("/users/me/avatar", "PATCH", { avatar });
