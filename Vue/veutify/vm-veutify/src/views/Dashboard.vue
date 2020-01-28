<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-row>
      <v-col
        v-for="sale in sales"
        :key="sale.value"
        cols="12"
        md="4"
        align-self="center"
      >
        <SalesGraph :sale="sale"> </SalesGraph>
      </v-col>
    </v-row>
    <!-- statistics -->
    <v-row>
      <v-col v-for="stat in statistics" :key="`${stat.title}`" cols="12" lg="6">
        <StatisticsCard :stat="stat"></StatisticsCard>
      </v-col>
    </v-row>
    <!-- Employee table -->
    <v-row>
      <v-col cols="12" md="8">
        <EmployeeTable :employees="employees"></EmployeeTable>
      </v-col>
      <v-col cols="12" md="4">
        <EventTimeline :timeline="timeline"></EventTimeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmployeeTable from '@/components/EmployeeTable.vue';
import SalesGraph from '@/components/SalesGraph.vue';
import StatisticsCard from '@/components/StatisticsCard.vue';
import EventTimeline from '@/components/EventTimeline.vue';
import employeeData from '../data/employees.json';
import timelineData from '../data/timeline.json';
import statisticsData from '../data/statistics.json';
import salesData from '../data/sales.json';
export default {
  name: 'dashboard',
  components: {
    EmployeeTable,
    SalesGraph,
    StatisticsCard,
    EventTimeline,
  },
  methods: {},
  data() {
    return {
      employees: employeeData,
      sales: salesData,
      statistics: statisticsData,
      timeline: timelineData,
    };
  },
  created() {
    console.log(this.statistics);
  },
};
</script>

<style scoped></style>
