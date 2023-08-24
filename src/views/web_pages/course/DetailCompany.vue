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
      <vx-card title="Detail Per Company">
        Company:
        <h4 v-if="getDetail2.length > 0">{{ getDetail2[0].name }}</h4>
        <h4 v-else>-</h4>
        <vs-table pagination max-items="10" search :data="getList" class="mb-2">
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
                    :to="{
                      name: `course-read`,
                      params: { id: tr.id, name: tr.name },
                    }"
                    icon-pack="feather"
                    icon="icon-edit"
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
import { mapState, mapActions } from 'vuex'
import axios from '@/axios'
export default {
  data () {
    return {
      popupActivo: false,
      popupActivo2: false,
      name: '',
      code: '',
      company_id: null,
      getDetail2: [],
      getList: [],
      getResponse: [],
      getDetailUsers: []
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.company.rows
    })
  },
  methods: {
    ...mapActions({
      dispatchIndex: 'sop/getsoporg'
      //   dispatchStore: "division/store",
      //   dispatchUpdate: "division/update",
    }),

    //   getID(id) {
    //     axios
    //       .post("/api/web/getdetailcompany", {
    //         idcompany: this.$route.params.id,
    //         iddivision: id,
    //       })
    //       .then((res) => {
    //         this.getDetailUsers = res.data.data;
    //         this.popupActivo2 = true;
    //       });
    //   },

    goBack () {
      this.$router.go(-1)
    },

    async getDetail () {
      const success = await this.dispatchIndex(this.$route.params.id)
      this.getDetail2 = success.detailcompany
      this.getList = success.listorganizations
      this.getResponse = success
      this.company_id = this.getDetail2[0].id
    }
  },
  async mounted () {
    if (this.$route.params.id) {
      await this.getDetail()
    }
  }
}
</script>
