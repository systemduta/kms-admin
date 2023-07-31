<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card>
        <div class="mb-5 vx-row">
          <div class="ml-5 w-full vx-col">
            <label>Email : </label>
            <div
              v-for="(email, index) in storeData.email"
              :key="index"
              class="col-md-12 mt-2"
            >
              <div class="form-group">
                <input
                  type="email"
                  v-model="storeData.email[index]"
                  :name="'email[' + index + ']'"
                  placeholder="Email Address"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addEmailInput"
            >
              Add Another Email
            </button>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="ml-5 w-full vx-col">
            <label for="title">Judul</label>
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="title"
              v-model="storeData.title"
            ></vs-input>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="ml-5 w-full vx-col">
            <label for="title">Pesan</label>
            <quill-editor
              class="quil"
              v-model="storeData.message"
              v-validate="'required'"
              name="message"
            />
          </div>
        </div>

        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button class="mr-5" @click="send">Send</vs-button>
          </div>
        </div>

        <div class="mb-5 vx-row">
          <div class="ml-5 w-full vx-col">
            <span class="text-danger"
              >*tidak direkomendasikan mengirim file (gambar, video atau yang
              lain)</span
            >
          </div>
        </div>
      </vx-card>
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
      storeData: {
        email: [""],
        title: "",
        message: "",
      },
    };
  },
  components: {
    quillEditor,
  },
  methods: {
    ...mapActions({
      dispatchStore: "email/store",
    }),
    addEmailInput() {
      this.storeData.email.push(""); // Add an empty email field to the array
    },
    async send() {
      try {
        this.$vs.loading({
          type: "radius",
          color: "blue",
          textAfter: true,
          text: "Please Wait ...",
        });
        var res = await this.dispatchStore(this.storeData);
        if (res.statusCode !== 200) {
          this.$vs.notify({
            title: "Oops!",
            text: `(${res.message})`,
            color: "danger",
            time: 4000,
          });
        } else {
          this.$vs.notify({
            title: "Success",
            text: "Email telah berhasil dikirim",
            color: "primary",
          });
          this.storeData = {
            email: [""],
            title: "",
            message: "",
          };
        }
        this.$vs.loading.close();
      } catch (error) {
        this.$vs.loading.close();
        this.$vs.notify({
          title: "Oops!",
          text: `Looks like something went wrong. please try again later (${error.message})`,
          color: "danger",
        });
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.quil {
  min-height: 100px;
}
</style>
