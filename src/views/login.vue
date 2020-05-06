<template>
  <div class="page-container">
    <h1 class="login-title">手机登录</h1>
    <van-form validate-first>
      <div style="margin: 16px;">
        <van-field
          v-model="phone"
          name="pattern"
          placeholder="请输入手机号码"
          :rules="[{ pattern, message: '请输入正确的手机号码' }]"
        />
      </div>
      <div style="margin: 16px;">
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              :disabled="disabled"
              @click="onSms"
              >{{ buttonName }}</van-button
            >
          </template>
        </van-field>
        <div class="button-container">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="onSubmit"
          >
            登录
          </van-button>
          <van-button round block type="info" native-type="submit" :to="{name:'Recommend'}">
            游客访问
          </van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from "vant";
import coures from "../gloabl/request/api";
import JsCookies from "js-cookie";
export default {
  data() {
    return {
      sms: "",
      phone: "",
      buttonName: "发送验证码",
      pattern: /^1[3456789]\d{9}$/,
      disabled: false,
    };
  },
  created() {
    let token = JsCookies.get("token");
    if (token) {
      Toast("近期已登录过 3秒后为你跳转页面");
      setTimeout(() => {
        this.$router.push({ path: "/Recommend" });
      }, 3000);
    }
  },
  methods: {
    onSms() {
      this.disabled = true;
      console.log(this.pattern);
      if (!this.pattern.test(this.phone)) {
        Toast("请输入正确的手机号码");
        this.disabled = false;
        return;
      }
      let phone_number = `+86 ${this.phone}`;
      coures.phoneCode({ phone_number });
      let time = 60;
      this.buttonName = `(${time})秒重新发送`;
      const interval = window.setInterval(() => {
        time -= 1;
        this.buttonName = `(${time})秒重新发送`;
        if (time <= 0) {
          this.buttonName = "重新发送";
          this.disabled = false;
          window.clearInterval(interval);
        }
      }, 1000);
    },
    onSubmit() {
      let phone_number = `+86 ${this.phone}`;
      let code = this.sms;
      if (!code && !phone_number) {
        Toast("错误了 自己找");
        return;
      }
      coures.loginSms({ phone_number, code }).then((res) => {
        if (res.code == 200) {
          Toast("登录成功 3秒后为你跳转页面");
          setTimeout(() => {
            this.$router.push({ path: "/Recommend" });
          }, 3000);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.page-container {
  margin: auto;
  height: 100%;
  position: fixed;
  top: 25%;
  .login-title {
    font-size: 18px;
    text-align: center;
    color: #c3735b;
  }
  .van-button--block {
    margin-top: 10px;
  }
}
</style>
