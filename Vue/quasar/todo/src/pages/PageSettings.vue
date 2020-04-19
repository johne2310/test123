<template>
  <q-page>
    <q-list
      ><q-item-label header>Settings</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 12 Hour Time Format</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="primary" v-model="show12HourFormat" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      timeFormat: false,
    };
  },
  methods: {
    ...mapActions(['setTimeFormat']),
    toggleTimeFormat() {
      this.timeFormat = !this.timeFormat;
    },
  },
  computed: {
    ...mapGetters(['settings']),
    show12HourFormat: {
      get() {
        return this.settings.show12HourFormat;
      },
      set(value) {
        this.setTimeFormat(value);
      },
    },
  },
};
</script>
