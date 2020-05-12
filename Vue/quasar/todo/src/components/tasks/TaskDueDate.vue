<template>
  <q-input
    class="col"
    outlined
    :value="taskDueDate"
    hint="Due date"
    clearable
    @input="$emit('update:taskDueDate', $event)"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer" color="primary">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            sanitize
            :value="taskDueDate"
            mask="DD/MM/YYYY"
            :options="dateOptions"
            @input="$emit('update:taskDueDate', $event)"
          >
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="OK" color="primary" flat v-close-popup />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['taskDueDate', 'dateOptions'],
};
</script>

<style scoped></style>
