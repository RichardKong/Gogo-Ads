<!--<script setup>-->
<!--import {Authenticator}  from '@aws-amplify/ui-vue';-->
<!--import '@aws-amplify/ui-vue/styles.css';-->
<!--</script>-->
<template>
  <div>
    <img :src="imgSrc" width="100%" height="100%" class="background"/>
    <div class="login_box">
      <a-row type="flex" justify="space-around">
        <a-col>
          <authenticator>
            {{router.push({name: 'HomePage'})}}
          </authenticator>
        </a-col>
        <a-col>
          <div :style="{width: '480px'}">
            <div class="stay_center">
              <p :style="{fontSize: '60px', fontFamily: 'Lucida Handwriting'}">Welcome to</p>
              <a-divider style="height: 4px; background-color: #000000; margin-bottom: -5px; margin-top: -70px" />
              <p :style="{textAlign: 'right', fontSize: '36px'}">GoGo Advertisements</p>
              <img :src="logo" class="logo"/>
              <div class="logo_box">
                <p :style="{paddingTop: '30px',
                            fontSize: '16px',
                            fontFamily: 'Lucida Handwriting'
                           }">
                  On online Platform that helps you to find target customers
                </p>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import '@aws-amplify/ui-vue/styles.css';
import { useRouter } from 'vue-router';
// import router from '@/router/index'

export default{
  name: 'Login',
  setup(){
    const router = useRouter();
    return {
      router
    }
  },
  data (){
    return {
      // router: useRouter(),
      imgSrc: require('@/assets/bg1.png'),
      logo: require('@/assets/logo.png'),
    }
  },
}

</script>

<style>
.login_box{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.5);
  padding: 30px 20px;
  width: 1100px;
}

.background{
  width:100%;
  height:100%;  /**宽高100%是为了图片铺满屏幕 */
  z-index:-1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.stay_center{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
}

.logo{
  width: 40%;
  height: 40%;
  float: right;
  padding: 10px;
  /*margin-left: -3px;*/
}

.logo_box{
  width: 480px;
  background: rgba(255, 255, 255, 0.5);
  padding: 34px 17px;
}
</style>
