import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible";
import { Search, List, Picker, Popup, Dialog, Form, Field, Button } from "vant";
Vue.use(Search);
Vue.use(Picker);
Vue.use(List);
Vue.use(Popup);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
