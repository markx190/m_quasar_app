export default function () {
  const user = JSON.parse(localStorage.getItem('user'));
  const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };
  return {
    // state
    state: {
      loggedIn: false,
      initialState,
      user,
      currentUser: {
        username: '',
        email: '',
        accessToken: ''
      },
      status: {
        loggedIn: false
      }
    }
  }
}
