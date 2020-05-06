<template>
  <div class="page-container">
    <h1 class="search-title">视频课</h1>
    <div class="search-section">
      <van-search
        class="coures-input"
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch(value)"
      />
      <div v-show="list.length">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="10"
          class="course-list"
        >
          <CouresList :list="list" />
        </van-list>
      </div>
      <div v-show="!list.length">
        <NoList></NoList>
      </div>
    </div>
    <kecheng @list-event="parent" />
  </div>
</template>
<script>
import coures from "../gloabl/request/api";
import CouresList from "@/components/list.vue";
import kecheng from "@/components/kecheng.vue";
import NoList from "@/components/nolist.vue";
import { Toast } from "vant";
export default {
  components: {
    CouresList,
    kecheng,
    NoList,
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      page_size: 12,
      value: "",
      total: 0,
      list: [],
      category_id: "",
      show: true,
      length: "",
    };
  },
  created() {
    let value = this.$route.query.search_text;
    this.value = value;
    this.getroadList();
  },
  methods: {
    getroadList(category_id) {
      if (category_id) {
        coures
          .all({
            category_id: category_id,
            category_level: 2,
            page: this.page,
            page_size: this.page_size,
          })
          .then((res) => {
            let list = res.data.list;
            this.loading = false;
            this.total = res.data.pagination.total;
            this.list = this.list.concat(list);
            if (this.list.length >= this.total) {
              this.finished = true;
            }
          });
        return;
      }
      let params = {
        page: this.page,
        page_size: this.page_size,
        search_text: this.value,
      };
      coures.searchCourse(params).then((res) => {
        console.log(res);
        let list = res.data.list;
        this.loading = false;
        this.total = res.data.pagination.total;
        this.list = this.list.concat(list);
        if (this.list.length >= this.total) {
          this.finished = true;
        }
      });
    },
    parent(data) {
      this.category_id = data.category_id;
      this.list = [];
      this.finished = false;
      this.page = 1;
      this.getroadList(this.category_id);
    },
    onLoad() {
      let category_id = this.category_id;
      this.page++;
      this.getroadList(category_id);
    },
    onSearch(value) {
      this.page = 1;
      this.value = value;
      this.category_id = "";
      this.finished = false;
      if (!value) {
        Toast("不能为空哦");
        return;
      }
      this.list = [];
      this.getroadList();
    },
  },
};
</script>
<style lang="less" scoped>
.page-container {
  position: relative;
  .search-title {
    font-size: 18px;
    text-align: center;
  }
  .search-section {
    margin-top: 40px;
  }
}
</style>
