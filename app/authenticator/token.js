import Base from '@ember-simple-auth/authenticators/base';

export default Base.Extend({
    restore(data) {},

    async authenticate(username, password) {
        const loginUrl = '/login';

        const response = await axios.post(
          loginUrl,
          {
            "Username": username,
            "Password": password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        if (response.status === 200) {
          return response.data.UserGuid;
        } else {
            let error = response.text();
            throw new Error(error);
        }
    },

    invalidate(data) {}
})