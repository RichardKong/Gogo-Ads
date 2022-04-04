// import Vue from 'vue'
import {createApp} from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Amplify, { API } from "aws-amplify";
import awsExports from "./aws-exports";
import AmplifyVue from '@aws-amplify/ui-vue';
import router  from './router/index'
// import api from './assets/config/config';
import axios from 'axios';

Amplify.configure(awsExports);
Amplify.configure({
    // OPTIONAL - if your API requires authentication
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-1:1b97d481-77ea-4305-bcc5-2ccf7e2dced6',
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_ciXrJEGzU',
        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        // userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',
    },
    API: {
        endpoints: [
            {
                name: "gogoads",
                endpoint: "https://my7e1b4mje.execute-api.us-east-1.amazonaws.com",
                region: 'us-east-1'
            },
        ]
    }
});

const app = createApp(App);
app.use(AmplifyVue);
app.use(Antd)
app.use(router)
// app.config.globalProperties.$api = api;
app.config.globalProperties.$axios = axios;
axios.defaults.baseURL = '/api'
app.mount('#app');
