class Api {
  constructor(baseUrl, key) {
    this.baseUrl = baseUrl;
    this.key = key;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this.key
      }
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this.key
      }
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }

  updateUserInfo(newName, newJob) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    })
      .then(res => {
        return this._getResponseData(res);
      })
  }
}