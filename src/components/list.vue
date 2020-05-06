<template>
  <div class="course-list">
    <div class="course-item" v-for="(item, index) in list" :key="index">
      <div class="course-item-top" data-id="item.id" @click="play(item.id)">
        <img class="images" :src="item.cover_url" />
        <span class="status_label" v-if="item.status_label">{{
          item.status_label
        }}</span>
        <span class="difficulty_level_label">{{
          item.difficulty_level_label
        }}</span>
        <span class="categories-name">{{ item.categories[0].name }}</span>
      </div>
      <div class="course-item-bottom">
        <div class="introduction">{{ item.introduction }}</div>
        <div class="introduction-sub-title">互联网框架师必备技能</div>
        <div class="time">
          <img class="time-image" src="../assets/time.png" />
          <span class="total_duration">{{ item.total_duration }}</span> ||
          <span class="contents_count">{{ item.contents_count }}课时</span>
        </div>
        <div class="price" v-if="item.is_bought === true">
          <div class="purchased">已购买</div>
          <img class="buy" src="../assets/Fill-3.png" />
        </div>
        <div class="price" v-else-if="item.current_price == '0.00'">
          <div class="current_price"><span>限免</span></div>
          <div class="original_price active">￥{{ item.original_price }}</div>
        </div>
        <div class="price" v-else>
          <div class="current_price">
            ￥<span>{{ item.current_price }}</span>
          </div>
          <div class="original_price">￥{{ item.original_price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    play(id) {
      this.$router.push({ path: "/VideoView/" + id, query: { id } });
    },
  },
  components: {},
};
</script>

<style type="text/css" lang="less">
.course-list {
  // display: flex;
  justify-content: space-evenly;
  margin-top: 14px;
  .course-item {
    margin-top: 7px;
    display: inline-block;
    margin-left: 5px;
    background: #f1f1f17a;
    width: 180px;
    height: 222px;
    .course-item-top {
      text-align: center;
      position: relative;
      font-size: 10px;
      .images {
        width: 180px;
        height: 97px;
      }
      .status_label {
        line-height: 21px;
        display: block;
        width: 35px;
        height: 21px;
        position: absolute;
        background: #7ffd01;
        color: #a97008;
        top: 0;
        border-bottom-right-radius: 50%;
      }
      .difficulty_level_label {
        line-height: 21px;
        display: block;
        width: 35px;
        height: 21px;
        position: absolute;
        background: #636cced1;
        color: cornsilk;
        top: 0;
        right: 10px;
      }
      .categories-name {
        position: absolute;
        bottom: 7px;
        left: 15px;
        color: #666666;
        text-align: center;
        width: 66px;
        height: 23px;
        font-family: "PingFangSC-Medium";
        line-height: 23px;
        background: #ecebe5;
        border-radius: 50%;
      }
    }
    .course-item-bottom {
      width: 160px;
      margin: 0 auto;
      padding-left: 13px;
      .introduction {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        font-size: 11px;
        margin: 0 auto;
        font-weight: 600;
        margin: 5px 0;
        word-wrap: break-word;
      }
      .introduction-sub-title {
        font-size: 12px;
        margin: 5px 0;
      }
      .time {
        font-size: 12px;
        .time-image {
          vertical-align: middle;
        }
      }
      .price {
        position: relative;
        display: flex;
        font-size: 12px;
        .purchased {
          font-size: 20px;
          color: #f91313;
        }
        .current_price {
          color: red;
          span {
            font-size: 20px;
          }
        }
        .original_price {
          position: relative;
          line-height: 29px;
          margin-left: 3px;
        }
        .original_price.active::before {
          content: "";
          border-bottom: 1px solid rgb(139, 118, 118);
          position: absolute;
          top: 15px;
          left: 2px;
          width: -webkit-fill-available;
        }
        .buy {
          position: absolute;
          right: 5px;
          height: 20px;
          bottom: 1px;
        }
      }
    }
  }
}
</style>
