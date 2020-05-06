<template>
  <div class="about">
    <h1 class="course-title">视频课</h1>
    <div class="course-section">
      <van-search
        class="coures-input"
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch(value)"
      />
      <div class="course-base_info">
        <span>{{ base_info.coursesCount }} 门课程 </span> |
        <span> {{ base_info.coursesLessonsCount }} 课时 </span> |
        <span>{{ base_info.total_duration }}</span>
      </div>
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
    <kecheng @list-event="parent" />
  </div>
</template>

<script>
import coures from "../gloabl/request/api";
import CouresList from "@/components/list.vue";
import kecheng from "@/components/kecheng.vue";
export default {
  components: {
    CouresList,
    kecheng,
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      page_size: 12,
      value: "",
      total: 0,
      base_info: [],
      list: [],
      category_id: "",
    };
  },
  created() {
    this.getroadList();
  },
  methods: {
    parent(data) {
      this.category_id = data.category_id;
      this.list = [];
      this.finished = false;
      this.page = 1;
      this.getroadList(this.category_id);
    },
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
      };
      coures.all(params).then((res) => {
        this.base_info = res.data.base_info;
        let list = res.data.list;
        this.loading = false;
        this.total = res.data.pagination.total;
        this.list = this.list.concat(list);
        if (this.list.length >= this.total) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      let category_id = this.category_id;
      this.page++;
      this.getroadList(category_id);
    },
    onSearch(value) {
      this.$router.push({ path: "/Search", query: { search_text: value } });
    },
  },
};
</script>
<style lang="less" scoped>
.about {
  position: relative;
  .course-title {
    font-size: 18px;
    text-align: center;
  }
  .course-section {
    margin-top: 40px;
    .course-base_info {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
