<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card
        title="
            Pilih Parameter
          "
      >
        <div class="row">
          <div v-for="item in datas2" :key="item.id" class="col-md-4 mb-3">
            <div class="card" v-if="item.id === 1">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  :to="{
                    name: `people`,
                    params: {
                      id: item.id,
                    },
                  }"
                  size="small"
                  >Lihat dimensi</vs-button
                >
              </div>
            </div>
            <div class="card" v-if="item.id === 2">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  :to="{
                    name: `processDimensiPas`,
                    params: {
                      id: item.id,
                    },
                  }"
                  >Lihat dimensi</vs-button
                >
              </div>
            </div>
            <div class="card" v-if="item.id === 3">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  :to="{
                    name: `performDimensiPas`,
                    params: {
                      id: item.id,
                    },
                  }"
                  >Lihat dimensi</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem("userInfo")).data[
        "isSuperAdmin"
      ],
      datas2: [],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.masterpas.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchMaster: "masterpas/index",
    }),
    log(id) {
      console.log(id);
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.dispatchMaster()
      .then(() => {
        this.$vs.loading.close();
        if (this.userInfo === 1) {
          this.datas2 = this.data;
          return this.datas2;
        } else {
          this.datas2 = this.data.filter((e) => e.id !== 1);
          return this.datas2;
        }
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
