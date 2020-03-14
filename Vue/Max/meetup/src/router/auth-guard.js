import store from '../store';

export default (to, from, next) => {
  if (store.getters.user) {
    // console.log('Store user exists');
    next();
  } else {
    // console.log('Store user does not exist');
    next({ name: 'Signin' });
  }
};
