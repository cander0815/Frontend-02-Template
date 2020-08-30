<template>
  <div class="wrap">
    <div class="game-wrap" @click="check($event)">
      <div class="items" v-for="(item, index) in data" :data-index="index">{{item === '0' ? '' : item}}</div>
    </div>
    <p>{{msg}}</p>
  </div>
</template>

<script lang="ts">
import {ref, reactive, Ref} from 'vue';

export default {
  name: "game1",
  setup(props: any) {
    let isWin = false;
    let msg: Ref<string> = ref('下一步: X')
    let step: number = 0
    let xoro: boolean = false
    const data = reactive(['0', '0', '0', '0', '0', '0', '0', '0', '0']);
    // 可以满足赢的条件
    const winArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    const check = function (event: MouseEvent) {
      if (isWin) return;
      let player = xoro ? 'O' : 'X'
      const element = event.target;
      if (!element) return
      const index = element.getAttribute('data-index');
      data[index] = player
      step++
      const win = valid();
      if (win) {
        console.log(win);
        msg.value = `游戏结束, ${player}胜利`;
        isWin = true;
        return
      } else {
        if (step >= 9) {
          msg.value = `游戏结束, 平局`;
          isWin = true;
          return
        }
      }
      xoro = !xoro
      msg.value = '下一步: ' + (xoro ? 'O' : 'X')
      console.log(msg, xoro ? 'O' : 'X')
    }
    const valid = function (): boolean | number[] {
      for (let i = 0; i < winArr.length; i++) {
        const item = winArr[i];
        const player: string = xoro ? 'O' : 'X';
        if (data[item[0]] === player && data[item[1]] === player && data[item[2]] === player) {
          return item
        }
      }
      return false
    }
    return {
      data,
      msg,
      check,
    };
  }
}
</script>

<style scoped>
.game-wrap {
  display: grid;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}

.items {
  border: 1px solid black;
  text-align: center;
  line-height: 96px;
}
</style>
