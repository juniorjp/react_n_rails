

export const AUTHENTICATED = 'authenticated';
export const AUTHENTICATION_ERROR = 'auth_error';
export const UNAUTHENTICATED = 'unathenticated';

export const userActions = {
  signUpAction
};

export function signUpAction(values, history) {
  return async (dispatch) => {
      var body = new FormData();
      Object.keys(values.user).forEach(( key ) => {
        body.append(`user[${key}]`, values.user[ key ]);
      });
      console.info('POST', body, values);
      const response = await fetch(`/sign_up`, {
        method: 'POST',
        headers: {
          "Accept": "application/vnd.api+json; version=1"
        },
        body: body,
      });
      console.log(response);

      if (!response.ok) {
        dispatch({
          type: AUTHENTICATION_ERROR,
          payload: error
        });
      } else {
        dispatch({type: AUTHENTICATED});
        localStorage.setItem('user', response.token);

      }

      history.push('/dashboard');

  };
}