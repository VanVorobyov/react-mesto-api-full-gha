class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  setUserInfo(info) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });
  }

  postCard({ name, link }) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, link: link }),
    });
  }

  deleteCard(card) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/cards/${card}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  putLike(card) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  removeLike(card) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  changeAvatar(avatar) {
    const token = localStorage.getItem('jwt');
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatar),
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
});

//http://localhost:3005
//https://api.vanvorobyov.nomoreparties.co

export default api;
