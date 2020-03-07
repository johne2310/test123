<template>
  <div class="about">
    <h1>This is an about page {{ test | capitalise }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      test: 'test',
    };
  },
};
</script>
