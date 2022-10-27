<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All Company">
        <vs-table search :data="data" class="mb-2">
          <!-- <template slot="header">
            <vs-button :to="{name: 'book-create'}">Create Book</vs-button>
          </template> -->
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
              <vs-td :data="tr.code"><p v-html="tr.code"></p></vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    :to="{
                      name: `companydetail`,
                      params: { id: tr.id },
                    }"
                    size="small"
                  ></vs-button>
                  <!-- <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-edit"
                    size="small"
                  ></vs-button> -->
                  <!-- <vs-button
                    color="danger"
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
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      data: (state) => state.company.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "company/index",
      dispatchGetList: "company/getlistcompany",
    }),

    async getListCompany(id) {
      const datas = await this.dispatchGetList(id);
      console.log(datas);
    },

    // check(id) {
    //   console.log(id);
    // },
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
