const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: 'b458334e-7861-4969-a846-80e383dd8a22',
        'Content-Type': 'application/json'
    }
}

export const ProfileInfoRequest = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
}

export const InitialCardsRequest = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
}


export const EditProfileRequest = (name, description) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: description
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
}

export const AddNewCardRequest = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
}

export const DeleteCardRequest = (_id) => {
    return fetch(`${config.baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
}

export const AddLikeRequest = (_id) => {
    return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
}

export const RemoveLikeRequest = (_id) => {
    return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
}

export const UpdateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        });
}