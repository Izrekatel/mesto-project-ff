const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: 'bbe660d8-ae1b-488f-a019-45d0e866ebd2',
      'Content-Type': 'application/json'
    }
  }

  export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const getIinitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};