<!--<script setup>-->
<!--import {Authenticator}  from '@aws-amplify/ui-vue';-->
<!--import '@aws-amplify/ui-vue/styles.css';-->
<!--</script>-->
<template>
  <authenticator class="login_box">
    <HomePage/>
  </authenticator>
</template>

<script>
import HomePage from "@/components/HomePage";
import '@aws-amplify/ui-vue/styles.css';

export default {
  name: 'App',
  components: {
    HomePage
  },
}
</script>

<style>
.login_box{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
