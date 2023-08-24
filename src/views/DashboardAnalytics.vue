<template>
  <div>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <!-- <div v-if="isSuperAdmin"> -->
            <div
              v-for="(stat, index) in stats"
              :key="index"
              v-if="isSuperAdmin"
              class="col-lg-3 col-md-6 col-12"
            >
              <card
                :title="stat.title"
                :value="stat.value"
                :percentage="stat.percentage"
                :iconClass="stat.iconClass"
                :iconBackground="stat.iconBackground"
                :percentageColor="stat.percentageColor"
                :detail="stat.detail"
                :onclick="stat.onclick"
                directionReverse
              ></card>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>

    <div id="dashboard-analytics">
      <div class="vx-row">
        <div class="vx-col w-full mb-base">
          <vx-card class="text-center bg-greet-user greet-user rounded-card">
            <img
              src="@/assets/images/card-dashboard.png"
              class="decore-bg rounded-card"
              alt="Decore Left"
              width="200"
            />
            <img
              src="@/assets/images/elements/decore-left.png"
              class="decore-left"
              alt="Decore Left"
              width="200"
            />
            <img
              src="@/assets/images/elements/decore-right.png"
              class="decore-right"
              alt="Decore Right"
              width="175"
            />
            <feather-icon
              icon="AwardIcon"
              class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow"
              svgClasses="h-8 w-8"
            ></feather-icon>
            <h1 class="mb-6 text-black text-dashboard text-bold underline">
              Hello Team,
            </h1>
            <p
              style="font-weight: bold"
              class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-black text-dashboard underline decoration-indigo-500"
            >
              Selamat datang di Dashboard Knowledge Management System Maesa
              Grow.
            </p>
          </vx-card>
        </div>
      </div>
    </div>

    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="center">
              <vs-chip transparent color="primary" style="margin-bottom: 10px">
                <b>Last User added: </b>
              </vs-chip>
            </div>
            <div
              class="col-lg-3 col-md-6 col-12"
              v-for="lastuser in lastUser"
              :key="lastuser.name"
            >
              <card
                :title="lastuser.name"
                :value="lastuser.nik"
                :percentage="stats.courses.percentage"
                :iconClass="stats.courses.iconClass"
                :iconBackground="stats.courses.iconBackground"
                :detail="lastuser.name_company"
                directionReverse
              ></card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="py-4 container-fluid" v-if="isSuperAdmin">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="center">
              <vs-chip transparent color="primary" style="margin-bottom: 10px">
                <b>User: </b>
              </vs-chip>
            </div>
            <!-- <div style="width: 100; height: 100"> -->
            <BarChart :chart-data="chartData" />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="py-4 container-fluid" v-else>
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="center">
              <vs-chip transparent color="primary" style="margin-bottom: 10px">
                <b>User: </b>
              </vs-chip>
            </div>
            <!-- <div style="width: 100; height: 100"> -->
            <BarChart :chart-data="chartDataOrg" />
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import Card from '@/examples/Cards/Card.vue'
import GradientLineChart from '@/examples/Charts/GradientLineChart.vue'
import Carousel from './components/Carousel.vue'
import CategoriesCard from './components/CategoriesCard.vue'
import BarChart from './components/Bar.vue'

export default {
  name: 'dashboard-default',
  data () {
    return {
      user_company: this.$store.state.AppActiveUser.data.company_id,
      isSuperAdmin: null,
      isSOP: null,
      isKMS: null,
      is1VHS: null,
      isPAS: null,
      checkpointReward: {},
      lastUser: [],
      organization_id: null,
      stats: {
        courses: {
          title: 'Today\'s Courses',
          value: null,
          iconClass: 'ni ni-air-baloon',
          iconBackground: 'bg-gradient-primary',
          onclick: 'course'
        },
        users: {
          title: 'Today\'s Users',
          value: null,
          iconClass: 'ni ni-world',
          iconBackground: 'bg-gradient-danger',
          onclick: 'employee'
        },
        sop: {
          title: 'Today\'s SOP',
          value: null,
          iconClass: 'ni ni-paper-diploma',
          percentageColor: 'text-danger',
          iconBackground: 'bg-gradient-success',
          onclick: 'sop'
        },
        vhs: {
          title: 'Total VHS',
          value: null,
          iconClass: 'ni ni-cart',
          iconBackground: 'bg-gradient-warning',
          onclick: 'jadwal'
        }
      },
      options: [
        { value: 1, text: 'Dalam Kota' },
        { value: 2, text: 'Luar Kota' }
      ],
      selectedOption: '',
      options2: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' }
      ],
      formItems: [{ selectedOption: '', textValue: null }],
      maxvalue: null,
      sumvalue: null,
      chartData: {
        labels: [], // Array of organization names
        datasets: [
          {
            label: 'Total Users',
            backgroundColor: ['#42A5F5', '#FF6384', '#4CAF50', '#FFC107'],
            data: [] // Array of total_users values
          }
        ]
      },
      chartDataOrg: {
        labels: [], // Array of organization names
        datasets: [
          {
            label: 'Total Users',
            backgroundColor: ['#42A5F5', '#FF6384', '#4CAF50', '#FFC107'],
            data: [] // Array of total_users values
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'employee/chartallcompanies',
      dispatchOrg: 'employee/chartallorg'
    }),
    async getMaster () {
      this.$http
        .get('api/web/dashbrd')
        .then((response) => {
          // console.log(response);
          this.stats.users.value = response.data.users
          this.stats.courses.value = response.data.courses
          this.stats.sop.value = response.data.sop
          this.stats.vhs.value = response.data.vhs
          this.lastUser = response.data.lastuser
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async fetchChartData () {
      if (this.isSuperAdmin) {
        const data = await this.dispatchIndex()
        // console.log(data);
        const responseData = data

        // Update chartData with the fetched data
        this.chartData.labels = responseData.data.map((item) => item.name)
        this.chartData.datasets[0].data = responseData.data.map(
          (item) => item.total_users
        )
      } else {
        const data = await this.dispatchOrg()
        // console.log(data);
        const responseData = data

        // Update chartData with the fetched data
        this.chartDataOrg.labels = responseData.data.map((item) => item.name)
        this.chartDataOrg.datasets[0].data = responseData.data.map(
          (item) => item.total_users
        )
      }
    }
  },
  components: {
    VueApexCharts,
    Card,
    GradientLineChart,
    Carousel,
    CategoriesCard,
    BarChart
  },
  mounted () {
    const user_info = JSON.parse(localStorage.getItem('userInfo'))
    this.organization_id = parseInt(user_info.data.organization_id)
    this.isSuperAdmin = parseInt(user_info.data.isSuperAdmin)
    this.isSOP = parseInt(user_info.data.isSOP)
    this.isKMS = parseInt(user_info.data.isKMS)
    this.is1VHS = parseInt(user_info.data.is1VHS)
    this.isPAS = parseInt(user_info.data.isPAS)
    this.fetchChartData()
    this.$vs.loading({
      type: 'radius',
      color: 'blue',
      textAfter: true,
      text: 'Please Wait ...'
    })

    this.getMaster()
      .then(() => {
        if (window.localStorage) {
          // If there is no item as 'reload'
          // in localstorage then create one &
          // reload the page
          if (!localStorage.getItem('reload')) {
            localStorage['reload'] = true
            window.location.reload()
          } else {
            // If there exists a 'reload' item
            // then clear the 'reload' item in
            // local storage
            localStorage.removeItem('reload')
          }
        }
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  }
}
</script>

<style lang="scss">
#dashboard-analytics {
  .greet-user {
    position: relative;

    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
    .decore-bg {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      right: 0;
      top: 0;
      opacity: 0.6;
    }
    .text-dashboard {
      position: relative;
    }
  }
  .rounded-card {
    border-radius: 30px;
  }
  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
</style>
