// import Vue from 'vue'
import {createApp} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import AmplifyVue from '@aws-amplify/ui-vue';
import api from './assets/config/config';

Amplify.configure(awsExports);
const app = createApp(App);
app.use(AmplifyVue);
app.use(Antd)
app.config.globalProperties.$api = api;
app.mount('#app');