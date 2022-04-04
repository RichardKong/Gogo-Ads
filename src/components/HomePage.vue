<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <img class="logo" :src="logo"/>
      <a-menu
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px', fontSize: '16px', verticalAlign: 'middle'}"
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
            GoGo Advertisements platform is a system that helps you to find your target clients of your advertisements.
            <br>
            Pay 5$ to start the recommendation!
          </p>
        </a-card>
        <div :style="{ margin: '50px 20px'}">
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content" v-if="inputAds">
            <a-alert
                v-if="visible"
                :message="mess"
                type="error"
                closable
                :after-close="handleClose"
                :style="{margin: '-30px 10px 10px 10px'}"
            />
            <a-form layout="inline" :style="{marginLeft: '30px'}" :rules="rules">
              <a-form-item label="Price of the Ad" :style="{width: '300px'}" name="price">
                <a-input @change="handlePriceChange" width placeholder="Please input the price"/>
              </a-form-item>
              <a-form-item label="Category" :style="{marginLeft: '30px'}">
                <a-select
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
              <a-form-item label="Campaign" :style="{marginLeft: '30px'}">
                <a-select
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
              <a-form-item label="Brand" :style="{marginLeft: '30px'}">
                <a-select
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
              <a-form-item label="Customer" :style="{marginLeft: '30px'}">
                <a-select
                    @change="handleCustomerSelectionChange"
                    placeholder="0"
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
              Pay 5$ to get start
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
        <div v-if="showResult" class="table-content">
          <a-table :columns="columns" :data-source="recomList">
            <template #userid="{ text }">
              <a>{{ text }}</a>
            </template>

            <template #customTitle>
              <span>
                User ID
              </span>
            </template>
            <template #occupation="{ text: occupation }">
              <span>
                <a-tag
                    :key="occupation"
                    :color="occupation === 'Student' ? '#87d068' : 'green'"
                >
                  {{ occupation.toUpperCase() }}
                </a-tag>
              </span>
            </template>
            <template #pvalue_level="{ text: pvalue_level }">
              <span>
                <a-tag
                    :key="pvalue_level"
                    :color="pvalue_level === 'Low' ? '#2db7f5' : pvalue_level === 'High' ? '#108ee9' : 'blue'"
                >
                  {{ pvalue_level.toUpperCase() }}
                </a-tag>
              </span>
            </template>
            <template #shopping_level="{ text: shopping_level }">
              <span>
                <a-tag
                    :key="shopping_level"
                    :color="shopping_level === 'Shallow' ? 'orange' : shopping_level === 'Depth' ? 'red' : 'pink'"
                >
                  {{ shopping_level.toUpperCase() }}
                </a-tag>
              </span>
            </template>
          </a-table>
        </div>
        <div class="steps-action" v-if="current === 2" :style="{ margin: '20px 20px'}">
          <a-button @click="prev" type="primary">
            Input more Ads...
          </a-button>
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
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
const columns = [
  {
    title: 'User ID',
    dataIndex: 'userid',
    key: 'userid',
    slots: { title: 'customTitle', customRender: 'userid' },
  },
  {
    title: 'Gender',
    dataIndex: 'final_gender_code',
    key: 'final_gender_code',
  },
  {
    title: 'Age Level',
    dataIndex: 'age_level',
    key: 'age_level',
  },
  {
    title: 'Occupation',
    key: 'occupation',
    dataIndex: 'occupation',
    slots: { customRender: 'occupation' },
  },
  {
    title: 'Consumption Grade',
    key: 'pvalue_level',
    dataIndex: 'pvalue_level',
    slots: { customRender: 'pvalue_level' },
  },
  {
    title: 'Shopping Depth',
    key: 'shopping_level',
    dataIndex: 'shopping_level',
    slots: { customRender: 'shopping_level' },
  },
  {
    title: 'City Level',
    key: 'new_user_class_level ',
    dataIndex: 'new_user_class_level ',
  },
];

export default defineComponent ({
  name: 'HomePage',
  props: {
    msg: String
  },
  setup() {
    const rules = {
      price: [{required: true}]
    };
    return {
      columns,
      rules,
    };
  },
  data (){
    return {
      router: useRouter(),
      logo: require('@/assets/logo.png'),
      current: 0,
      inputAds: true,
      wait: false,
      showResult: false,
      visible: false,
      mess: 'Please input the price !!',
      categoryIDs: Array(1),
      campaignIDs: Array(1),
      brandIDs: Array(1),
      customerIDs: Array(1),
      chosen_category: 0,
      chosen_campaign: 0,
      chosen_brand: 0,
      chosen_customer: 0,
      price: 0.0,
      user: 'username',
      recomList: '',
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
        this.router.go(-1);
      } catch (error) {
        console.log('error signing out: ', error);
      }
    },
    next() {
      if (this.price === 0.0){
        this.mess = 'Please input the price !!';
        this.visible = true;
        return;
      }
      let re = RegExp("^\\d+(\\.\\d+)?$");
      if (!re.test(this.price)){
        this.mess = 'The price must be a number !!';
        this.visible = true;
        return;
      }

      this.current++;
      if (this.current === 1){
        this.inputAds = false;
        this.wait = true;
        let $this = this;
        $this.$axios.post('https://my7e1b4mje.execute-api.us-east-1.amazonaws.com/gogoads/gogoads', {
          "advertisement": {
            "price": Number($this.price),
            "cat_id": Number($this.chosen_category)
          }
        }).then((res) => {
          console.log(res)
          $this.wait = false;
          $this.showResult = true;
          $this.current ++;
          $this.recomList = JSON.parse(res.data.body)
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
      this.visible = false;
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
    handlePriceChange(event){
      this.visible = false;
      this.price = event.target.value;
    },
    handleClose(){
      this.visivle = false;
    }
  }
})
</script>

<style>
#components-layout-demo-top .logo {
  width: 70px;
  height: 60px;
  /*background: rgba(255, 255, 255, 0.9);*/
  margin: 3px 16px 16px 0px;
  padding: 4px;
  float: left;
}
.red{
  color: blue;
  font-weight: bold;
}
.steps-content {
  margin: 50px 20px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  /*text-align: center;*/
  padding-top: 50px;
}
.steps-action {
}
.spin-content {
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 30px;
}
.table-content {
  margin: 5px 20px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  /*text-align: center;*/
  padding-top: 10px;
}

</style>
