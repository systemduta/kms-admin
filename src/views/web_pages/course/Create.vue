<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Input Data Course">
        <div class="w-full vx-col">
          <input
            class="hidden"
            type="file"
            @change="changeImage"
            ref="imageInput"
            v-validate="'required|ext:jpg,jpeg,png|size:1024'"
            data-vv-as="Course Image"
            name="image"
            accept="image/jpeg,image/png"
          /><br />
          <img
            v-if="image.length < 1"
            src="@/assets/images/upload.png"
            width="100"
            height="100"
            alt=""
            class="preview"
            @click="$refs.imageInput.click()"
          />
          <img
            v-if="image.length > 0"
            :src="image"
            alt=""
            class="preview"
            @click="$refs.imageInput.click()"
          />
          <span
            class="text-sm text-danger center"
            v-show="errors.has('image')"
            >{{ errors.first("image") }}</span
          >
        </div>
        <div class="mt-10 mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="title"
              label="Title"
              v-model="storeData.title"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('title')">{{
              errors.first("title")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              class="w-full"
              v-validate="'required'"
              name="description"
              label="Description"
              v-model="storeData.description"
            ></vs-input>
            <span
              class="text-sm text-danger"
              v-show="errors.has('description')"
              >{{ errors.first("description") }}</span
            >
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <vs-input
              class="w-full"
              name="link"
              label="Link"
              v-model="storeData.link"
            ></vs-input>
            <span class="text-sm text-danger" v-show="errors.has('link')">{{
              errors.first("link")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2">Type</small> <br />
            <vs-radio
              class="ml-2 mr-2"
              v-model="storeData.type"
              vs-value="4"
              v-if="company_id == 1"
              >Soft Skill</vs-radio
            >
            <vs-radio class="ml-2 mr-2" v-model="storeData.type" vs-value="1"
              >Hard Skill</vs-radio
            >
            <vs-radio
              class="ml-2 mr-2"
              v-model="storeData.type"
              vs-value="2"
              v-if="company_id == 1"
              >Our Company</vs-radio
            >
            <vs-radio
              class="ml-2 mr-2"
              v-model="storeData.type"
              vs-value="3"
              v-if="company_id == 1"
              >Corporate Value</vs-radio
            >
          </div>
        </div>
        <div class="mb-5 vx-row" v-if="storeData.type == 1">
          <div class="w-full vx-col">
            <small class="ml-2">Organization</small> <br />
            <v-select
              v-model="storeData.organization_id"
              :options="organizations.filter((e) => e.company_id == company_id)"
              v-validate="'required'"
              name="organization"
              :reduce="(e) => e.id"
              label="name"
            ></v-select>
            <span
              class="text-sm text-danger"
              v-show="errors.has('organization')"
              >{{ errors.first("organization") }}</span
            >
          </div>
        </div>
        <div class="mb-5 vx-row" v-if="storeData.type == 1">
          <div class="w-full vx-col">
            <small class="ml-2">Level</small> <br />
            <v-select
              v-model="storeData.golongan_id"
              :options="golongans"
              v-validate="'required'"
              name="level"
              :reduce="(e) => e.id"
              label="name"
            ></v-select>
            <span class="text-sm text-danger" v-show="errors.has('level')">{{
              errors.first("level")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2">Upload pdf file</small> <br />
            <input
              class="w-full"
              type="file"
              id="file"
              ref="file"
              @change="getBase64File"
              name="pdf_file"
              v-validate="'required|ext:pdf|size:3072'"
            />
            <span class="text-sm text-danger" v-show="errors.has('pdf_file')">{{
              errors.first("pdf_file")
            }}</span>
          </div>
        </div>
        <div class="mb-5 vx-row">
          <div class="w-full vx-col">
            <small class="ml-2">Upload video (mp4)</small> <br />
            <!--            <input class="ml-2 mr-2" type="file" id="video" ref="file" @change="getBase64Video"/>-->
            <input
              class="w-full"
              type="file"
              id="video"
              ref="video"
              name="video"
              @change="readVideo"
              v-validate="'ext:mp4|size:20480'"
            />
            <span class="text-sm text-danger" v-show="errors.has('video')">{{
              errors.first("video")
            }}</span>
          </div>
        </div>
        <hr style="margin-top: 30px" />
        <!-- <div v-if="!this.$route.params.id" class="mb-10 vx-row"> -->
        <div v-if="!this.$route.params.id">
          <div class="mt-3 mb-10 vx-row">
            <div class="w-full vx-col">
              <h4><b>List Pertanyaan</b></h4>
            </div>
          </div>
          <div
            class="mb-5 vx-row"
            v-for="(item, index) in storeData.questions"
            :key="index"
          >
            <div class="w-full vx-col">
              <h6 class="mb-2">Soal No. {{ index + 1 }}</h6>
              <quill-editor v-model="item.description" />
              <table class="w-full">
                <thead>
                  <tr>
                    <th>Answer List</th>
                    <th width="110">True Answer</th>
                  </tr>
                </thead>
                <tr v-for="(tr, i) in item.answers" :key="i">
                  <td>
                    <vs-input
                      class="w-full"
                      label-placeholder="Answer"
                      v-model="tr.name"
                    ></vs-input>
                  </td>
                  <td class="text-center">
                    <vs-checkbox
                      vs-name="radio-answer"
                      class="mt-5"
                      v-model="tr.is_true"
                    ></vs-checkbox>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <vs-button
            color="primary"
            type="border"
            size="small"
            icon="add"
            @click="addQuestion"
            >Soal</vs-button
          >
          <vs-progress
            :percent="uploadProgress"
            color="primary"
            v-if="isLoading"
            >primary</vs-progress
          >
          <div v-if="isLoading">
            Saving data progress: {{ uploadProgress }} %
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full text-right vx-col">
            <vs-button @click="store" :disabled="isLoading">Save</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import vSelect from "vue-select";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "CreateCourse",
  components: {
    vSelect,
    quillEditor,
  },
  data() {
    return {
      organizations: [],
      golongans: [],
      company_id: JSON.parse(localStorage.getItem("userInfo")).data.company_id,
      allowedImageType: ["image/jpeg", "image/png"],
      isLoading: false,
      isQuestionComplete: false,
      image: "",
      storeData: {
        id: this.$route.params.id,
        organization_id: null,
        golongan_id: null,
        image: "",
        title: "",
        description: "",
        file: "",
        video: "",
        link: "",
        type: 1,
        questions: [
          {
            is_pre_test: "",
            description: "",
            answers: [
              {
                name: "",
                is_true: 0,
              },
              {
                name: "",
                is_true: 0,
              },
              {
                name: "",
                is_true: 0,
              },
              {
                name: "",
                is_true: 0,
              },
            ],
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      uploadProgress: (state) => state.course.upload_progress,
    }),
  },
  methods: {
    ...mapActions({
      dispatchStore: "course/store",
      dispatchUpdate: "course/update",
      dispatchShow: "course/show",
      dispatchGetOrganizations: "master/organizations",
      dispatchGetGolongans: "master/golongans",
    }),
    async getMaster() {
      const org = await this.dispatchGetOrganizations();
      this.organizations = org.data;
      const gol = await this.dispatchGetGolongans();
      this.golongans = gol.data;
    },
    addQuestion() {
      const blank_question = {
        is_pre_test: "",
        description: "",
        answers: [
          {
            name: "",
            is_true: 0,
          },
          {
            name: "",
            is_true: 0,
          },
          {
            name: "",
            is_true: 0,
          },
          {
            name: "",
            is_true: 0,
          },
        ],
      };
      this.storeData.questions.push(blank_question);
    },
    checkQuestion() {
      let vm = this;
      this.storeData.questions.every(function (item, index) {
        if (!item.description) {
          vm.isQuestionComplete = true;
          // alert(`Soal nomor ${index+1} belum terisi`);
          return true;
        } else {
          let key = false;
          let choose = true;
          item.answers.forEach(function (answer, i) {
            if (!answer.name) {
              choose = false;
              alert(
                `Ada pilihan jawaban untuk soal nomor ${index + 1} belum terisi`
              );
              return false;
            } else if (answer.is_true == true) key = true;
          });
          if (!key) {
            vm.isQuestionComplete = false;
            alert(`Kunci jawaban untuk soal nomor ${index + 1} belum ada`);
            return false;
          } else {
            vm.isQuestionComplete = choose;
          }
        }
      });
    },
    convertToFormData() {
      this.checkQuestion();
      if (!this.isQuestionComplete) return false;
      const data = new FormData();
      // eslint-disable-next-line no-unexpected-multiline
      [
        "id",
        "organization_id",
        "golongan_id",
        "image",
        "title",
        "description",
        "file",
        "video",
        "link",
        "type",
        "questions",
      ].forEach((key) => {
        if (key == "questions") {
          this.storeData.questions.forEach(function (question, index) {
            data.append(
              `questions[${index}][is_pre_test]`,
              question.is_pre_test
            );
            data.append(
              `questions[${index}][description]`,
              question.description
            );
            question.answers.forEach(function (answer, i) {
              data.append(
                `questions[${index}][answers][${i}][name]`,
                answer.name
              );
              data.append(
                `questions[${index}][answers][${i}][is_true]`,
                answer.is_true ? 1 : 0
              );
            });
          });
        } else if (this.storeData[key])
          data.append(`${key}`, this.storeData[key]);
      });
      if (this.$route.params.id) data.append("_method", "PUT");
      return data;
    },
    store() {
      this.$validator.validateAll().then(async (res) => {
        if (!res) return false;
        const formData = this.convertToFormData();
        if (!formData) return false;
        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0] }, ${  pair[1]}`)
        // }
        this.$vs.loading();
        this.isLoading = true;
        try {
          if (this.$route.params.id) {
            await this.dispatchUpdate(formData);
          } else {
            await this.dispatchStore(formData);
          }
          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Success!",
            text: "Data was saved successfully!",
            color: "success",
          });
          this.$router.push({ name: "course" });
        } catch (error) {
          this.$vs.loading.close();
          this.isLoading = false;
          this.$vs.notify({
            title: "Oops!",
            text: error.data.message,
            color: "danger",
          });
        }
      });
    },
    async getDetail() {
      const { success } = await this.dispatchShow(this.$route.params.id);
      this.storeData.organization_id = success.organization_id;
      this.image = success.image
        ? `${process.env.VUE_APP_API_URL}/files/${success.image}`
        : "";
      this.storeData.title = success.title;
      this.storeData.description = success.description;
      this.storeData.file = success.file;
      this.storeData.video = success.video;
      this.storeData.link = success.link;
      this.storeData.type = success.type;
      // this.storeData.questions = success.description
    },
    async changeImage(e) {
      const image = e.target;
      if (image.files && image.files[0]) {
        const filterFormat = await this.allowedImageType.filter(
          (e) => e === image.files[0].type
        );
        if (filterFormat.length < 1)
          return this.$vs.notify({
            title: "Maaf!",
            text: "File bukan berupa gambar!",
            color: "warning",
          });
        const reader = new FileReader();
        reader.onload = async (e) => {
          // this.image = e.target.result
          this.storeData.image = e.target.result;
          this.image = e.target.result;
        };
        reader.readAsDataURL(image.files[0]);
      }
    },
    getBase64File(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        // this.file = reader.result
        this.storeData.file = reader.result;
      };
      this.$emit("input", event.target.files[0]);
    },
    getBase64Video(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.video = reader.result;
      };
      this.$emit("input", event.target.files[0]);
    },
    async readVideo(event) {
      const video = event.target.files[0];
      return this.$set(this.storeData, "video", video);
    },
  },
  async mounted() {
    await this.getMaster();
    if (this.$route.params.id) {
      this.getDetail();
    }
  },
};
</script>

<style lang="scss" scoped>
.preview {
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  cursor: pointer;
  border-radius: 5px;
}
.center {
  margin-left: auto;
  margin-right: auto;
  display: block;
  text-align: center;
  margin-bottom: 5px;
}
.text-small {
  font-size: 12px;
  padding-left: 5px;
}
</style>
