<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="employees"
      :items-per-page="5"
      :sort-by="['title', 'salary']"
      :sort-desc="[true, true]"
      mult-sort
      class="elevation-1"
      @click:row="selectRow"
    >
    </v-data-table>
    <v-snackbar v-model="snackbar" :left="$vuetify.breakpoint.lgAndUp">
      You selected employee: {{ employeeName }}, who earns
      {{ employeeSalary | currency }}pa
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'employeeTable',
  props: {
    employees: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
      currentItem: '',
      employeeName: '',
      employeeSalary: '',
      headers: [
        {
          text: 'Employee Name',
          align: 'left',
          sortable: true,
          value: 'name',
          divider: true,
        },
        {
          text: 'Id',
          value: 'id',
        },
        {
          text: 'Title',
          value: 'title',
        },
        {
          text: 'Salary',
          value: 'salary',
        },
      ],
    };
  },
  methods: {
    selectRow(event) {
      this.snackbar = true;
      this.employeeName = event.name;
      this.employeeSalary = event.salary;
      console.log(event);
    },
  },
};
</script>

<style scoped></style>
