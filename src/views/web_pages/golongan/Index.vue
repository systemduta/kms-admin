<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Semua Golongan">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button @click="isStore = true" size="small"
              >Tambah golongan</vs-button
            >
          </template>
          <template slot="thead">
            <vs-th>No.</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Code</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr + 1">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.name">{{ tr.name }}</vs-td>
              <vs-td :data="tr.code">{{ tr.code }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                    @click="show(tr.id)"
                  ></vs-button>
                  <vs-button
                    color="danger"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                    @click="deletes(tr.id)"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>

      <vs-popup title="Tambah golongan baru" :active.sync="isStore">
        <vx-card>
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <vs-input
                type="text"
                class="w-full"
                v-validate="'required'"
                name="name"
                label="Name"
                v-model="storeData.name"
              ></vs-input>
              <span class="text-sm text-danger" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <vs-input
                type="number"
                class="w-full"
                v-validate="'required'"
                name="code"
                label="Code"
                v-model="storeData.code"
              ></vs-input>
              <span class="text-sm text-danger" v-show="errors.has('code')">{{
                errors.first("code")
              }}</span>
            </div>
          </div>

          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button
                color="dark"
                type="flat"
                @click="
                  (isStore = false),
                    (storeData.code = null),
                    (storeData.name = '')
                "
                >Back</vs-button
              >
              &nbsp; &nbsp;
              <vs-button @click="store">Save</vs-button>
            </div>
          </div>
        </vx-card>
      </vs-popup>

      <vs-popup title="Edit golongan" :active.sync="isUpdate">
        <vx-card>
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <vs-input
                type="text"
                class="w-full"
                v-validate="'required'"
                name="name"
                label="Name"
                v-model="storeData.name"
              ></vs-input>
              <span class="text-sm text-danger" v-show="errors.has('name')">{{
                errors.first("name")
              }}</span>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <vs-input
                type="number"
                class="w-full"
                v-validate="'required'"
                name="code"
                label="Code"
                v-model="storeData.code"
              ></vs-input>
              <span class="text-sm text-danger" v-show="errors.has('code')">{{
                errors.first("code")
              }}</span>
            </div>
          </div>

          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button
                color="dark"
                type="flat"
                @click="
                  (isStore = false),
                    (storeData.code = null),
                    (storeData.name = '')
                "
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
export default {
  data() {
    return {
      isStore: false,
      isUpdate: false,
      idDelete: null,
      storeData: {
        id: null,
        name: "",
        code: null,
      },
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.golongan.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "golongan/index",
      dispatchStore: "golongan/store",
      dispatchShow: "golongan/show",
      dispatchUpdate: "golongan/update",
      dispatchDestroy: "golongan/destroy",
    }),
    async confirmDelete() {
      try {
        await this.dispatchDestroy(this.idDelete);
        this.dispatchIndex();
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });
        this.dispatchIndex(3);
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

    async show(id) {
      try {
        var res = await this.dispatchShow(id);
        // console.log(res.data);
        this.storeData.id = res.data.id;
        this.storeData.name = res.data.name;
        this.storeData.code = res.data.code;

        this.isUpdate = true;
      } catch (error) {
        console.log(error);
      }
    },

    async store() {
      const data = new FormData();
      data.append("name", this.storeData.name);
      data.append("code", this.storeData.code);

      this.$vs.loading({
        type: "radius",
        color: "blue",
        textAfter: true,
        text: "Please Wait ...",
      });
      try {
        await this.dispatchStore(data);
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Success!",
          text: "Data was saved successfully!",
          color: "success",
        });
        this.isStore = false;
        this.dispatchIndex();
      } catch (error) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
        this.isStore = false;
      }
    },

    async update() {
      const data = new FormData();
      data.append("id", this.storeData.id);
      data.append("name", this.storeData.name);
      data.append("code", this.storeData.code);
      data.append("_method", "PUT");

      this.$vs.loading({
        type: "radius",
        color: "blue",
        textAfter: true,
        text: "Please Wait ...",
      });
      try {
        await this.dispatchUpdate(data);
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Success!",
          text: "Data was update successfully!",
          color: "success",
        });
        this.isUpdate = false;
        this.dispatchIndex();
      } catch (error) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Oops!",
          text: error.data.message,
          color: "danger",
        });
        this.isUpdate = false;
      }
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
