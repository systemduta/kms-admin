<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card title="All Division">
        <vs-table pagination :length="10" search :data="data" class="mb-2">
          <template slot="header">
            <vs-button @click="popupinsert">Create Message</vs-button>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Perusahaan</vs-th>
            <vs-th>Divisi</vs-th>
            <vs-th>Pesan</vs-th>
            <vs-th>Status</vs-th>
            <vs-th></vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td :data="indextr">{{ indextr + 1 }}</vs-td>
              <vs-td :data="tr.username">{{ tr.username }}</vs-td>
              <vs-td :data="tr.comname">{{ tr.comname }}</vs-td>
              <vs-td :data="tr.orgname">{{ tr.orgname }}</vs-td>
              <vs-td :data="tr.content" v-if="tr.content">Ada isi</vs-td>
              <vs-td :data="tr.isSee" v-if="tr.isSee">Sudah dilihat</vs-td>
              <vs-td :data="tr.isSee" v-else>Belum dilihat</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                    @click="popupedit(tr.id)"
                  ></vs-button>
                  <!-- <vs-button
                    class="mr-2"
                    :to="{ name: `division-edit`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button> -->
                  <vs-button
                    color="danger"
                    @click="deletes(tr.id)"
                    icon-pack="feather"
                    icon="icon-delete"
                    size="small"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vx-card>

      <!--popup insert-->
      <!-- <vs-popup fullscreen title="Insert Message" :active.sync="isInsert">
        <div class="vx-row">
          <div class="w-full vx-col mb-base">
            <vx-card>
              <div class="mb-5 vx-row">
                <div class="ml-5 w-full vx-col">
                  <label>Nama : </label>
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    v-model="storeData.user_id"
                  >
                    <option v-for="option in listUser" :value="option.user_id">
                      {{ option.user_name }} - {{ option.user_pos }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mb-5 vx-row">
                <div class="ml-5 w-full vx-col">
                  <label for="title">Judul</label>
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    name="subject"
                    v-model="storeData.subject"
                  ></vs-input>
                </div>
              </div>

              <div class="mb-5 vx-row">
                <div class="ml-5 w-full vx-col">
                  <label for="title">Content</label>
                  <quill-editor
                    class="quil"
                    v-model="storeData.content"
                    v-validate="'required'"
                    name="content"
                  />
                </div>
              </div>

              <div class="vx-row">
                <div class="w-full text-right vx-col">
                  <vs-button
                    color="dark"
                    type="flat"
                    @click="popupinsert = false"
                    >Back</vs-button
                  >
                  &nbsp; &nbsp;
                  <vs-button @click="send">Send</vs-button>
                </div>
              </div>
            </vx-card>
          </div>
        </div>
      </vs-popup> -->

      <!--popup edit-->
      <vs-popup fullscreen title="Update Message" :active.sync="isEdit">
        <div class="vx-row">
          <div class="w-full vx-col mb-base">
            <vx-card>
              <div class="mb-5 vx-row">
                <div class="ml-5 w-full vx-col">
                  <label>Nama : </label>
                  <select
                    class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    v-model="storeData.user_id"
                  >
                    <option v-for="option in listUser" :value="option.user_id">
                      {{ option.user_name }} - {{ option.user_pos }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mb-5 vx-row">
                <div class="ml-5 w-full vx-col">
                  <label for="title">Judul</label>
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    name="subject"
                    v-model="storeData.subject"
                  ></vs-input>
                </div>
              </div>

              <div class="mb-5 vx-row">
                <div class="ml-5 w-full vx-col">
                  <label for="title">Content</label>
                  <quill-editor
                    class="quil"
                    v-model="storeData.content"
                    v-validate="'required'"
                    name="content"
                  />
                </div>
              </div>
            </vx-card>
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      idDelete: null,
      isInsert: false,
      isEdit: false,
      image: process.env.VUE_APP_API_URL,
      listUser: [],
      storeData: {
        id: null,
        user_id: null,
        subject: "",
        content: "",
        isSee: "",
      },
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.message.rows,
    }),
  },

  components: {
    quillEditor,
  },
  methods: {
    ...mapActions({
      dispatchIndex: "message/index",
      dispatchDestroy: "message/destroy",
      dispatchStore: "message/store",
      dispatchShow: "message/show",

      dispatchGetUser: "employee/index",
    }),
    // async popupedit(id) {
    //   //   console.log(id);
    //   const res = await this.dispatchGetUser();
    //   this.listUser = res.data.map((i) => {
    //     return {
    //       user_id: i.id,
    //       user_name: i.name,
    //       user_pos: i.organization["name"],
    //     };
    //   });
    //   const resShow = await this.dispatchShow(id);
    //   //   console.log(res.data);
    //   this.storeData.id = resShow.data["id"];
    //   this.storeData.user_id = resShow.data["user_id"];
    //   this.storeData.subject = resShow.data["subject"];
    //   this.storeData.content = resShow.data["content"];
    //   this.isEdit = true;
    // },
    async send() {
      const data = new FormData();
      data.append("user_id", this.storeData.user_id);
      data.append("subject", this.storeData.subject);
      data.append("content", this.storeData.content);
      data.append("isSee", this.storeData.isSee);

      //   console.log(...data);
      try {
        // await this.disp
        await this.dispatchStore(data);
        this.$vs.notify({
          title: "Success",
          text: "Your data has been deleted successfully",
          color: "primary",
        });

        await this.dispatchIndex();
        this.isInsert = false;
      } catch (error) {
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later (${error.data.message})`,
          color: "danger",
        });
      }
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

    async popupinsert() {
      const res = await this.dispatchGetUser();
      this.listUser = res.data.map((i) => {
        return {
          user_id: i.id,
          user_name: i.name,
          user_pos: i.organization["name"],
        };
      });

      //   console.log(this.listUser);
      this.isInsert = true;
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

<style scoped>
.quil {
  min-height: 100px;
}
</style>
