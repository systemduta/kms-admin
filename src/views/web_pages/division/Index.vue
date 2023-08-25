<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="All Division">
        <vs-table pagination max-items="10" search :data="data" class="mb-2">
          <template slot="header">
            <vs-button
              :to="{ name: 'division-create' }"
              size="small"
              icon-pack="feather"
              icon="icon-plus"
              >Create Division</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Code</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.code">{{ tr.code }}</vs-td>
              <vs-td>
                <div class="flex">
                  <custom-tooltip-button
                    text-tooltip="Edit Divisi"
                    :to="{ name: `division-edit`, params: { id: tr.id } }"
                    icon="icon-edit"
                    color="warning"
                  />
                  <div @click="getID(tr.id)">
                    <custom-tooltip-button
                      text-tooltip="Lihat Detail Karyawan"
                      icon="icon-eye"
                      color="primary"
                    />
                  </div>
                  <div @click="deletes(tr.id)">
                    <custom-tooltip-button
                      text-tooltip="Hapus Divisi"
                      icon="icon-delete"
                      color="danger"
                    />
                  </div>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>

        <vs-popup
          fullscreen
          class="holamundo"
          title="Daftar User"
          :active.sync="popupActivo2"
        >
          <template>
            <div class="vx-row">
              <div class="w-full vx-col mb-base">
                <vx-card>
                  <vs-table
                    pagination
                    max-items="10"
                    search
                    :data="getDetailUsers"
                    class="mb-2"
                  >
                    <template slot="thead">
                      <vs-th>No</vs-th>
                      <vs-th>Status</vs-th>
                      <vs-th>NIK</vs-th>
                      <vs-th>Name</vs-th>
                      <vs-th>Email</vs-th>
                    </template>
                    <template slot-scope="{ data }">
                      <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                        <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
                        <vs-td :data="tr.status"
                          ><span
                            v-if="tr.status == 1"
                            style="
                              color: white;
                              background-color: green;
                              padding: 5px;
                            "
                            >Ada</span
                          >
                          <span
                            v-if="tr.status == 0"
                            style="
                              color: white;
                              background-color: red;
                              padding: 5px;
                            "
                            >Resign</span
                          ></vs-td
                        >
                        <vs-td :data="tr.nik">{{ tr.nik }}</vs-td>
                        <vs-td :data="tr.name">{{ tr.name }}</vs-td>
                        <vs-td :data="tr.email">{{ tr.email }}</vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </vx-card>
              </div>
            </div>
          </template>
        </vs-popup>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "@/axios";
import CustomTooltipButton from "../../components/CustomTooltipButton.vue";
export default {
  components: {
    CustomTooltipButton,
  },
  data() {
    return {
      idDelete: null,
      image: process.env.VUE_APP_API_URL,
      getDetailUsers: [],
      popupActivo2: false,
      userCompany: JSON.parse(localStorage.getItem("userInfo")).data[
        "company_id"
      ],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.division.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "division/index",
      dispatchDestroy: "division/destroy",
    }),
    getID(id) {
      axios
        .post("/api/web/getdetailcompany", {
          idcompany: this.userCompany,
          iddivision: id,
        })
        .then((res) => {
          this.getDetailUsers = res.data.data;
          this.popupActivo2 = true;
        });
    },
    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        await this.dispatchIndex();
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: "danger",
        });
      }
    },
    deletes(id) {
      this.idDelete = id;
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Are you sure ?",
        text: "Deleted data can no longer be restored",
        accept: this.confirmDelete,
      });
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.dispatchIndex()
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
