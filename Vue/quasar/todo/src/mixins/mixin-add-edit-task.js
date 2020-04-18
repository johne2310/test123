import { date } from 'quasar';

export default {
 methods: {
     dateOptions (dateOption) {
       this.today = date.formatDate(new Date(), 'YYYY/MM/DD');
       return dateOption >= this.today;
    },
    },
    computed: {
        //activate save button only if task name exists
        validTask () {
            if (this.newTask.name.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        isDateSet () {
            //only activiate time component if a date exists
            return this.newTask.dueDate === '';
        },
    },
}