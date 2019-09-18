<template>
<div>
  <p class="start-msg">{{msg}}: {{value}}</p>
  <input v-model="value" type="number">
  <p class="start-msg">Играем до: </p>
  <input v-model="valueForWin" type="number">
  <button @click="buildField">Ok</button>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      isStart: true,
      msg: `Введите размерность поля`,
      value: 0,
      valueForWin: 0,
    }
  },
  methods: {
    buildField: function() {
      if(this.value >= 3) this.$emit('buildfield', this.value, this.valueForWin);
      else alert(`Меньше 3 не принимаем`);
    }
  }
}
</script>

<style lang="scss">
.start-msg {
    color: white;
    font-size: 24px;
    line-height: 1.5;
    font-family: 'Roboto', sans-serif;
}
</style>
