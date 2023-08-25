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
      <vx-card :title="'Dimensi PAS: '">
        <vs-table
          pagination
          max-items="15"
          search
          :data="datasDimensi"
          class="mb-2"
        >
          <!-- <template slot="header">
            <vs-button @click="getMaster" size="small">
              Tambah Dimensi
            </vs-button>
          </template> -->
          <template slot="thead">
            <vs-th sort-key="no">No </vs-th>
            <vs-th sort-key="namauser">3P </vs-th>
            <vs-th sort-key="type">Nama dimensi </vs-th>
            <vs-th>Aksi</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td v-if="tr.name != 'Absen'" :data="indextr">
                {{ indextr + 1 }}
              </vs-td>
              <vs-td v-if="tr.name != 'Absen'" :data="tr.name_3p">
                {{ tr.name_3p }}
              </vs-td>
              <vs-td v-if="tr.name != 'Absen'" :data="tr.name">
                {{ tr.name }}
              </vs-td>
              <vs-td v-if="tr.name != 'Absen'">
                <div class="flex">
                  <custom-tooltip-button
                    text-tooltip="Pilih KPI"
                    :to="{
                      name: `kpipas`,
                      params: {
                        id: tr.id,
                        idKpi: tr.pas_3p_id,
                        id3p: id_3p,
                        name3p: tr.name_3p,
                        nameDimensi: tr.name,
                      },
                    }"
                    icon="icon-eye"
                    color="primary"
                  />

                  <!-- <vx-tooltip text="Lihat KPI">
                    <vs-button
                      icon-pack="feather"
                      icon="icon-eye"
                      size="small"
                      :to="{
                        name: `kpipas`,
                        params: {
                          id: tr.id,
                          idKpi: tr.pas_3p_id,
                          id3p: id_3p,
                          name3p: tr.name_3p,
                          nameDimensi: tr.name,
                        },
                      }"
                    >
                    </vs-button>
                  </vx-tooltip> -->

                  <!-- &nbsp;
                  <vs-button
                    icon-pack="feather"
                    icon="icon-edit"
                    color="warning"
                    size="small"
                    @click="getUpdate(tr.id)"
                  >
                  </vs-button> 
                  &nbsp;
                  <vs-button
                    color="danger"
                    icon-pack="feather"
                    @click="deletes(tr.id)"
                    icon="icon-delete"
                    size="small"
                  ></vs-button>-->
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>

      <vs-popup :active.sync="isAdd" title="Tambah Dimensi PAS">
        <vx-card title="Tambah Dimensi PAS">
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>3P</small>
              <v-select
                v-model="storeData.id_3p"
                :options="master_3p"
                v-validate="'required'"
                :reduce="(e) => e.id"
                label="name"
                :disabled="true"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('3p')">{{
                errors.first("3p")
              }}</span>
            </div>
          </div>

          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="storeData.name"
                v-validate="'required'"
                name="name"
                label="Name Dimensi"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>

          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button color="dark" type="flat" @click="isAdd = false"
                >Back</vs-button
              >
              &nbsp; &nbsp;
              <vs-button @click="store">Save</vs-button>
            </div>
          </div>
        </vx-card>
      </vs-popup>

      <vs-popup :active.sync="isUpdate" title="Update Dimensi PAS">
        <vx-card title="Tambah Dimensi PAS">
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>3P</small>
              <v-select
                v-model="updateData.id_3p"
                :options="master_3p"
                v-validate="'required'"
                :reduce="(e) => e.id"
                label="name"
              ></v-select>
              <span class="text-sm text-danger" v-show="errors.has('3p')">{{
                errors.first("3p")
              }}</span>
            </div>
          </div>

          <div class="vx-row mb-5">
            <div class="vx-col w-full">
              <vs-input
                class="w-full"
                v-model="updateData.name"
                v-validate="'required'"
                name="name"
                label="Name Dimensi"
              ></vs-input>
              <span class="text-danger text-sm" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>

          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button color="dark" type="flat" @click="isUpdate = false"
                >Back</vs-button
              >
              &nbsp; &nbsp;
              <vs-button @click="update">Save</vs-button>
            </div>
          </div>
        </vx-card>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CustomTooltipButton from "../../../../components/CustomTooltipButton.vue";
import vSelect from "vue-select";
export default {
  data() {
    return {
      datasDimensi: [],
      idDelete: null,
      id_3p: this.$route.params.id,
      isAdd: false,
      isUpdate: false,
      storeData: {
        id_3p: this.$route.params.id,
        name: "",
      },

      master_3p: [],
      updateData: {
        id: null,
        id_3p: null,
        name: "",
      },
    };
  },
  components: {
    vSelect,
    CustomTooltipButton,
  },
  computed: {
    ...mapState({
      data: (state) => state.dimensi.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "dimensi/index_per_3p",
      dispatchStore: "dimensi/store",
      dispatchUpdate: "dimensi/update",
      dispatchDestroy: "dimensi/destroy",
      dispatchShow: "dimensi/show",

      dispatchMaster: "masterpas/index",
    }),
    log(id) {
      console.log(`id : ${id}`);
    },
    goBack() {
      // this.$router.push({
      //   name: "dimensipas",
      // });
      this.$router.go(-1);
    },

    async getMaster() {
      try {
        const datas = await this.dispatchMaster();
        this.master_3p = datas.data;
        this.isAdd = true;
      } catch (error) {
        console.log(error);
      }
    },

    async getUpdate($id) {
      try {
        const datas = await this.dispatchMaster();
        this.master_3p = datas.data;

        const dimensi_data = await this.dispatchShow($id);
        this.updateData.id = dimensi_data.data["id"];
        this.updateData.id_3p = dimensi_data.data["id_3p"];
        this.updateData.name = dimensi_data.data["name"];

        this.isUpdate = true;
      } catch (error) {
        console.log(error);
      }
    },

    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.dispatchIndex();
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });

        this.datas(this.$route.params.id);
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: "Maaf, Materi sudah di jadwalkan ke user atau sudah ada data jawaban user",
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

    async store() {
      const send = new FormData();
      send.append("id_3p", this.storeData.id_3p);
      send.append("name", this.storeData.name);
      this.$vs.loading({
        type: "radius",
        color: "blue",
        textAfter: true,
        text: "Please Wait ...",
      });

      try {
        await this.dispatchStore(send);
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Success!",
          text: "Data was saved successfully!",
          color: "success",
        });
        this.datas(this.$route.params.id);
        this.isAdd = false;
      } catch (error) {
        this.$vs.loading.close();
        this.isLoading = false;
        this.$vs.notify({
          title: "Oops!",
          text: error.data.error,
          color: "danger",
        });
      }
    },

    async update() {
      const send = new FormData();
      send.append("id", this.updateData.id);
      send.append("id_3p", this.updateData.id_3p);
      send.append("name", this.updateData.name);
      send.append("_method", "PUT");

      //   console.log(...send);
      this.$vs.loading({
        type: "radius",
        color: "blue",
        textAfter: true,
        text: "Please Wait ...",
      });

      try {
        await this.dispatchUpdate(send);
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Success!",
          text: "Data was updated successfully!",
          color: "success",
        });
        this.datas(this.$route.params.id);
        this.isUpdate = false;
      } catch (error) {
        this.$vs.loading.close();
        this.isLoading = false;
        this.$vs.notify({
          title: "Oops!",
          text: error.data.error,
          color: "danger",
        });
      }
    },

    async datas(id) {
      try {
        const datas = await this.dispatchIndex(id);
        this.datasDimensi = datas.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.$vs.loading({
      type: "radius",
      color: "blue",
      textAfter: true,
      text: "Please Wait ...",
    });
    this.datas(this.$route.params.id)
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
