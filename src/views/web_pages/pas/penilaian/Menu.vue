<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vs-button
        color="primary"
        type="flat"
        icon="arrow_back_ios"
        @click="goBack"
        >Kembali</vs-button
      >
      <vx-card title="Penilaian KPI PAS">
        <table>
          <tr>
            <td style="width: 40%">Nama Perusahaan</td>
            <td style="width: 5%">:</td>
            <td class="mr-3">
              {{ datas3 && datas3.dataCompany && datas3.dataCompany.name }}
            </td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Divisi</td>
            <td style="width: 5%">:</td>
            <td>{{ datas3 && datas3.dataOrg && datas3.dataOrg.name }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Karyawan</td>
            <td style="width: 5%">:</td>
            <td>{{ datas3 && datas3.dataUser && datas3.dataUser.name }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Tanggal Penilaian</td>
            <td style="width: 5%">:</td>
            <td>{{ date }}</td>
          </tr>
        </table>
      </vx-card>
      <hr />
      <vx-card
        title="
            Pilih Parameter
          "
      >
        <div class="row">
          <div
            v-if="datas3 && Array.isArray(datas3.data)"
            v-for="item in datas3.data"
            :key="item.id"
            class="col-md-4 mb-3"
          >
            <div class="card" v-if="item.id === 1">
              <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <vs-button
                  class="mr-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  :to="{
                    name: `peoplepenilaianpas`,
                    params: {
                      id3p: item.id,
                      name3p: item.name,
                      idUser: idUser,
                      idCompany: idCompany,
                      idDivisi: idDivisi,
                      date: date,
                    },
                  }"
                  >Nilai dimensi</vs-button
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
                    name: `processpenilaianpas`,
                    params: {
                      id3p: item.id,
                      name3p: item.name,
                      idUser: idUser,
                      idCompany: idCompany,
                      idDivisi: idDivisi,
                      date: date,
                    },
                  }"
                  >Nilai dimensi</vs-button
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
                  >Nilai dimensi</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vx-card>
      <hr />
      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      isPeople: false,
      isProcess: false,
      isPerformance: false,
      idCompany: this.$route.params.idCompany,
      idDivisi: this.$route.params.idDivisi,
      idUser: this.$route.params.idUser,
      date: this.$route.params.date,
      datas3: [],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.masterpas.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchMasterDatas: "masterpas/index_datas",
    }),
    goBack() {
      this.$router.push({
        name: `detailpenilaianpas`,
        params: {
          idCompany: this.idCompany,
          idDivisi: this.idDivisi,
          date: this.date,
        },
      });
    },
    async getDatas() {
      const send = new FormData();
      send.append("idCompany", this.idCompany);
      send.append("idDivisi", this.idDivisi);
      send.append("idUser", this.idUser);
      const datas3 = await this.dispatchMasterDatas(send);
      this.datas3 = datas3;
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.getDatas()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
