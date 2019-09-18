<template>
<div id="app">
  <startInput @buildfield="buildfield" v-if="isStart" />
  <div v-else="isStart" class="field">
    <cell @cellClick="onCellClick" v-bind:size="cellSize" v-for="cell in cells" v-bind:name="cell.num" />
  </div>
</div>
</template>

<script>
import startInput from './components/start-input.vue';
import cell from './components/cell.vue';
export default {
  data: function() {
    return {
      fieldSize: {},
      dimension: 0,
      isStart: true,
      cellSize: {},
      cells: [],
      cellsMap: [],
      valueForWin: 0,
      xTurn: true,
    }
  },
  components: {
    startInput,
    cell,
  },
  methods: {
    buildfield: function(fieldSize, valueForWin) {
      this.isStart = false;
      this.valueForWin = valueForWin;
      this.dimension = fieldSize;
      this.cellSize = {
        width: `${100 / fieldSize}%`,
        height: `${100  / fieldSize}%`,
      };
      for(let i = 0; i < fieldSize; i++) {
        let tmp = [];
        for(let j = 0; j < fieldSize; j++) {
          tmp.push({
            ...{
              empty: true,
              o: false,
              x: false,
              num: `${i*fieldSize + j}`,
            }
          });
          this.cells.push({
            ...{
              empty: true,
              o: false,
              x: false,
              num: `${i*fieldSize + j}`,
            }
          });
        }
        this.cellsMap.push(tmp);
        tmp = [];
      }
    },
    onCellClick: function(name) {
      const position = {
        x: name % this.dimension,
        y: Math.floor(name / this.dimension),
      };
      this.cellsMap[position.y][position.x].empty = false;
      this.xTurn ? this.cellsMap[position.y][position.x].x = true : this.cellsMap[position.y][position.x].o = true;
      switch (this.checkWin(name)) {
        case -1:
          this.xTurn ? this.xTurn = false : this.xTurn = true;
          break;
        case 0:
          alert(`O win`);
          setTimeout(this.clearField, 3000);
          break;
        case 1:
          alert(`X win`);
          setTimeout(this.clearField, 3000);
          break;
        default:
          break;
      }
    },
    checkWin: function(name) {
      const startPosition = {
        x: name % this.dimension,
        y: Math.floor(name / this.dimension),
      };
      const direction = {
        vertical: {
          top: {
            x: 0,
            y: -1,
          },
          bot: {
            x: 0,
            y: 1,
          },
        },
        horizont: {
          top: {
            x: 1,
            y: 0,
          },
          bot: {
            x: -1,
            y: 0,
          },
        },
        diagonalFirst: {
          top: {
            x: 1,
            y: 1,
          },
          bot: {
            x: -1,
            y: -1,
          },
        },
        diagonalSecond: {
          top: {
            x: 1,
            y: -1,
          },
          bot: {
            x: -1,
            y: 1,
          },
        },
      };
      for(let key in direction) {
        let currentPosition = {
          x: name % this.dimension,
          y: Math.floor(name / this.dimension),
        };
        let winCounter = 1;
        let isBorder = false;
        while((winCounter < this.valueForWin) && (!isBorder)) {
          try {
            (this.cellsMap[currentPosition.y + direction[key].top.y]
              [currentPosition.x + direction[key].top.x])
            if(this.xTurn) {
              this.cellsMap[currentPosition.y + direction[key].top.y][currentPosition.x + direction[key].top.x].x ? winCounter++ : isBorder = true;
            } else {
              this.cellsMap[currentPosition.y + direction[key].top.y][currentPosition.x + direction[key].top.x].o ? winCounter++ : isBorder = true;
            }
            currentPosition.y += direction[key].top.y;
            currentPosition.x += direction[key].top.x;
          } catch (error) {
            console.error(error);
            isBorder = true;
          }
        }
        if(winCounter == this.valueForWin) {
          return this.xTurn ? 1 : 0;
        }
        //возвращаемся в начаьльной клетке
        currentPosition.x = startPosition.x;
        currentPosition.y = startPosition.y;
        isBorder = false;
        //проверяем вниз до границы или 0
        while((winCounter < this.valueForWin) && (!isBorder)) {
          try {
            (this.cellsMap[currentPosition.y + direction[key].bot.y]
              [currentPosition.x + direction[key].bot.x])
            if(this.xTurn) {
              this.cellsMap[currentPosition.y + direction[key].bot.y][currentPosition.x + direction[key].bot.x].x ? winCounter++ : isBorder = true;
            } else {
              this.cellsMap[currentPosition.y + direction[key].bot.y][currentPosition.x + direction[key].bot.x].o ? winCounter++ : isBorder = true;
            }
            currentPosition.y += direction[key].bot.y;
            currentPosition.x += direction[key].bot.x;
          } catch (error) {
            console.error(error);
            isBorder = true;
          }
        }
        if(winCounter == this.valueForWin) {
          return this.xTurn ? 1 : 0;
        }
      }
      return -1;
    },
    clearField: function() {
      this.fieldSize = {};
      this.dimension = 0;
      this.isStart = true;
      this.cellSize = {};
      this.cells = [];
      this.cellsMap = [];
      this.valueForWin = 0;
      this.xTurn = true;
    },
  },
  mounted: function() {
    this.fieldSize = {
      width: `100%`,
      height: `100%`,
    };
  },
};
</script>

<style lang="scss">
body {
    margin: 0;
    background-color: black;
}
#app {
    width: 100%;
    height: 100%;
    background-color: black;
    margin: 0;
    padding: 0;
}
.field {
    width: 100%;
    height: 360px;
    margin: 0 auto;

    @media (min-width: 560px) {
        height: 560px;
    }
    @media (min-width: 768px) {
        max-width: 768px;
        height: 100%;
        max-height: 100%;
    }
    @media (min-width: 1300px) {
        max-width: 1300px;
    }
}
</style>
