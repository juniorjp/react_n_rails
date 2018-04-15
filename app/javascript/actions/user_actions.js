

export const AUTHENTICATED = 'authenticated';
export const AUTHENTICATION_ERROR = 'auth_error';
export const UNAUTHENTICATED = 'unathenticated';

export const userActions = {
  signUpAction,
  createDogAction
};

export function signUpAction(values, history, route = '/sign_up') {
  return async (dispatch) => {
      var body = new FormData();
      Object.keys(values.user).forEach(( key ) => {
        body.append(`user[${key}]`, values.user[ key ]);
      });
      console.info('POST', body, values);
      const response = await fetch(`${route}`, {
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
          payload: 'authentication error'
        });
        localStorage.removeItem('dogs_test_user');
      } else {
        const data = await response.json();
        dispatch({type: AUTHENTICATED, user: data});
        localStorage.setItem('dogs_test_user', JSON.stringify(data));

      }

      history.push('/dashboard');

  };
}

export function createDogAction(values, history, route = '/dogs') {
  return async (dispatch, getState) => {
    var user = getState().auth.user;
    var body = new FormData();
    Object.keys(values.dog).forEach(( key ) => {
      body.append(`dog[${key}]`, values.dog[ key ]);
    });
    body.append(`dog[user_ids][]`, [user.id]);
    console.info('POST', body, values);
    const response = await fetch(`${route}`, {
      method: 'POST',
      headers: {
        "Accept": "application/vnd.api+json; version=1",
        "Authorization": user.token
      },
      body: body,
    });
    console.log(response);

    if (!response.ok) {
      //Dispatch dogs creation error action
    } else {
      history.push('/dashboard');

    }


  };
}