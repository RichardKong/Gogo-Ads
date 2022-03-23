// import Vue from 'vue'
import {createApp} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import AmplifyVue from '@aws-amplify/ui-vue';

Amplify.configure(awsExports);
const app = createApp(App);
app.use(AmplifyVue);
app.use(Antd)
app.mount('#app');
// Vue.config.productionTip = false
// Vue.use(Antd)
// Vue.use(AmplifyVue)
//
// new Vue({
//   el: '#app',
//   comments: {app: App},
//   render: h => h(App),
// }).$mount('#app')
