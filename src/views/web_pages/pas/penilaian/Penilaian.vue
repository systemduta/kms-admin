//URUNG ssok
<template>
  <div>
    {{ idCompany }}
    {{ idDivisi }}
    {{ idUser }}
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      idCompany: this.$route.params.idCompany,
      idDivisi: this.$route.params.idDivisi,
      idUser: this.$route.params.idUser,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.masterpas.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "masterpas/index_company",
      dispatchDivisi: "masterpas/index_divisi",
      dispatchEmployee: "masterpas/index_employee",
    }),
    toPenilaian(id) {
      this.$router.push({
        name: "penilaianpenilaianpas",
        params: {
          idCompany: this.idCompany,
          idDivisi: this.idDivisi,
          idUser: id,
        },
      });
    },
    goBack() {
      this.$router.push({
        name: "penilaianpas",
      });
    },
    async getEmployee() {},
  },
  mounted() {
    // this.$vs.loading({
    //   type: "radius",
    //   color: "blue",
    //   textAfter: true,
    //   text: "Please Wait ...",
    // });
    // this.getEmployee()
    //   .then(() => {
    //     this.$vs.loading.close();
    //   })
    //   .catch(() => {
    //     this.$vs.loading.close();
    //   });
  },
};
</script>
