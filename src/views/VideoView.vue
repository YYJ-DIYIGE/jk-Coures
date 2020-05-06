<template>
  <div class="video-container">
    <div class="video-section">
      <div class="video-top">
        <h1 class="video-title">视频课</h1>
        <video
          class="video-play"
          controls="controls"
          :src="url"
          width="100%"
          height="211px"
        ></video>
        <div class="video-detail">
          <div class="detail-title">
            {{ video.name }}
          </div>
          <div class="time">
            <img class="time-image" src="../assets/time.png" />
            <span class="total_duration">{{ video.total_duration }}</span> ||
            <span class="contents_count">{{ video.contents_count }}课时</span>
          </div>
          <div class="price" v-if="video.is_bought">
            <div class="purchased">已购买</div>
            <img class="buy" src="../assets/Fill-3.png" />
          </div>
          <div class="price" v-else-if="video.current_price == '0.00'">
            <div class="current_price"><span>限免</span></div>
            <div class="original_price active">￥{{ video.original_price }}</div>
          </div>
          <div class="price" v-else>
            <div class="current_price">
              ￥<span>{{ video.current_price }}</span>
            </div>
            <div class="original_price active">
              ￥{{ video.original_price }}
            </div>
            <div class="vip"><span>VIP</span> 免费学</div>
          </div>
        </div>
      </div>
      <div class="video-bottom">
        <div class="video-lsit">
          <div
            class="video-item"
            v-for="(item, index) in video.content"
            :key="item.id"
          >
            <div class="video-item-title">
              第{{ index + 1 }}节 {{ item.name }}
            </div>
            <div
              class="item-course"
              :class="[active == coures.name ? 'active' : '']"
              v-for="(coures, index) in item.children"
              :key="coures.id"
              :data-url="coures.url"
              :data-vip="coures.is_vip"
              @click="onVideo(coures.is_vip,coures.token,coures.url,coures.name)"
            >
              <div class="item-course-order">{{ index + 1 }}</div>
              <div class="item-course-name">{{ coures.name }}</div>
              <div class="item-power">
                <div
                  v-if="!coures.is_vip
                  "
                  class="item-power-content true"
                >
                  {{ coures.duration }}
                </div>
                <img
                  v-if="coures.is_vip"
                  class="item-power-content false"
                  src="../assets/Group.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import coures from "../gloabl/request/api";
import { Toast, Dialog } from "vant";
import JsCookies from 'js-cookie';
export default {
  name: "VideoView",
  data() {
    return {
      video: [],
      url: "",
      token: '',
      active:''
    };
  },
  created() {
    this.token = JsCookies.get('token');
    let token = this.token
    var id = this.$route.query.id;
    coures.courseEdit(id).then(res => {
      this.video = res.data.course;
      this.video.content[0].children[0].is_vip = false
      this.video.content.forEach(data =>{
      data.children.forEach(data => {
        data.token = token || ''
        });
     })
      this.url = res.data.course.content[0].children[0].url;
      this.active = this.url = res.data.course.content[0].children[0].name;
      this.video.content[0].children[0].token = true;
    });
  },
  methods: {
    onVideo(vip,token,url,name) {
      if (!token) {
        Dialog.confirm({
          title: "未登录",
          message: "去登陆"
        })
          .then(() => {
            setTimeout(() => {
              Dialog.confirm({
                title: "提示",
                message: "是否跳转登录页面"
              })
                .then(() => {
                  Toast("正在跳转");
                  this.$router.push({ path: "/"});
                })
                .catch(() => {});
            }, 3000);
          })
          .catch(() => {});
          return
      }
      if(vip){
        Toast('请前往 www.jiker.com')
        return
      }
      this.url = url;
      this.active = name;
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.video-title {
  font-size: 18px;
  text-align: center;
}
.video-top {
  position: fixed;
  z-index: 999;
  background: #fff;
  width: 100%;
}
.video-bottom {
  padding-top: 10.46667rem;
  width: 345px;
  margin: 0 auto;
}
.video-detail {
  // border-bottom: 1px solid #000;
  border-bottom: solid 1px #eaeaea;
  min-height: 130px;
  width: 345px;
  margin: 0 auto;
  .detail-title {
    padding-top: 11px;
    font-size: 16px;
  }
  .time {
    font-size: 12px;
    margin-top: 10px;
    .time-image {
      width: 14px;
      line-height: 17.45px;
      vertical-align: bottom;
    }
    .total_duration {
      padding-left: 3px;
    }
  }
  .price {
    position: relative;
    display: flex;
    font-size: 12px;
    margin-top: 15px;
    .vip {
      font-size: 16px;
      line-height: 31px;
      position: absolute;
      right: 5px;
      span {
        color: #f1e012;
        font-weight: 600;
      }
    }
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
.video-lsit {
  padding-bottom: 25px;
  .video-item {
    font-size: 14px;
    .video-item-title {
      line-height: 45px;
      font-size: 14px;
    }
    .item-course.active{
       background: darkgray;
    }
    .item-course {
      margin-top: 10px;
      display: flex;
      height: 51px;
      border-radius: 19px;
      position: relative;
      .item-course-order {
        font-size: 10px;
        width: 20px;
        height: 20px;
        border: solid 1px #d7d7d7;
        background: #ffffff;
        line-height: 20px;
        text-align: center;
        border-radius: 50%;
        margin: 15px;
      }
      .item-course-name {
        margin-left: 3px;
        line-height: 51px;
      }
      .item-power {
        color: antiquewhite;
        font-size: 12px;
        line-height: 51px;
        position: absolute;
        right: 7px;
        .item-power-content.false {
          line-height: 55px;
          padding-top: 15px;
        }
      }
    }
  }
}
</style>
