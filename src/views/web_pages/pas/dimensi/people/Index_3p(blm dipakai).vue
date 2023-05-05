<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card
        title="
          Pilih Menu
        "
      >
        <table>
          <tr>
            <td>Perusahaan</td>
            <td>&nbsp;:&nbsp;</td>
            <td>{{ nameCompany }}</td>
          </tr>
          <tr>
            <td>Divisi</td>
            <td>&nbsp;:&nbsp;</td>
            <td>{{ nameDivision }}</td>
          </tr>
        </table>
        <hr />
        <div class="row">
          <div v-for="item in data" :key="item.id" class="col-md-4 mb-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  :to="{
                    name: `indexPer3p`,
                    params: {
                      id: item.id,
                      idCompany: idCompany,
                      name3p: item.name,
                    },
                  }"
                  size="small"
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
      idCompany: null,
      idDivision: null,
      nameCompany: "",
      nameDivision: "",
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
    this.idCompany = this.$route.params.idCompany;
    this.idDivision = this.$route.params.idDivision;
    this.nameCompany = this.$route.params.nameCompany;
    this.nameDivision = this.$route.params.nameDivisi;
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.dispatchMaster()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
