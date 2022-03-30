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

    async authenticate (username, password) {
        let response = fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        });

        if (response.ok) {
            return response.json();
        } else {
            let error = await response.text();
            throw new Error(error);
        }
    },
});