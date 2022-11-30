<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Employee">
        <vs-table pagination max-items="10" search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'employee-create' }">Create User</vs-button>
          </template>
          <template slot="thead">
            <vs-th>Status</vs-th>
            <vs-th></vs-th>
            <vs-th>Name</vs-th>
            <!-- <vs-th>Username</vs-th> -->
            <vs-th>Company</vs-th>
            <vs-th>Division</vs-th>
            <vs-th>Level</vs-th>
            <vs-th>NIK</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="tr.status">
                <span
                  v-if="tr.status == 1"
                  style="color: white; background-color: green; padding: 5px"
                  >Ada</span
                >
                <span
                  v-if="tr.status == 0"
                  style="color: white; background-color: red; padding: 5px"
                  >Resign</span
                >
                <!-- <span v-else>null</span> -->
              </vs-td>
              <vs-td class="img-container">
                <vs-avatar :src="image + '/files/' + tr.image" />
              </vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <!-- <vs-td :data="tr.username">{{ tr.username }}</vs-td> -->
              <vs-td :data="tr.company.name">{{ tr.company.name }}</vs-td>
              <vs-td :data="tr.organization.name">{{
                tr.organization.name
              }}</vs-td>
              <vs-td :data="tr.golongan.name">{{ tr.golongan.name }}</vs-td>
              <vs-td :data="tr.nik">{{ tr.nik }}</vs-td>
              <vs-td>
                <!-- TODO: popo up update status blm bisa -->
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{ name: `employee-edit`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
                  <!-- <vs-button
                    color="warning"
                    @click="status(tr.id)"
                    icon="note"
                    size="small"
                  ></vs-button> -->
                  <vs-button
                    @click="getDetail(tr.id)"
                    color="warning"
                    icon="note"
                    size="small"
                  ></vs-button>
                  <vs-popup
                    class="holamundo"
                    title="Status pegawai"
                    :active.sync="popupActivo2"
                    background-color="rgba(152,152,152,.1)"
                  >
                    <template>
                      <div class="vx-row">
                        <div class="w-full vx-col mb-base">
                          <vx-card>
                            <div v-if="detailUser" class="vx-row mb-5">
                              <div class="vx-col w-full">
                                <vs-input
                                  v-model="detailUser['name']"
                                  v-validate="'required'"
                                  name="name"
                                  class="w-full"
                                  label="Nama"
                                  :disabled="true"
                                ></vs-input>
                                <vs-input
                                  v-model="detailUser['id']"
                                  v-validate="'required'"
                                  name="id"
                                  class="w-full"
                                  hidden
                                ></vs-input>
                              </div>
                              <div class="vx-col w-full"></div>
                            </div>
                            <div v-else></div>
                            <div class="vx-row">
                              <div class="w-full text-right vx-col">
                                <vs-button>Save</vs-button>
                              </div>
                            </div>
                          </vx-card>
                        </div>
                      </div>
                    </template>
                  </vs-popup>
                  <!-- <vs-button
                    color="danger"
                    @click="deletes(tr.id)"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                  ></vs-button> -->
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
import dropdwon from "../../components/vuesax/dropdown/Dropdown.vue";
export default {
  data() {
    return {
      popupActivo2: false,
      idDelete: null,
      image: process.env.VUE_APP_API_URL,
      detailUser: null,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.employee.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "employee/index",
      dispatchDestroy: "employee/destroy",
      dispatchShow: "employee/show",
    }),
    async getDetail(id) {
      try {
        const data = await this.dispatchShow(id);
        this.detailUser = data.success;
        this.popupActivo2 = true;
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later `,
          color: "danger",
        });
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
    this.$vs.loading();
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
