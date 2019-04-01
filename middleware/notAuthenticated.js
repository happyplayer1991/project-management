export default function ({ store, redirect }) {
    if (store.state.authUser) {
      /*
      error({
        message: 'You are not connected',
        statusCode: 403
      })
      */
     return redirect('/');
    }
  }
  