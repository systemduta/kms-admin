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
    <div class="py-4 container-fluid">
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

            <div
              v-if="user_company == 1 || user_company == 18"
              class="col-lg-3 col-md-6 col-12"
            >
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
      <div class="vx-row">
        <div class="vx-col w-full mb-base">
          <vx-card
            slot="no-body"
            class="text-center bg-greet-user greet-user rounded-card"
          >
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
            <div class="col-lg-3 col-md-6 col-12" v-for="lastuser in lastUser">
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
      user_company: this.$store.state.AppActiveUser.data.company_id,
      checkpointReward: {},
      lastUser: [],
      organization_id: null,
      stats: {
        courses: {
          title: "Today's Courses",
          value: null,
          iconClass: "ni ni-air-baloon",
          iconBackground: "bg-gradient-primary",
          onclick: "course",
        },
        users: {
          title: "Today's Users",
          value: null,
          iconClass: "ni ni-world",
          iconBackground: "bg-gradient-danger",
          onclick: "employee",
        },
        sop: {
          title: "Today's SOP",
          value: null,
          iconClass: "ni ni-paper-diploma",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          onclick: "sop",
        },
        vhs: {
          title: "Total VHS",
          value: null,
          iconClass: "ni ni-cart",
          iconBackground: "bg-gradient-warning",
          onclick: "jadwal",
        },
      },
      options: [
        { value: 1, text: "Dalam Kota" },
        { value: 2, text: "Luar Kota" },
      ],
      selectedOption: "",
      options2: [
        { value: "option1", text: "Option 1" },
        { value: "option2", text: "Option 2" },
        { value: "option3", text: "Option 3" },
      ],
      formItems: [{ selectedOption: "", textValue: null }],
      maxvalue: null,
      sumvalue: null,
    };
  },
  methods: {
    async getMaster() {
      this.$http
        .get("api/web/dashbrd")
        .then((response) => {
          // console.log(response);
          this.stats.users.value = response.data.users;
          this.stats.courses.value = response.data.courses;
          this.stats.sop.value = response.data.sop;
          this.stats.vhs.value = response.data.vhs;
          this.lastUser = response.data.lastuser;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItem() {
      let sum = this.formItems.reduce(
        (n, { textValue }) => n + parseInt(textValue),
        0
      );
      // console.log(sum);
      if (sum > this.maxvalue) {
        alert("KELEBIHAN BOS ku");
      } else {
        this.formItems.push({ selectedOption: "", textValue: null });
      }
    },
    deleteItem() {
      this.formItems.pop({ selectedOption: "", textValue: null });
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
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
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
