import Vue from "vue";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import App from "./app.vue";
import router from "./router";
import store from "./store";

import "uikit/dist/css/uikit.css";

UIkit.use(Icons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
