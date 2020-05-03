import store from '../store';

export default (to, from, next) => {
  console.log('isLoggedIn: ', store.getters['users/isLoggedIn']);
  if (store.getters['users/isLoggedIn']) {
    // console.log('Store user exists');
    // console.log('isLoggedIn: ', store.getters['users/isLoggedIn']);
    console.log('logged in');
    next();
  } else {
    // console.log('Store user does not exist');
    console.log('not logged in');
    // console.log('isLoggedIn: ', store.getters['users/isLoggedIn']);
    next({ name: 'Login' });
  }
};
