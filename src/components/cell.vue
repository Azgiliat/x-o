<template>
<div v-bind:style="size" class="cell field__cell" @click="putSign">
  <transition name="x-anim">
    <div class="sign x" v-show="state.x">
      <span class="x-i"></span>
      <span class="x-ii"></span>
    </div>
  </transition>
  <transition name="o-anim">
    <div class="sign o" v-show="state.o"></div>
  </transition>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      state: {
        empty: true,
        o: false,
        x: false,
      },
    }
  },
  props: {
    size: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    putSign: function() {
      if(this.state.empty) {
        if(this.$parent.xTurn) {
          this.state.x = true;
          this.state.empty = false;
        } else {
          this.state.o = true;
          this.state.empty = false;
        }
      } else {
        alert(`Тут уже что-то стоит, выбери другуя клетку`);
      }
      this.$emit('cellClick', this.name);
    },
  },
  mounted: function() {
    const drawBefore = CSSRulePlugin.getRule(".cell:before");
    const drawAfter = CSSRulePlugin.getRule(".cell:after");
    const drawElem = this.$el;
    const draw = new TimelineMax({
      paused: true,
      reversed: true
    });
    const drawColor = "#88ce04";
    draw.set(drawBefore, {
      cssRule: {
        borderTopColor: drawColor,
        borderRightColor: drawColor
      }
    });
    draw.set(drawAfter, {
      cssRule: {
        borderBottomColor: drawColor,
        borderLeftColor: drawColor
      }
    });
    draw.to(drawBefore, 3, {
        cssRule: {
          width: "100%"
        }
      })
      .to(drawBefore, 3, {
        cssRule: {
          height: "100%"
        }
      })
      .to(drawAfter, 3, {
        cssRule: {
          height: "100%"
        }
      }, "-=2")
      .to(drawAfter, 2, {
        cssRule: {
          width: "100%"
        }
      });
    draw.play();
  },
}
</script>

<style lang="scss">
.cell {
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    &:before {
        box-sizing: inherit;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border: solid 2px transparent;
    }

    &:after {
        box-sizing: inherit;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border: solid 2px transparent;
    }
}
.sign {
    width: 100%;
    height: 100%;
    position: relative;
}

.x-anim-enter {
    opacity: 0;
    width: 0;
}

.x-anim-enter-active {
    transition: all 2s;
}
.x {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    & .x-i {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateX(5%) rotate(45deg);
        width: 90%;
        height: 2%;
        background-color: yellow;
    }

    & .x-ii {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateX(5%) rotate(-45deg);
        width: 90%;
        height: 2%;
        background-color: yellow;
    }
}

.o-anim-enter {
    opacity: 0;
    width: 0;
    height: 0;
}

.o-anim-enter-active {
    transition: all 2s;
}

.o {
    max-width: 90%;
    max-height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    border: 2px solid purple;
    transform: translateX(-50%) translateY(-50%);
}
</style>
