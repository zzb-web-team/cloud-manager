<template>
  <div style="display: flex; flex-direction: row; align-items: center;">
    <div class="wrapper">
      <template v-for="item in names">
        <div
          class="itemStyle"
          :class="{ isActive: item.key == selected}"
          :index="item.key"
          :key="item.key"
          @click="select(item.key, item.value)"
        >
          {{ item.value }}
        </div>
      </template>
    </div>
  </div>
</template>

 <script>
 import {dateToMs} from "../servers/sevdate";
 import common from "../comm/js/util";
export default {
  data() {
    return {
      names: [
        {
          key: 0,
          value: "点播",
        },
        {
          key: 1,
          value: "直播",
        },
      ],
      selected: 0,
      accelerateType: 0,
    };
  },
  methods: {
    select(i, v) {
    //   console.log(i, v);
      this.selected = i;
      this.accelerateType = i;
      this.$emit("selectType", {
          accelerateType: this.accelerateType,
      })
    },
  }
};
</script>



<style scoped>
.wrapper {
  height: 40px;
  background: #f9f9f9;
  border-radius: 28px;
  border: 1px solid #eeeeee;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.itemStyle {
  width: 116px;
  line-height: 40px;
  height: 40px;
  color: #333;
  text-align: center;
  cursor: pointer;
  background: #f9f9f9;
  border-radius: 28px;
}
.customStyle{
  width: 116px;
  line-height: 40px;
  height: 40px;
  text-align: center;
}
.isActive {
  background: rgba(100, 76, 247, 0.06);
  border-radius: 26px;
  color: #644cf7;
  border: 1px solid #644cf7;
}
</style>
