import Base from 'ember-simple-auth/authenticator/base';

export default Base.extend({
    restore(data) {
        let { token } = data;
        if (token) {
            return data;
        } else {
            throw 'no valid session data';
        }
    },

    async register (username, name, email, password) {
        let response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors'
            },
            body: JSON.stringify({
                'Username': username,
                'Name': name,
                'Email': email,
                'Password': password,
                'HouseId': 1
            })
        });

        if (response.ok) {
            return response.json();
        } else {
            let error = await response.text();
            throw new Error(error);
        }
    },

    invalidate(data){
    }
});