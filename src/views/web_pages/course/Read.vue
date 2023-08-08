<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vs-button
        class="ml-4 my-2"
        icon-pack="feather"
        icon="icon-arrow-left"
        size="small"
        type="border"
        @click="goBack"
      >
        Back
      </vs-button>
      <vx-card :title="'All Course : ' + this.$route.params.name">
        <!-- Division:
        <h4></h4> -->
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button
              :to="{ name: 'course-create' }"
              icon-pack="feather"
              icon="icon-plus-circle"
              size="small"
              type="filled"
            >
              Create Course
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th>Image</vs-th>
            <vs-th>Title</vs-th>
            <vs-th>Description</vs-th>
            <vs-th>Type</vs-th>
            <vs-th>
              <vx-tooltip text="kode golongan - nama golongan">
                Golongan
              </vx-tooltip>
            </vs-th>
            <vs-th>Action</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td class="img-container">
                <img
                  :src="base_url_image + '/files/' + tr.image"
                  width="150"
                  height="100"
                  class="product-img"
                />
              </vs-td>
              <vs-td :data="tr.title">
                <router-link
                  :to="{ name: 'course-detail', params: { id: tr.id } }"
                  >{{ tr.title }}</router-link
                >
              </vs-td>
              <vs-td :data="tr.description">{{ tr.description }}</vs-td>
              <vs-td :data="tr.type" v-if="tr.type === 1">Hard Skill</vs-td>
              <vs-td :data="tr.type" v-if="tr.type === 4">Soft Skill</vs-td>
              <vs-td :data="tr.type" v-if="tr.type === 2">Our Company</vs-td>
              <vs-td :data="tr.type" v-if="tr.type === 3">
                Corporate Value
              </vs-td>
              <vs-td :data="tr.golongan_name">
                {{ tr.golongan_code }} - {{ tr.golongan_name }}
              </vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    @click="downData(tr.id)"
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-download"
                    size="small"
                  ></vs-button>
                  <vs-button
                    class="mr-2"
                    :to="{ name: `course-edit`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button>
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
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["namediv"],
  data() {
    return {
      name_div: "",
      idDelete: null,
      base_url_image: process.env.VUE_APP_API_URL,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.course.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "course/getCourse",
      dispatchDestroy: "course/destroy",
      dispatchDown: "course/getDown",
    }),

    goBack() {
      this.$router.go(-1);
    },

    async downData(id) {
      this.$http
        .get("api/web/downcourse/" + id)
        .then((response) => {
          // console.log(response.data.data);
          const link = document.createElement("a");
          link.href =
            process.env.VUE_APP_API_URL + "/files/" + response.data.data;
          link.setAttribute("target", "_blank");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          console.log(error);
        });
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
        this.dispatchIndex(this.$route.params.id);
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
    // console.log(this.$route.name_div);
    // this.name_div = this.$route.params.name;
    this.dispatchIndex(this.$route.params.id)
      .then(() => {
        this.$vs.loading.close();
      })
      .catch(() => {
        this.$vs.loading.close();
      });
  },
};
</script>
