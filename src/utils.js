const SERVER_ORIGIN = '';

const registerUrl = `${SERVER_ORIGIN}/register`;

export const register = (data) => {
  return fetch(registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((error) => {
          throw new Error(error.message || 'Fail to register');
        });
      }
      return response.json();
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};
