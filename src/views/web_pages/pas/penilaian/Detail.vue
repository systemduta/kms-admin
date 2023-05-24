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
              {{ datas && datas.company && datas.company.name }}
            </td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Divisi</td>
            <td style="width: 5%">:</td>
            <td>{{ datas && datas.divisi && datas.divisi.name }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Tanggal Penilaian</td>
            <td style="width: 5%">:</td>
            <td>
              <vs-input type="date" v-model="formattedDate" />
            </td>
          </tr>
        </table>
      </vx-card>
      <hr />
      <vx-card title="Daftar Karyawan">
        <vs-table
          search
          v-if="datas && Array.isArray(datas.data)"
          :data="datas.data"
          class="mb-2"
        >
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>NIK</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Beri Nilai</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.nik">{{ tr.nik }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-edit"
                    color="warning"
                    size="small"
                    title="beri nilai"
                    @click="toPenilaian(tr.id)"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      idCompany: this.$route.params.idCompany,
      idDivisi: this.$route.params.idDivisi,
      datas: [],
      date: null,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.masterpas.rows,
    }),
    formattedDate: {
      get() {
        if (this.date) {
          const [year, month, day] = this.date.split("-");
          return `${year}-${month}-${day}`;
        }
        return "";
      },
      set(value) {
        if (value) {
          const [year, month, day] = value.split("-");
          this.date = `${year}-${month}-${day}`;
        } else {
          this.date = "";
        }
      },
    },
  },
  methods: {
    ...mapActions({
      dispatchIndex: "masterpas/index_company",
      dispatchDivisi: "masterpas/index_divisi",
      dispatchEmployee: "masterpas/index_employee",
    }),
    toPenilaian(id) {
      if (this.date) {
        this.$router.push({
          name: "penilaianpenilaianpas",
          params: {
            idCompany: this.idCompany,
            idDivisi: this.idDivisi,
            idUser: id,
            date: this.date,
          },
        });
      } else {
        alert("Silahkan isi Tanggal Penilaian");
      }
    },
    goBack() {
      this.$router.push({
        name: "penilaianpas",
      });
    },
    async getEmployee() {
      const send = new FormData();
      send.append("idCompany", this.idCompany);
      send.append("idDivisi", this.idDivisi);
      const dataDivisi = await this.dispatchEmployee(send);
      this.datas = dataDivisi;
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.getEmployee()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
