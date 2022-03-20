import Base from 'ember-simple-auth/authenticator/base';

export default Base.extend({
    async register (username, name, email, password) {
        let response = fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, name, email, password
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