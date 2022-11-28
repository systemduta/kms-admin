<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div>
    <div
      v-if="organization_id == 20 || organization_id == 23"
      class="py-4 container-fluid"
    >
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-12">
              <card
                :title="stats.courses.title"
                :value="stats.courses.value"
                :percentage="stats.courses.percentage"
                :iconClass="stats.courses.iconClass"
                :iconBackground="stats.courses.iconBackground"
                :detail="stats.courses.detail"
                :onclick="stats.courses.onclick"
                directionReverse
              ></card>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <card
                :title="stats.users.title"
                :value="stats.users.value"
                :percentage="stats.users.percentage"
                :iconClass="stats.users.iconClass"
                :iconBackground="stats.users.iconBackground"
                :detail="stats.users.detail"
                :onclick="stats.users.onclick"
                directionReverse
              ></card>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <card
                :title="stats.sop.title"
                :value="stats.sop.value"
                :percentage="stats.sop.percentage"
                :iconClass="stats.sop.iconClass"
                :iconBackground="stats.sop.iconBackground"
                :percentageColor="stats.sop.percentageColor"
                :detail="stats.sop.detail"
                :onclick="stats.sop.onclick"
                directionReverse
              ></card>
            </div>
            <div class="col-lg-3 col-md-6 col-12">
              <card
                :title="stats.vhs.title"
                :value="stats.vhs.value"
                :percentage="stats.vhs.percentage"
                :iconClass="stats.vhs.iconClass"
                :iconBackground="stats.vhs.iconBackground"
                :detail="stats.vhs.detail"
                :onclick="stats.vhs.onclick"
                directionReverse
              ></card>
            </div>
          </div>
        </div>
      </div>
      <!-- <button @click="ujiClick("1")"></button> -->
    </div>

    <div id="dashboard-analytics">
      <vs-row vs-justify="center">
        <div class="vx-col w-full lg:w-1/2 mb-base">
          <vx-card
            slot="no-body"
            class="text-center bg-primary-gradient greet-user"
          >
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
            <h1 class="mb-6 text-white">Hello Team,</h1>
            <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">
              Selamat datang di Dashboard Knowledge Management System Maesa
              Grow.
            </p>
          </vx-card>
        </div>
      </vs-row>
    </div>

    <div
      v-if="organization_id == 20 || organization_id == 23"
      class="py-4 container-fluid"
    >
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <vs-chip transparent color="primary"> Last User added: </vs-chip>
            <div class="col-lg-3 col-md-6 col-12" v-for="lastuser in lastUser">
              <card
                :title="lastuser.name"
                :value="lastuser.nik"
                :percentage="stats.courses.percentage"
                :iconClass="stats.courses.iconClass"
                :iconBackground="stats.courses.iconBackground"
                :detail="lastuser.username"
                :onclick="employee"
                directionReverse
              ></card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Carousel from "./components/Carousel.vue";
import CategoriesCard from "./components/CategoriesCard.vue";

export default {
  name: "dashboard-default",
  data() {
    return {
      checkpointReward: {},
      lastUser: [],
      organization_id: null,
      stats: {
        courses: {
          title: "Today's Courses",
          value: null,
          // percentage: "+55%",
          iconClass: "ni ni-air-baloon",
          // detail: "==================",
          iconBackground: "bg-gradient-primary",
          onclick: "course",
        },
        users: {
          title: "Today's Users",
          value: null,
          // percentage: "+3%",
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          // detail: "==================",
          onclick: "employee",
        },
        sop: {
          title: "Today's SOP",
          value: null,
          // percentage: "-2%",
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          // detail: "==================",
          onclick: "sop",
        },
        vhs: {
          title: "Total VHS",
          value: null,
          // percentage: "+5%",
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          // detail: "==================",
          onclick: "jadwal",
        },
      },
    };
  },
  methods: {
    async getMaster() {
      this.$http
        .get("api/web/dashbrd")
        .then((response) => {
          console.log(response);
          this.stats.users.value = response.data.users;
          this.stats.courses.value = response.data.courses;
          this.stats.sop.value = response.data.sop;
          this.stats.vhs.value = response.data.vhs;
          this.lastUser = response.data.lastuser;
          // console.log("check => " + this.lastUser);
          // window.location.reload(0);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    VueApexCharts,
    Card,
    GradientLineChart,
    Carousel,
    CategoriesCard,
  },
  mounted() {
    const user_info = JSON.parse(localStorage.getItem("userInfo"));
    this.organization_id = parseInt(user_info.data.organization_id);
    this.$vs.loading();
    this.getMaster()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
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
  }
  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
</style>
