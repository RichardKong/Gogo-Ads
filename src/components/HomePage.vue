<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu
          theme="dark"
          mode="horizontal"
          :default-selected-keys="['2']"
          :style="{ lineHeight: '64px', fontSize: '16px'}"
      >
        <a-menu-item key="1" :style="{fontWeight: 'bold', fontFamily: 'Cascadia Code' }">
          Hello, {{user.username}}!
        </a-menu-item>
        <a-menu-item key="2" @click="signOut">
          Sign Out
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px', margin: '16px 0'}">
        <a-card :style="{margin: '0 20px', fontSize: '16px'}">
          <p>Welcome to <span class="red">GoGo Advertisements! </span><br>
            GoGo Advertisements platform is a system that helps you to find your target clients of your advertisements.</p>
        </a-card>
        <div :style="{ margin: '50px 20px'}">
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content" v-if="inputAds">
            <a-form layout="inline" :style="{marginLeft: '30px'}">
              <a-form-item label="Price of the Ad" :style="{width: '300px'}">
                <a-input width placeholder="Please input the price" @change="handlePriceChange"/>
              </a-form-item>
              <a-form-item label="Category">
                <a-select
                    :default-value="categoryIDs[0]"
                    placeholder="0"
                    @change="handleCategorySelectionChange"
                    label-in-value
                    show-search
                    style="width: 120px">
                  <a-select-option v-for="(ID, index) in categoryIDs" :key="index">
                    {{ ID }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Campaign">
                <a-select
                    :default-value="campaignIDs[0]"
                    placeholder="0"
                    @change="handleCampaignSelectionChange"
                    label-in-value
                    show-search
                    style="width: 120px">
                  <a-select-option v-for="(ID, index) in campaignIDs" :key="index">
                    {{ ID }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Category">
                <a-select
                    :default-value="brandIDs[0]"
                    placeholder="0"
                    @change="handleBrandSelectionChange"
                    label-in-value
                    show-search
                    style="width: 120px">
                  <a-select-option v-for="(ID, index) in brandIDs" :key="index">
                    {{ ID }}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="Customer">
                <a-select
                    :default-value="customerIDs[0]"
                    placeholder="0"
                    @change="handleCustomerSelectionChange"
                    label-in-value
                    show-search
                    style="width: 120px">
                  <a-select-option v-for="(ID, index) in customerIDs" :key="index">
                    {{ ID }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
            <a-button type="primary" @click="next" :style="{margin: '30px 30px'}">
              Pay 5$ to use
            </a-button>
          </div>

          <div class="steps-action">
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="$message.success('Processing complete!')"
            >
              Done
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
              Previous
            </a-button>
          </div>
        </div>
        <div v-if="wait" class="steps-content">
          <a-spin tip="Loading...">
            <div class="spin-content">
              Loading the model...
            </div>
          </a-spin>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      GoGo Advertisements! ©2022
      <br>
      Created by Kong Chengjun, Luo Ke, Ren Guanglun, Wang Shuhui
    </a-layout-footer>
  </a-layout>
</template>

<script>
import { Auth } from 'aws-amplify'
// import { getCurrentInstance ,onMounted } from "vue"
export default {
  name: 'HomePage',
  props: {
    msg: String
  },
  // setup (){
  //   const { proxy } = getCurrentInstance()
  //   onMounted(()=>{
  //     console.log(proxy);
  //     proxy.$api.post('gogoads', {
  //       params: {
  //         "advertisement": {
  //           "price": 13.5,
  //           "cat_id": 50
  //         }
  //       },
  //     }).then(res=>{
  //       console.log(res);
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   })
  //   return { proxy }
  // },
  data (){
    return {
      current: 0,
      inputAds: true,
      wait: false,
      showResult: false,
      categoryIDs: Array(1),
      campaignIDs: Array(1),
      brandIDs: Array(1),
      customerIDs: Array(1),
      chosen_category: 0,
      chosen_campaign: 0,
      chosen_brand: 0,
      chosen_customer: 0,
      price: 0,
      user: 'username',
      steps: [
        {
          title: 'Input Data',
        },
        {
          title: 'Loading Model',
        },
        {
          title: 'Results',
        },
      ],
    }
  },
  created: function() {
    this.getCurrentUser();
    this.categoryIDs = this.generateArray(0, 4012);
    this.campaignIDs = this.generateArray(0, 100);
    this.brandIDs = this.generateArray(0, 100);
    this.customerIDs = this.generateArray(0, 100);
  },
  mounted() {
  },
  methods:{
    getCurrentUser: async function (){
      this.user = await Auth.currentAuthenticatedUser()
    },
    signOut: async function () {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log('error signing out: ', error);
      }
    },
    next() {
      this.current++;
      if (this.current === 1){
        this.inputAds = false;
        this.wait = true;
        let $this = this;
        $this.$axios.post('https://my7e1b4mje.execute-api.us-east-1.amazonaws.com/gogoads/gogoads', {
          params: {
            "advertisement": {
              "price": $this.price,
              "cat_id": $this.chosen_category
            }
          }
        }).then((res) => {
          console.log(res)
          $this.wait = false;
          $this.showResult = true;
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    prev() {
      this.current = 0;
      this.showResult = false;
      this.inputAds = true;
      this.wait = false;
    },
    generateArray (start, end) {
      return Array.from(new Array(end + 1).keys()).slice(start)
    },
    handleCategorySelectionChange(value){
      this.chosen_category = value.key;
    },
    handleCampaignSelectionChange(value){
      this.chosen_campaign = value.key;
    },
    handleBrandSelectionChange(value){
      this.chosen_brand = value.key;
    },
    handleCustomerSelectionChange(value){
      this.chosen_customer = value.key;
    },
    handlePriceChange(value){
      this.price = value;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.red{
  color: blue;
  font-weight: bold;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  /*text-align: center;*/
  padding-top: 50px;
}
.steps-action {
  margin-top: 24px;
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
</style>
