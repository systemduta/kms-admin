<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">
      <!-- greeting card -->
      <div class="vx-col w-full mb-base ">
        <vx-card slot="no-body" class="text-center bg-greet-user greet-user rounded-card">
                    <img src="@/assets/images/card-dashboard.png" class="decore-bg rounded-card" alt="Decore Left" width="200">
                    <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
                    <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
          <h1 class="mb-6 text-black text-dashboard">Hello Team,</h1>
          <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-black text-dashboard">Selamat datang di Dashboard Knowledge Management System Maesa Grow.</p>
        </vx-card>
      </div>

      <!-- sop -->
      <div class="vx-col w-full mb-base">
          <vx-card title="SOP Terbaru" class="overflow-hidden rounded-card">
            <template slot="no-body">
                <div class="chat-card-log">
                  <component :is="scrollbarTag" class="scroll-area pt-6 px-6" >
                    <ul ref="chatLog">
                            <li class="flex items-start" >
                                <div  class="vx-col w-full lg:w-1/2  mr-5">
                                  <vx-card class="rounded-card">
                                    <div slot="no-body" style="background-color: #D2A40D;">
                                      <h5 class="pt-2 pb-2 text-center text-white">SOP CSO</h5>
                                    </div>
                                    <h6 class="mb-2">{{ card_1.title }}</h6>
                                    <p class="text-black">{{ card_1.subtitle }}</p>
                                    <p class="text-black">{{ card_1.subtitle_2 }}</p>
                                  </vx-card>
                                </div>
                                <div  class="vx-col w-full lg:w-1/2  mr-5">
                                  <vx-card class="rounded-card">
                                    <div slot="no-body" style="background-color: #D2A40D;">
                                       <h5 class="pt-2 pb-2 text-center text-white">SOP CSO</h5>
                                    </div>
                                    <h6 class="mb-2">{{ card_1.title }}</h6>
                                    <p class="text-black">{{ card_1.subtitle }}</p>
                                    <p class="text-black">{{ card_1.subtitle_2 }}</p>
                                </vx-card>
                                </div>
                                <div  class="vx-col w-full lg:w-1/2  mr-5">
                                  <vx-card class="rounded-card">
                                    <div slot="no-body" style="background-color: #D2A40D;">
                                       <h5 class="pt-2 pb-2 text-center text-white">SOP CSO</h5>
                                    </div>
                                    <h6 class="mb-2">{{ card_1.title }}</h6>
                                    <p class="text-black">{{ card_1.subtitle }}</p>
                                    <p class="text-black">{{ card_1.subtitle_2 }}</p>
                                  </vx-card>
                                </div>
                                <div  class="vx-col w-full lg:w-1/2  mr-5">
                                  <vx-card class="rounded-card">
                                    <div slot="no-body" style="background-color: #D2A40D;">
                                       <h5 class="pt-2 pb-2 text-center text-white">SOP CSO</h5>
                                    </div>
                                    <h6 class="mb-2">{{ card_1.title }}</h6>
                                    <p class="text-black">{{ card_1.subtitle }}</p>
                                    <p class="text-black">{{ card_1.subtitle_2 }}</p>
                                </vx-card>
                                </div>
                                
                            </li>
                    </ul>
                </component>
              </div>
              </template>
        </vx-card>
      </div>

      <!-- employee -->
      <div class="vx-col w-full mb-base">
          <vx-card title="Employee" class="overflow-hidden rounded-card">
            <template slot="no-body">
                <div class="chat-card-log">
                  <component :is="scrollbarTag" class="scroll-area pt-6 px-6" >
                    <ul ref="chatLog"> 
                            <li class="flex items-start" >
                                <div  class="vx-col w-full lg:w-1/4  mr-5">
                                  <vx-card class="rounded-card">
                                    <img src="@/assets/images/logo/logo_maesa.png" alt="content-img" class="card-img-top">
                                </vx-card>
                                </div>
                                <div  class="vx-col w-full lg:w-1/4  mr-5">
                                  <vx-card class="rounded-card">
                                    <img src="@/assets/images/logo/logo_maesa.png" alt="content-img" class="card-img-top">
                                </vx-card>
                                </div>
                                <div  class="vx-col w-full lg:w-1/4  mr-5">
                                  <vx-card class="rounded-card">
                                    <img src="@/assets/images/logo/logo_maesa.png" alt="content-img" class="card-img-top">
                                </vx-card>
                                </div>
                                <div  class="vx-col w-full lg:w-1/4  mr-5">
                                  <vx-card class="rounded-card">
                                    <img src="@/assets/images/logo/logo_maesa.png" alt="content-img" class="card-img-top">
                                </vx-card>
                                </div>
                                <div  class="vx-col w-full lg:w-1/4  mr-5">
                                  <vx-card>
                                    <img src="@/assets/images/logo/logo_maesa.png" alt="content-img" class="card-img-top">
                                </vx-card>
                                </div>
                            </li>
                            
                    </ul>
                </component>
              </div>
              </template>
        </vx-card>
      </div>
      <!-- user -->
      <!-- <div class="vx-col w-full mb-base">
          <div class="w-full vx-col mb-base">
            <vx-card title="User" class="rounded-card">
              <vs-table class="mb-2">
                <template slot="thead">
                  <vs-th>Code</vs-th>
                  <vs-th>Name</vs-th>
                  <vs-th></vs-th>
                </template>
                <template slot-scope="{data}">
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="tr.code">{{tr.code}}</vs-td>
                    <vs-td :data="tr.name">{{tr.name}}</vs-td>
                    <vs-td>
                      <div class="flex">
                        <vs-button class="mr-2" :to="{name: `sop-red`, params: {id: tr.id}}" icon-pack="feather" icon="icon-edit" size="small"></vs-button>
                      </div>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
            </vx-card>
          </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueApexCharts from 'vue-apexcharts'

export default {
  data () {
    return {
      checkpointReward: {},
      card_1: {},
      chatLog: [],
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
    
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  mounted () {
    const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
    scroll_el.scrollTop = this.$refs.chatLog.scrollHeight
  },
  components: {
    VueApexCharts,
    VuePerfectScrollbar,
  },
  created () {
    this.$http.get('/api/user/checkpoint-reward')
      .then((response) => { this.checkpointReward = response.data })
      .catch((error)   => { console.log(error) }),
      // Card 1
    this.$http.get('/api/users/pixinvent/product/1')
      .then((response) => { this.card_1 = response.data })
      .catch((error)   => { console.log(error) })
      // Chat Log
    this.$http.get('/api/chat/demo-1/log')
      .then((response) => { this.chatLog = response.data })
      .catch((error)   => { console.log(error) })
  }
}
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user{
    position: relative;

    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
    .decore-bg{
      position: absolute;
      left:0;
      width: 100%;
      height: 100%;
      right: 0;
      top: 0;
      opacity: 0.6;
    }
    .text-dashboard{
      position: relative;
    }
  }

  // .bg-greet-user {
  //   background-image: url("@/assets/images/card-dashboard.png");
  // }

  .rounded-card{
    border-radius: 30px;
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
</style>

