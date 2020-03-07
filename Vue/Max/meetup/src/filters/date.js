import moment from 'moment';

export default value => {
  return moment(value).format('ddd, D MMM YYYY');
};
