<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="All SOP">
        <vs-table pagination max-items="15" search :data="data" class="mb-2">
          <template slot="header">
            <vs-button :to="{ name: 'sop-create' }">Create SOP</vs-button>
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
              <vs-td :data="tr.code"><p v-html="tr.code"></p></vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    icon-pack="feather"
                    icon="icon-eye"
                    :to="{
                      name: `sopallorg`,
                      params: { id: tr.id },
                    }"
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
  data() {
    return {};
  },
  computed: {
    ...mapState({
      data: (state) => state.sop.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "sop/getall",
    }),
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
