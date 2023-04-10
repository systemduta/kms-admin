<template>
  <!-- //URUNG cek alur softskill -->
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vx-card title="Semua Materi Softskill">
        <vs-table search :data="data" class="mb-2">
          <template slot="header">
            <vs-button
              :to="{ name: 'create-softskill' }"
              size="small"
              type="relief"
            >
              Create SoftSkill
            </vs-button>
            &nbsp; &nbsp;
            <vs-button
              :to="{ name: 'allsoftskill', params: { id: 4 } }"
              size="small"
              color="success"
              type="relief"
            >
              Lihat Semua
            </vs-button>
          </template>
          <template slot="thead">
            <vs-th>No</vs-th>
            <vs-th>Nama</vs-th>
            <vs-th>Aksi</vs-th>
          </template>
          <template slot-scope="{ data }">
            <vs-tr :key="index" v-for="(tr, index) in data">
              <vs-td :data="index">{{ index + 1 }}</vs-td>
              <vs-td :data="tr.name" v-if="tr.name == 'Staf PKWT'">Staf</vs-td>
              <vs-td :data="tr.name" v-else>{{ tr.name }}</vs-td>
              <vs-td>
                <div class="flex">
                  <vs-button
                    class="mr-2"
                    :to="{ name: `showsoftskill`, params: { id: tr.id } }"
                    icon-pack="feather"
                    icon="icon-eye"
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
    return {
      idDelete: null,
    };
  },
  computed: {
    ...mapState({
      data: (state) => state.softskill.rows,
    }),
  },
  methods: {
    ...mapActions({
      dispatchIndex: "softskill/index",
    }),
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
