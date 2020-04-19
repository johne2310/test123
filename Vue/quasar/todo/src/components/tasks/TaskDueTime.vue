<template>
  <q-input
    class="col"
    :disable="isDateSet"
    outlined
    :value="taskDueTime"
    hint="Due time"
    clearable
    @input="$emit('update:taskDueTime', $event)"
  >
    <template v-slot:prepend>
      <q-icon name="mdi-clock-outline" class="cursor-pointer" color="primary">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            :value="taskDueTime"
            @input="$emit('update:taskDueTime', $event)"
            :mask="timeFormat"
            clearable
          >
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="OK" color="primary" v-close-popup />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['taskDueTime', 'isDateSet'],
  data() {
    return {
      // timeFormat: 'hh:mma',
    };
  },
  computed: {
    ...mapGetters(['settings']),
    timeFormat() {
      if (this.settings.show12HourFormat) {
        console.log('Time Format: ', this.settings.show12HourFormat);
        return 'hh:mma';
      } else {
        return 'HH:mm';
      }
    },
  },
};
</script>

<style scoped></style>
