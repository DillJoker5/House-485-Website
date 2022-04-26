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
        let response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'mode': 'no-cors'
            },
            body: JSON.stringify({
                'Username': username,
                'Password': password
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