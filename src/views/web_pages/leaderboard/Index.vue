<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="All Level" class="rounded-card">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <div class="dropdown">
              <vs-button>
              <vs-dropdown >
                <a class="a-icon text-white" href="#">
                  Pilih karyawan
                  <vs-icon class="" icon="expand_more"></vs-icon>
                </a>
                <vs-dropdown-menu>
                  <vs-dropdown-item>
                    Option 1
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    Option 2
                  </vs-dropdown-item>
                  <vs-dropdown-item divider>
                    Option 3
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </vs-button>
              </div>
            <!-- <vs-button
              color="primary"
              type="border"
              icon="list"
              title="exam result"
              :to="{ name: 'leaderboard-exam-result' }"
            ></vs-button> -->
          </template>
          <vs-tr>
              <vs-td>
                <vs-row vs-justify="center">
                <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
                  <vs-card actionable class="cardx">
                    <div slot="header">
                      <h4 class="text-center">
                        Test Kepemimpinan
                      </h4>
                    </div>
                    <div slot="media">
                      <img src="@/assets/images/example_lb.png" alt="content-img" class="size-img">
                    </div>
                    <div slot="footer">
                      <vs-row vs-justify="center">
                        <vs-button color="primary" type="gradient" >Review</vs-button>
                        <!-- <vs-button color="danger" type="gradient">Delete</vs-button> -->
                      </vs-row>
                    </div>
                  </vs-card>
                </vs-col>
                </vs-row>
              </vs-td>
              <vs-td>
                <vs-row vs-justify="center">
                <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
                  <vs-card actionable class="cardx">
                    <div slot="header">
                      <h4 class="text-center">
                        Test Kepemimpinan
                      </h4>
                    </div>
                    <div slot="media">
                      <img src="@/assets/images/example_lb.png" alt="content-img" class="size-img">
                    </div>
                    <div slot="footer">
                      <vs-row vs-justify="center">
                        <vs-button color="primary" type="gradient" >Review</vs-button>
                        <!-- <vs-button color="danger" type="gradient">Delete</vs-button> -->
                      </vs-row>
                    </div>
                  </vs-card>
                </vs-col>
                </vs-row>
              </vs-td>
              <vs-td>
                <vs-row vs-justify="center">
                <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="10">
                  <vs-card actionable class="cardx">
                    <div slot="header">
                      <h4 class="text-center">
                        Test Kepemimpinan
                      </h4>
                    </div>
                    <div slot="media">
                      <img src="@/assets/images/example_lb.png" alt="content-img" class="size-img">
                    </div>
                    <div slot="footer">
                      <vs-row vs-justify="center">
                        <vs-button color="primary" type="gradient" >Review</vs-button>
                        <!-- <vs-button color="danger" type="gradient">Delete</vs-button> -->
                      </vs-row>
                    </div>
                  </vs-card>
                </vs-col>
                </vs-row>
              </vs-td>
          </vs-tr>
          <!-- tabel data -->
          <!-- <template slot="thead">
            <vs-th>Level</vs-th>
            <vs-th>Name</vs-th>
            <vs-th></vs-th>
          </template> -->
          <!-- <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.code">{{ tr.code }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{ name: `leaderboard-read`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template> -->
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      data: (state) => state.leaderboard.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "leaderboard/index",
    }),
  },
  mounted() {
    this.$vs.loading();
    this.dispatchIndex(this.$store.state.AppActiveUser.data.company_id)
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>

<style lang="scss" scoped>
    .rounded-card{
    border-radius: 30px;
  }
  .dropdown{
  display: flex;
  align-items: center;
  justify-content: center;
  .a-icon{
    outline: none;
    text-decoration: none !important;
    display: flex;
    justify-content: center;
    i{
      font-size: 18px;
    }
  }
  }
  
</style>
