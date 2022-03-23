<!--<script setup>-->
<!--import {Authenticator}  from '@aws-amplify/ui-vue';-->
<!--import '@aws-amplify/ui-vue/styles.css';-->
<!--</script>-->
<template>
  <authenticator class="login_box">
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>

<script>
// import {Authenticator}  from '@aws-amplify/ui-vue';
import '@aws-amplify/ui-vue/styles.css';

export default {
  name: 'App',
  // components: {
  //   // HelloWorld
  // }
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
