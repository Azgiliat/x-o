<template>
<button @click="changemsg" class="button" type="button">Im button</button>
</template>

<script>
export default {
  methods: {
    changemsg: function() {
      this.$emit('changemsg');
    }
  },
};
</script>

<style lang="scss">
.button {
    display: block;
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    color: yellow;
}
</style>
