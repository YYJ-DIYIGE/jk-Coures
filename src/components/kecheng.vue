<template>
  <div>
    <div class="couresClassify" @click="showPopup">
      <img class="categoryImage" src="../assets/category2.png" />分类课程
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        title="请选择课程"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        value-key="text"
      ></van-picker>
    </van-popup>
  </div>
</template>
<script>
import coures from "../gloabl/request/api";
import { Toast } from "vant";
export default {
  name: "kecheng",
  data() {
    return {
      columns: [],
      show: false,
      list: [],
      id: Number,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
      this.getcolums();
    },
    getcolums() {
      coures.sortCourse().then((res) => {
        let columns = [];
        res.data.categories.forEach((data, index) => {
          columns.push({
            id: data.id,
            text: data.name,
            children: [],
          });
          data.contents.forEach((data) => {
            columns[index].children.push({
              id: data.id,
              text: data.name,
            });
          });
        });
        this.columns = columns;
      });
    },
    onCancel() {
      this.show = false;
      Toast("取消");
    },
    onConfirm(value, index) {
      this.show = false;
      let id = this.columns[index[0]].children[index[1]].id;
      console.log(id)
      console.log(this.columns)
      console.log(this.columns[index[0]].id)
      this.id = id;
      let data = {
        category_id: this.id,
      };
      this.$emit("list-event", data);
    },
  },
};
</script>
<style lang="less" scoped>
.couresClassify {
  position: fixed;
  bottom: 35px;
  right: 5px;
  z-index: 99;
  font-size: 12px;
  color: cornsilk;
  line-height: 35px;
  text-align: center;
  opacity: 0.9;
  z-index: 4;
  width: 112px;
  height: 38px;
  border-radius: 19px;
  background: #333333;
  .categoryImage {
    vertical-align: sub;
    margin-right: 3px;
  }
}
</style>
