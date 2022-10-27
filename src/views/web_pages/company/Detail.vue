<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Detail Company">
        Company:
        <h4 v-if="getDetail2.length > 0">{{ getDetail2[0].name }}</h4>
        <h4 v-else>-</h4>
        <vs-table pagination max-items="10" search :data="getList" class="mb-2">
          <template slot="header">
            <vs-button @click="popupActivo = true" color="primary" type="border"
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
                  <vs-button
                    class="mr-2"
                    :to="{ name: `division-edit`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
                  <!-- <vs-button
                    icon-pack="feather"
                    icon="icon-eye"
                    size="small"
                  ></vs-button> -->
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>

        <vs-popup
          class="holamundo"
          title="Tambah Divisi"
          :active.sync="popupActivo"
        >
          <template>
            <div class="vx-row">
              <div class="w-full vx-col mb-base">
                <vx-card>
                  <div class="vx-row mb-5">
                    <div class="vx-col w-full">
                      <vs-input
                        v-model="getDetail2[0].name"
                        v-validate="'required'"
                        name="name company"
                        class="w-full"
                        label="Companies"
                        :disabled="true"
                      ></vs-input>
                      <vs-input
                        v-model="company_id"
                        v-validate="'required'"
                        name="company_id"
                        class="w-full"
                        hidden
                      ></vs-input>
                    </div>
                  </div>
                  <div class="vx-row mb-5">
                    <div class="vx-col w-full">
                      <vs-input
                        v-model="name"
                        v-validate="'required'"
                        name="name"
                        label="Nama Divisi"
                        class="w-full"
                      ></vs-input>
                    </div>
                  </div>
                  <div class="vx-row mb-5">
                    <div class="vx-col w-full">
                      <vs-input
                        v-model="code"
                        v-validate="'required'"
                        name="code"
                        label="Code Divisi"
                        class="w-full"
                      ></vs-input>
                    </div>
                  </div>
                  <div class="vx-row">
                    <div class="w-full text-right vx-col">
                      <vs-button @click="store">Save</vs-button>
                    </div>
                  </div>
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
export default {
  data() {
    return {
      popupActivo: false,
      name: "",
      code: "",
      company_id: null,
      getDetail2: [],
      getList: [],
      getResponse: [],
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.company.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "company/getlistcompany",
      dispatchStore: "division/store",
      dispatchUpdate: "division/update",
    }),

    getID(id) {
      console.log(id);
    },

    store() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const payload = {
          id: this.$route.params.id,
          company_id: this.company_id,
          name: this.name,
          code: this.code,
        };
        this.$vs.loading();
        try {
          await this.dispatchStore(payload);
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Success!",
            text: "Data was saved successfully!",
            color: "success",
          });
          window.location.reload();
        } catch (error) {
          this.$vs.loading.close();
          this.$vs.notify({
            title: "Oops!",
            text: error.data.message,
            color: "danger",
          });
        }
      });
    },

    async getDetail() {
      const success = await this.dispatchIndex(this.$route.params.id);
      this.getDetail2 = success.detailcompany;
      this.getList = success.listorganizations;
      this.getResponse = success;
      this.company_id = this.getDetail2[0].id;
    },
  },
  async mounted() {
    if (this.$route.params.id) {
      await this.getDetail();
    }
  },
};
</script>
