<!-- ini harusnya user bisa pilih tanggal kemudian dan ketik klik go maka user
    bisa melihat skor akhir PAS pada bulan yang dipilih. data yang mungkin
    dibutuhkan : 
    1. id user 
    2. id company 
    3. id divisi 
    4. id 3p 
    5. id -->

<template>
  <div class="vx-row">
    <div class="w-full vx-col mb-base">
      <vs-button
        color="primary"
        type="flat"
        icon="arrow_back_ios"
        @click="goBack"
        >Kembali</vs-button
      >
      <vx-card title="Penilaian KPI PAS">
        <table>
          <tr>
            <td style="width: 40%">Nama Perusahaan</td>
            <td style="width: 5%">:</td>
            <td class="mr-3">
              {{ datas3 && datas3.dataCompany && datas3.dataCompany.name }}
            </td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Divisi</td>
            <td style="width: 5%">:</td>
            <td>{{ datas3 && datas3.dataOrg && datas3.dataOrg.name }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Nama Karyawan</td>
            <td style="width: 5%">:</td>
            <td>{{ datas3 && datas3.dataUser && datas3.dataUser.name }}</td>
          </tr>
          <tr>
            <td style="width: 40%">Tanggal Penilaian</td>
            <td style="width: 5%">:</td>
            <td>{{ formattedDate }}</td>
          </tr>
          <tr>
            <td style="width: 40%; font-weight: bold">Status Page</td>
            <td style="width: 5%; font-weight: bold">:</td>
            <td style="font-weight: bold">
              <div class="flex items-center">
                <span v-if="isEdit">Show Mode</span>
                <span v-else>Edit Mode</span>
                <vs-button
                  color="primary"
                  type="flat"
                  icon="edit"
                  @click="
                    isEdit = !isEdit;
                    isEdit2 = !isEdit2;
                  "
                ></vs-button>
              </div>
            </td>
          </tr>
        </table>
      </vx-card>

      <hr />
      <vx-card title="Detail">
        <div v-for="(item, index) in recordPas.detailSkor3p" :key="index">
          <div v-if="recordPas && recordPas.detailSkor3p">
            <vx-card
              v-if="item.id_3p == 1"
              :title="item.name3p"
              style="margin-bottom: 10px"
            >
              <div>
                <vx-card title="Absen">
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-3">Keterangan</div>
                      <div class="col-sm-3">Hari</div>
                      <div class="col-sm-3">%</div>
                      <div class="col-sm-3">Skor</div>
                    </div>
                    <div
                      class="row mb-3"
                      v-for="i in item.detail.Absen.detailAbsen"
                      :key="i.id"
                    >
                      <div class="col-sm-3">
                        {{ i.nameKPI }}
                      </div>
                      <div class="col-sm-3">
                        <input
                          type="number"
                          v-model="i.nilai"
                          @change="updateNilai(item)"
                          :disabled="isEdit"
                        />
                      </div>
                      <div class="col-sm-3" v-if="i.kpi_id === 10">
                        {{ perSakit }}
                      </div>
                      <div class="col-sm-3" v-if="i.kpi_id === 11">
                        {{ perIzin }}
                      </div>
                      <div class="col-sm-3" v-if="i.kpi_id === 12">
                        {{ perTerlambat }}
                      </div>
                      <div class="col-sm-3" v-if="i.kpi_id === 13">
                        {{ perAlpha }}
                      </div>
                      <div class="col-sm-3" v-if="i.kpi_id === 14">
                        {{ perHKA }}
                      </div>
                      <div class="col-sm-3" v-if="i.kpi_id === 14">
                        {{ skorabsen }}
                      </div>
                    </div>
                    <hr />
                    <table class="table">
                      <tr>
                        <td style="width: 20%">Nilai Maximal</td>
                        <td style="width: 5%">:</td>
                        <td>
                          {{ recordPas.detailSkor3p[0].detail.Absen.max_nilai }}
                        </td>
                      </tr>
                      <tr>
                        <td style="width: 20%; font-weight: bold">
                          Nilai Akhir
                        </td>
                        <td style="width: 5%; font-weight: bold">:</td>
                        <td style="font-weight: bold">
                          {{ recordPas.detailSkor3p[0].detail.Absen.nilai }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Unity">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Unity',
                      recordPas.detailSkor3p[0].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    class="row mb-2"
                    v-for="(y, index) in recordPas.detailSkor3p[0].detail.Unity"
                    :key="index"
                  >
                    <div class="col-sm-5">
                      {{ y.nameKpi }}
                    </div>
                    <div
                      class="col-sm-4"
                      style="display: flex; align-items: center"
                    >
                      {{ y.nilai }}
                      <vs-button
                        v-show="isEdit2"
                        class="ml-2"
                        icon-pack="feather"
                        icon="icon-eye"
                        size="small"
                        @click="
                          getInd(recordPas.detailSkor3p[0].id_3p, y.kpi_id)
                        "
                      ></vs-button>
                    </div>

                    <div class="col-sm-3">{{ y.max_nilai }}</div>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Visi">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Visi',
                      recordPas.detailSkor3p[0].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    class="row mb-2"
                    v-for="(y, index) in recordPas.detailSkor3p[0].detail.Visi"
                    :key="index"
                  >
                    <div class="col-sm-5">
                      {{ y.nameKpi }}
                    </div>
                    <div
                      class="col-sm-4"
                      style="display: flex; align-items: center"
                    >
                      {{ y.nilai }}
                      <vs-button
                        v-show="isEdit2"
                        class="ml-2"
                        icon-pack="feather"
                        icon="icon-eye"
                        size="small"
                        @click="
                          getInd(recordPas.detailSkor3p[0].id_3p, y.kpi_id)
                        "
                      ></vs-button>
                    </div>

                    <div class="col-sm-3">{{ y.max_nilai }}</div>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Hati">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Hati',
                      recordPas.detailSkor3p[0].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    class="row mb-2"
                    v-for="(y, index) in recordPas.detailSkor3p[0].detail.Hati"
                    :key="index"
                  >
                    <div class="col-sm-5">
                      {{ y.nameKpi }}
                    </div>
                    <div
                      class="col-sm-4"
                      style="display: flex; align-items: center"
                    >
                      <div class="row-sm-2">{{ y.nilai }}</div>
                      <div class="row-sm-2">
                        <vs-button
                          v-show="isEdit2"
                          class="ml-2"
                          icon-pack="feather"
                          icon="icon-eye"
                          size="small"
                          @click="
                            getInd(recordPas.detailSkor3p[0].id_3p, y.kpi_id)
                          "
                        ></vs-button>
                      </div>
                    </div>

                    <div class="col-sm-3">{{ y.max_nilai }}</div>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Semangat">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Semangat',
                      recordPas.detailSkor3p[0].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    class="row mb-2"
                    v-for="(y, index) in recordPas.detailSkor3p[0].detail
                      .Semangat"
                    :key="index"
                  >
                    <div class="col-sm-5">
                      {{ y.nameKpi }}
                    </div>
                    <div
                      class="col-sm-4"
                      style="display: flex; align-items: center"
                    >
                      {{ y.nilai }}
                      <vs-button
                        v-show="isEdit2"
                        class="ml-2"
                        icon-pack="feather"
                        icon="icon-eye"
                        size="small"
                        @click="
                          getInd(recordPas.detailSkor3p[0].id_3p, y.kpi_id)
                        "
                      ></vs-button>
                    </div>

                    <div class="col-sm-3">{{ y.max_nilai }}</div>
                  </div>
                </vx-card>
              </div>
            </vx-card>
            <vx-card
              v-if="item.id_3p == 2"
              :title="item.name3p"
              style="margin-bottom: 10px"
              ><br />
              <div>
                <vx-card title="Routine">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Routine',
                      recordPas.detailSkor3p[1].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    class="row mb-2"
                    v-for="(y, index) in recordPas.detailSkor3p[1].detail
                      .Routine"
                    :key="index"
                  >
                    <div class="col-sm-5">
                      {{ y.nameKpi }}
                    </div>
                    <div
                      class="col-sm-4"
                      style="display: flex; align-items: center"
                    >
                      {{ y.nilai }}
                      <vs-button
                        v-show="isEdit2"
                        class="ml-2"
                        icon-pack="feather"
                        icon="icon-eye"
                        size="small"
                        @click="
                          getInd(recordPas.detailSkor3p[1].id_3p, y.kpi_id)
                        "
                      ></vs-button>
                      <!-- <vs-button
                      v-show="isEdit2"
                      class="ml-2"
                      icon="remove_circle"
                      size="small"
                      color="red"
                      @click="hapusElement(y.dimensi_id, y.kpi_id)"
                    ></vs-button> -->
                    </div>

                    <div class="col-sm-3">{{ y.max_nilai }}</div>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Cross Function">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Cross Function',
                      recordPas.detailSkor3p[1].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    class="row mb-2"
                    v-for="(y, index) in recordPas.detailSkor3p[1].detail[
                      'Cross Function'
                    ]"
                    :key="index"
                  >
                    <div class="col-sm-5">
                      {{ y.nameKpi }}
                    </div>
                    <div
                      class="col-sm-4"
                      style="display: flex; align-items: center"
                    >
                      {{ y.nilai }}
                      <vs-button
                        v-show="isEdit2"
                        class="ml-2"
                        icon-pack="feather"
                        icon="icon-eye"
                        size="small"
                        @click="
                          getInd(recordPas.detailSkor3p[1].id_3p, y.kpi_id)
                        "
                      ></vs-button>
                      <!-- <vs-button
                      v-show="isEdit2"
                      class="ml-2"
                      icon="remove_circle"
                      size="small"
                      color="red"
                      @click="hapusElement(y.dimensi_id, y.kpi_id)"
                    ></vs-button> -->
                    </div>

                    <div class="col-sm-3">{{ y.max_nilai }}</div>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Interaction">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Interaction',
                      recordPas.detailSkor3p[1].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    class="row mb-2"
                    v-for="(y, index) in recordPas.detailSkor3p[1].detail
                      .Interaction"
                    :key="index"
                  >
                    <div class="col-sm-5">
                      {{ y.nameKpi }}
                    </div>
                    <div
                      class="col-sm-4"
                      style="display: flex; align-items: center"
                    >
                      {{ y.nilai }}
                      <vs-button
                        v-show="isEdit2"
                        class="ml-2"
                        icon-pack="feather"
                        icon="icon-eye"
                        size="small"
                        @click="
                          getInd(recordPas.detailSkor3p[1].id_3p, y.kpi_id)
                        "
                      ></vs-button>
                      <!-- <vs-button
                      v-show="isEdit2"
                      class="ml-2"
                      icon="remove_circle"
                      size="small"
                      color="red"
                      @click="hapusElement(y.dimensi_id, y.kpi_id)"
                    ></vs-button> -->
                    </div>

                    <div class="col-sm-3">{{ y.max_nilai }}</div>
                  </div>
                </vx-card>
              </div>
            </vx-card>
            <vx-card
              v-if="item.id_3p == 3"
              :title="item.name3p"
              style="margin-bottom: 10px"
            >
              <br />
              <div>
                <vx-card title="Finance">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Finance',
                      recordPas.detailSkor3p[2].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >
                  tambah Kpi
                  </vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    v-for="(y, index) in recordPas.detailSkor3p[2].detail
                      .Finance"
                    :key="index"
                  >
                    <div v-if="y.isDelete !== 1" class="row mb-2">
                      <div class="col-sm-5">
                        {{ y.nameKpi }}
                      </div>
                      <div
                        class="col-sm-4"
                        style="display: flex; align-items: center"
                      >
                        {{ y.nilai }}
                        <vs-button
                          v-show="isEdit2"
                          class="ml-2"
                          icon-pack="feather"
                          icon="icon-eye"
                          size="small"
                          @click="
                            getInd(recordPas.detailSkor3p[2].id_3p, y.kpi_id)
                          "
                        ></vs-button>
                        <!-- <vs-button
                      v-show="isEdit2"
                      class="ml-2"
                      icon="remove_circle"
                      size="small"
                      color="red"
                      @click="hapusElement(y.dimensi_id, y.kpi_id)"
                    ></vs-button> -->
                      </div>

                      <div class="col-sm-3">{{ y.max_nilai }}</div>
                    </div>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Daya saing">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Daya saing',
                      recordPas.detailSkor3p[2].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    v-for="(y, index) in recordPas.detailSkor3p[2].detail[
                      'Daya saing'
                    ]"
                    :key="index"
                  >
                    <div v-if="y.isDelete !== 1" class="row mb-2">
                      <div class="col-sm-5">
                        {{ y.nameKpi }}
                      </div>
                      <div
                        class="col-sm-4"
                        style="display: flex; align-items: center"
                      >
                        {{ y.nilai }}
                        <vs-button
                          v-show="isEdit2"
                          class="ml-2"
                          icon-pack="feather"
                          icon="icon-eye"
                          size="small"
                          @click="
                            getInd(recordPas.detailSkor3p[2].id_3p, y.kpi_id)
                          "
                        ></vs-button>

                        <!-- <vs-button
                      v-show="isEdit2"
                      class="ml-2"
                      icon="remove_circle"
                      size="small"
                      color="red"
                      @click="hapusElement(y.dimensi_id, y.kpi_id)"
                    ></vs-button> -->
                      </div>

                      <div class="col-sm-3">{{ y.max_nilai }}</div>
                    </div>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Kepuasan Konsumen">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Kepuasan Konsumen',
                      recordPas.detailSkor3p[2].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    v-for="(y, index) in recordPas.detailSkor3p[2].detail[
                      'Kepuasan Konsumen'
                    ]"
                    :key="index"
                  >
                    <div v-if="y.isDelete !== 1" class="row mb-2">
                      <div class="col-sm-5">
                        {{ y.nameKpi }}
                      </div>
                      <div
                        class="col-sm-4"
                        style="display: flex; align-items: center"
                      >
                        {{ y.nilai }}
                        <vs-button
                          v-show="isEdit2"
                          class="ml-2"
                          icon-pack="feather"
                          icon="icon-eye"
                          size="small"
                          @click="
                            getInd(recordPas.detailSkor3p[2].id_3p, y.kpi_id)
                          "
                        ></vs-button>

                        <!-- <vs-button
                      v-show="isEdit2"
                      class="ml-2"
                      icon="remove_circle"
                      size="small"
                      color="red"
                      @click="hapusElement(y.dimensi_id, y.kpi_id)"
                    ></vs-button> -->
                      </div>

                      <div class="col-sm-3">{{ y.max_nilai }}</div>
                    </div>
                  </div>
                </vx-card>
              </div>
              <br />
              <div>
                <vx-card title="Kapasitas Karyawan">
                  <!-- <vs-button
                  v-show="isEdit2"
                  class="mx-2 my-2"
                  icon-pack="feather"
                  icon="icon-eye"
                  size="small"
                  @click="
                    getMoreKpi(
                      'Kapasitas Karyawan',
                      recordPas.detailSkor3p[2].id_3p,
                      idCompany,
                      idDivisi
                    )
                  "
                  >tambah Kpi</vs-button
                > -->
                  <div>
                    <div class="row mb-2" style="border: 3px solid black">
                      <div class="col-sm-5">KPI</div>
                      <div class="col-sm-4">Nilai</div>
                      <div class="col-sm-3">Nilai Max</div>
                    </div>
                  </div>
                  <div
                    v-for="(y, index) in recordPas.detailSkor3p[2].detail[
                      'Kapasitas Karyawan'
                    ]"
                    :key="index"
                  >
                    <div v-if="y.isDelete !== 1" class="row mb-2">
                      <div class="col-sm-5">
                        {{ y.nameKpi }}
                      </div>
                      <div
                        class="col-sm-4"
                        style="display: flex; align-items: center"
                      >
                        {{ y.nilai }}
                        <vs-button
                          v-show="isEdit2"
                          class="ml-2"
                          icon-pack="feather"
                          icon="icon-eye"
                          size="small"
                          @click="
                            getInd(recordPas.detailSkor3p[2].id_3p, y.kpi_id)
                          "
                        ></vs-button>
                        <!-- <vs-button
                      v-show="isEdit2"
                      class="ml-2"
                      icon="remove_circle"
                      size="small"
                      color="red"
                      @click="hapusElement(y.dimensi_id, y.kpi_id)"
                    ></vs-button> -->
                      </div>

                      <div class="col-sm-3">{{ y.max_nilai }}</div>
                    </div>
                  </div>
                </vx-card>
              </div>
            </vx-card>
          </div>
        </div>

        <vx-card
          title="Data"
          v-if="
            recordPas &&
            recordPas.detailSkor3p &&
            recordPas.detailSkor3p.length > 0
          "
        >
          <table v-if="recordPas && recordPas.detailSkor3p">
            <tr>
              <td style="width: 90%; font-weight: bold">Skor People</td>
              <td style="width: 5%; font-weight: bold">:</td>
              <td
                style="font-weight: bold"
                v-if="recordPas.detailSkor3p.length > 0"
              >
                {{ hitungUlangPeople }}
              </td>
            </tr>
            <tr>
              <td style="width: 90%; font-weight: bold">Skor Process</td>
              <td style="width: 5%; font-weight: bold">:</td>
              <td
                style="font-weight: bold"
                v-if="recordPas.detailSkor3p.length > 0"
              >
                {{ hitungUlangProcess }}
              </td>
            </tr>

            <tr>
              <td style="width: 90%; font-weight: bold">Skor Performance</td>
              <td style="width: 5%; font-weight: bold">:</td>
              <td
                style="font-weight: bold"
                v-if="recordPas.detailSkor3p.length > 0"
              >
                {{ hitungUlangPerformance }}
              </td>
            </tr>
            <tr>
              <td style="width: 90%; font-weight: bold">Skor PAS</td>
              <td style="width: 5%; font-weight: bold">:</td>
              <td
                style="font-weight: bold"
                v-if="recordPas.detailSkor3p.length > 0"
              >
                {{ hitungUlangPas }}
              </td>
            </tr>
          </table>
        </vx-card>
        <vx-card v-else>
          <center>Data Kosong</center>
        </vx-card>
        <center>
          <div
            class="row"
            v-if="
              recordPas &&
              recordPas.detailSkor3p &&
              recordPas.detailSkor3p.length > 0
            "
          >
            <div class="col">
              <vs-button
                class="mx-2 my-2"
                icon-pack="feather"
                icon="icon-eye"
                @click="update"
              >
                Update Data
              </vs-button>
            </div>
            <div class="col">
              <vs-button
                class="mx-2 my-2"
                icon-pack="feather"
                icon="icon-trash"
                color="danger"
                @click="activePrompt = true"
              >
                Delete Data
              </vs-button>
              <vs-prompt
                title="Perhatian"
                color="danger"
                accept-text="hapus"
                cancel-text="tutup"
                @accept="acceptHapus"
                @close="activePrompt = false"
                :active.sync="activePrompt"
              >
                <div class="con-exemple-prompt">
                  Data yang dihapus tidak dapat dipulihkan. <br />Apakah Anda
                  ingin menghapus <b>Semua Data</b> ?
                </div>
              </vs-prompt>
            </div>
          </div>
        </center>
      </vx-card>

      <vs-popup title="Pilih Indikator" :active.sync="isInd">
        <vs-card>
          <!-- <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Nilai A:</small>
              <select
                class="ml-3 px-4 py-2 border rounded-lg w-80"
                v-model="tempValueA"
              >
                <option disabled selected>nilai - deskripsi</option>
                <option
                  v-for="item in nilaiA"
                  :key="item.id"
                  :value="item.nilai"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Nilai B:</small>
              <select
                class="ml-3 px-4 py-2 border rounded-lg w-80"
                v-model="tempValueB"
              >
                <option disabled selected>nilai - deskripsi</option>
                <option
                  v-for="item in nilaiB"
                  :key="item.id"
                  :value="item.nilai"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Nilai C:</small>
              <select
                class="ml-3 px-4 py-2 border rounded-lg w-80"
                v-model="tempValueC"
              >
                <option
                  v-for="item in nilaiC"
                  :key="item.id"
                  :value="item.nilai"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div> -->
          <div class="mb-5 vx-row">
            <div class="w-full vx-col">
              <small>Indikator:</small>
              <select
                class="ml-3 px-4 py-2 border rounded-lg w-80"
                v-model="tempIndFinal"
              >
                <option disabled selected>nilai - deskripsi</option>
                <option
                  v-for="item in tempInd"
                  :key="item.id"
                  :value="item.nilai"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
          <hr />
          <div class="mb-5 vx-col">
            <!-- <div class="row">
              <div class="col-md-4">Nilai Asli:</div>
              <div class="col-md-4">: {{ perasli }}</div>
            </div> -->
            <div class="row">
              <!-- <div class="col-md-4">Nilai Akhir (Pembulatan):</div> -->
              <div class="col-md-4">Nilai Akhir :</div>
              <!-- <div class="col-md-4">: {{ perata }}</div> -->
              <div class="col-md-4">: {{ tempIndFinal }}</div>
            </div>
          </div>

          <div class="vx-row">
            <div class="w-full text-right vx-col">
              <vs-button color="dark" type="flat" @click="isInd = false"
                >Back</vs-button
              >
              &nbsp; &nbsp;
              <!-- <vs-button>Save</vs-button> -->
              <!-- <vs-button @click="updateNilaiById(tempid3p, tempIdKpi, perata)"> -->
              <vs-button
                @click="updateNilaiById(tempid3p, tempIdKpi, tempIndFinal)"
              >
                Save
              </vs-button>
            </div>
          </div>
        </vs-card>
      </vs-popup>

      <vs-popup title="Tambah KPI" :active.sync="isAddKpi">
        <div class="row mb-2" style="border: 3px solid black">
          <div class="col-sm-5">Name</div>
          <div class="col-sm-3">Nilai Max</div>
          <div class="col-sm-3">Aksi</div>
        </div>
        <div class="row mb-2" v-for="(x, index) in getKpi" :key="index">
          <div class="col-sm-5">{{ x.name }}</div>
          <div class="col-sm-3">{{ x.max_nilai }}</div>
          <div class="col-sm-3">
            <vs-button
              class="ml-2"
              icon="add"
              size="small"
              @click="addMoreKpi(x.dimensi_id, x.id, x.name)"
              >add</vs-button
            >
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      isPeople: false,
      isProcess: false,
      isPerformance: false,
      isEdit: true,
      isEdit2: false,
      isAddKpi: false,
      activePrompt: false,
      idCompany: this.$route.params.idCompany,
      nameCompany: '',
      idDivisi: this.$route.params.idDivisi,
      nameDivisi: '',
      idUser: this.$route.params.idUser,
      date: this.$route.params.date,
      datas3: [], //data card atas
      getKpi: [],
      recordPas: [], //yang ditampilkan ke user

      ///persentase
      perSakit: 0.5,
      perIzin: 0.5,
      perTerlambat: 0.125,
      perAlpha: 1,

      //untuk dropdown
      isInd: false,
      tempIdKpi: null,
      tempid3p: null,
      tempValueC: null,
      tempValueB: null,
      tempValueA: null,

      tempInd: [],
      tempIndFinal: null,
      nilaiC: [],
      nilaiB: [],
      nilaiA: [],
      tempDimensi: '', //untuk add kpi jika kosong
      temp3P: '' //untuk add kpi jika kosong
      // tempId3p: null,
      // nameDimensi: "",
    }
  },
  computed: {
    formattedDate: {
      get () {
        if (this.date) {
          const [year, month, day] = this.date.split('-')
          return `${month}-${year}`
        }
        return ''
      },
      set (value) {
        if (value) {
          const [year, month, day] = value.split('-')
          this.date = `${month}-${year}`
        } else {
          this.date = ''
        }
      }
    },
    perHKA () {
      const perSakit = this.perSakit
      const perIzin = this.perIzin
      const perTerlambat = this.perTerlambat
      const perAlpha = this.perAlpha

      const hka =
        Number(
          this.recordPas.detailSkor3p[0].detail.Absen.detailAbsen[0].nilai
        ) *
          perSakit +
        Number(
          this.recordPas.detailSkor3p[0].detail.Absen.detailAbsen[1].nilai
        ) *
          perIzin +
        Number(
          this.recordPas.detailSkor3p[0].detail.Absen.detailAbsen[2].nilai
        ) *
          perTerlambat +
        Number(
          this.recordPas.detailSkor3p[0].detail.Absen.detailAbsen[3].nilai
        ) *
          perAlpha
      return -1 * hka
    },
    skorabsen () {
      const perHKA = this.perHKA
      const result =
        Number(perHKA) +
        Number(
          this.recordPas.detailSkor3p[0].detail.Absen.detailAbsen[4].nilai
        )

      const resultAkhir =
        (result /
          this.recordPas.detailSkor3p[0].detail.Absen.detailAbsen[4].nilai) *
        Number(this.recordPas.detailSkor3p[0].detail.Absen.max_nilai)
      // this.recordPas.detailSkor3p[0].detail.Absen.nilai =
      //   Math.round(resultAkhir);
      this.recordPas.detailSkor3p[0].detail.Absen.nilai =
        resultAkhir.toFixed(1)
      return result.toFixed(1)
    },
    perasli () {
      const total =
        (Number(this.tempValueC) || 0) +
        (Number(this.tempValueB) || 0) +
        (Number(this.tempValueA) || 0)
      const count = 3 //ganti ini jika umlah A,B,C berubah
      const avg = total / count

      if (avg < 1) {
        return 1
      } else if (avg > 4) {
        return 4
      } else {
        return avg
      }
    },
    perata () {
      const total =
        (Number(this.tempValueC) || 0) +
        (Number(this.tempValueB) || 0) +
        (Number(this.tempValueA) || 0)
      const count = 3 //ganti ini jika umlah A,B,C berubah
      const avg = total / count

      if (avg < 1) {
        return 1
      } else if (avg > 4) {
        return 4
      } else {
        // return Math.round(avg);
        return avg.toFixed(1)
      }
    },
    hitungUlangPeople () {
      let totalNilai = 0
      let totalMaxNilai = 0
      let totalValue = 0

      // Mengakses nilai di dalam masing-masing item di dalam detail
      for (const dimensi in this.recordPas.detailSkor3p[0].detail) {
        if (Array.isArray(this.recordPas.detailSkor3p[0].detail[dimensi])) {
          this.recordPas.detailSkor3p[0].detail[dimensi].forEach((item) => {
            totalNilai += parseFloat(item.nilai)
            totalMaxNilai += item.max_nilai
          })
        } else {
          // Jika nilai berupa objek, jumlahkan nilai objek tersebut
          totalNilai += parseFloat(
            this.recordPas.detailSkor3p[0].detail[dimensi].nilai
          )
          totalMaxNilai += parseFloat(
            this.recordPas.detailSkor3p[0].detail[dimensi].max_nilai
          )
        }
      }
      totalValue = (totalNilai / totalMaxNilai) * 100
      const final_people = Math.round(
        (totalValue * this.recordPas.detailSkor3p[0].persentase) / 100
      )

      this.recordPas.detailSkor3p[0].nilai = final_people
      return final_people
    },
    hitungUlangProcess () {
      let totalNilai = 0
      let totalMaxNilai = 0
      let totalValue = 0

      for (const dimensi in this.recordPas.detailSkor3p[1].detail) {
        const items = this.recordPas.detailSkor3p[1].detail[dimensi]
        for (let i = 0; i < items.length; i++) {
          // if (items[i].isDelete !== 1) {
          totalNilai += parseFloat(items[i].nilai)
          totalMaxNilai += parseFloat(items[i].max_nilai)
          // }
        }
      }
      totalValue = (totalNilai / totalMaxNilai) * 100
      const final_process = Math.round(
        (totalValue * this.recordPas.detailSkor3p[1].persentase) / 100
      )

      this.recordPas.detailSkor3p[1].nilai = final_process

      return final_process
    },
    hitungUlangPerformance () {
      let totalNilai = 0
      let totalMaxNilai = 0
      let totalValue = 0

      for (const dimensi in this.recordPas.detailSkor3p[2].detail) {
        const items = this.recordPas.detailSkor3p[2].detail[dimensi]
        if (items.length > 0) {
          for (let i = 0; i < items.length; i++) {
            // if (items[i].isDelete !== 1) {
            totalNilai += parseFloat(items[i].nilai)
            totalMaxNilai += parseFloat(items[i].max_nilai)
            // }
          }
        }
      }

      totalValue = (totalNilai / totalMaxNilai) * 100
      const final_performance = Math.round(
        (totalValue * this.recordPas.detailSkor3p[2].persentase) / 100
      )
      this.recordPas.detailSkor3p[2].nilai = final_performance

      return final_performance
    },
    hitungUlangPas () {
      let total =
        parseInt(this.recordPas.detailSkor3p[0].nilai) +
        parseInt(this.recordPas.detailSkor3p[1].nilai) +
        parseInt(this.recordPas.detailSkor3p[2].nilai)
      total =
        total >= 69
          ? total
          : total >= 59
            ? 69
            : total >= 49
              ? 65
              : total >= 39
                ? 60
                : total >= 29
                  ? 55
                  : 50
      this.recordPas.finalSkor.nilai = total
      return total
    },

    newfinal () {
      if (this.tempIndFinal) {
        return this.tempIndFinal
      } else {
        return (this.tempIndFinal = 1)
      }
    }
  },
  methods: {
    ...mapActions({
      dispatchMaster: 'masterpas/index',
      dispatchMasterDatas: 'masterpas/index_datas',
      dispatchMasterGetKpi: 'masterpas/pas_getkpi',

      dispatchInd: 'pen_people/getInd',
      dispatchShow: 'showedit/show',
      dispatchUpdate: 'showedit/update',
      dispatchDelete: 'showedit/delete',
      dispatchPeopleInd: 'pen_people/getInd'
    }),
    updateNilai (item) {
      console.log(this.recordPas)
    },
    goBack () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm',
        text: 'Pastikan data sudah disimpan sebelum kembali. Apakah Anda yakin ingin kembali?',
        accept: this.acceptBack
      })
    },
    acceptBack () {
      this.$router.push({
        name: 'monthnilaipas',
        params: {
          idCompany: this.idCompany,
          nameCompany: this.nameCompany,
          idDivisi: this.idDivisi,
          nameDivisi: this.nameDivisi,
          idUser: this.idUser
        }
      })
    },

    async getDatas () {
      try {
        const send = new FormData()
        send.append('idCompany', this.idCompany)
        send.append('idDivisi', this.idDivisi)
        send.append('idUser', this.idUser)
        send.append('date', this.date)
        const datas3 = await this.dispatchMasterDatas(send)
        this.datas3 = datas3
        this.nameCompany = this.datas3.dataCompany.name
        this.nameDivisi = this.datas3.dataOrg.name

        const res = await this.dispatchShow(send)
        this.recordPas = res
        for (let i = 0; i < this.recordPas.detailSkor3p.length; i++) {
          const detail = this.recordPas.detailSkor3p[i].detail

          for (const dimensi in detail) {
            const kpiArray = detail[dimensi]

            for (let j = 0; j < kpiArray.length; j++) {
              const kpi = kpiArray[j]

              kpi.isDelete = 0
            }
          }
        }
      } catch (error) {
        this.$vs.notify({
          title: 'Oops!',
          text: error.data.message,
          color: 'danger'
        })
      }
    },

    async getInd (id3p, idkpi) {
      this.tempIdKpi = idkpi
      this.tempid3p = id3p
      const send = new FormData()
      send.append('id3p', id3p)
      send.append('kpi_id', idkpi)

      try {
        const Ind = await this.dispatchPeopleInd(send)
        // (this.nilaiC = Ind.nilaiC.map((item) => ({
        //   id: item.id,
        //   "3p_id": item["3p_id"],
        //   kpi_id: item.kpi_id,
        //   company_id: item.company_id,
        //   division_id: item.division_id,
        //   nilai: item.nilai,
        //   name: item.nilai + " - " + item.desc,
        //   created_at: item.created_at,
        //   updated_at: item.updated_at,
        // }))),
        //   (this.nilaiB = Ind.nilaiB.map((item) => ({
        //     id: item.id,
        //     "3p_id": item["3p_id"],
        //     kpi_id: item.kpi_id,
        //     company_id: item.company_id,
        //     division_id: item.division_id,
        //     nilai: item.nilai,
        //     name: item.nilai + " - " + item.desc,
        //     created_at: item.created_at,
        //     updated_at: item.updated_at,
        //   }))),
        //   (this.nilaiA = Ind.nilaiA.map((item) => ({
        //     id: item.id,
        //     "3p_id": item["3p_id"],
        //     kpi_id: item.kpi_id,
        //     company_id: item.company_id,
        //     division_id: item.division_id,
        //     nilai: item.nilai,
        //     name: item.nilai + " - " + item.desc,
        //     created_at: item.created_at,
        //     updated_at: item.updated_at,
        //   }))),
        this.tempInd = Ind.nilai.map((item) => ({
          'id': item.id,
          '3p_id': item['3p_id'],
          'kpi_id': item.kpi_id,
          'company_id': item.company_id,
          'division_id': item.division_id,
          'nilai': item.nilai,
          'name': `${item.nilai  } - ${  item.desc}`,
          'created_at': item.created_at,
          'updated_at': item.updated_at
        }))
        this.isInd = true
        this.tempIndFinal = null
      } catch (error) {
        console.log(error)
      }
    },

    updateNilaiById (id_3p, kpi_id, newValue) {
      for (let i = 0; i < this.recordPas.detailSkor3p.length; i++) {
        const detailSkor = this.recordPas.detailSkor3p[i]

        // Periksa jika id_3p cocok
        if (detailSkor.id_3p === id_3p) {
          const detail = detailSkor.detail

          // Periksa setiap dimensi dalam detail
          for (const dimensi in detail) {
            const kpiArray = detail[dimensi]

            // Iterasi melalui array kpiArray di setiap dimensi
            for (let j = 0; j < kpiArray.length; j++) {
              const kpi = kpiArray[j]

              // Periksa jika kpi_id cocok
              if (kpi.kpi_id === kpi_id) {
                // // Update nilai dengan nilai baru
                kpi.nilai = newValue
                this.tempIdKpi = null
                this.tempid3p = null
                this.tempValueA = null
                this.tempValueB = null
                this.tempValueC = null
                this.isInd = !this.isInd
                // console.log(this.recordPas);
                return // Keluar dari fungsi setelah update nilai
              }
            }
          }
        }
      }
      // // Jika tidak ditemukan data dengan id_3p dan kpi_id yang sesuai
      console.log('Data tidak ditemukan')
    },

    async getMoreKpi (nameDimensi, id3p, idCompany, idDivisi) {
      // console.log(nameDimensi);
      // console.log(id3p);
      // console.log(idCompany);
      // console.log(idDivisi);
      try {
        this.tempDimensi = nameDimensi
        this.temp3P = id3p
        const send = new FormData()
        send.append('nameDimensi', nameDimensi)
        send.append('id3p', id3p)
        send.append('idCompany', idCompany)
        send.append('idDivisi', idDivisi)
        const response = await this.dispatchMasterGetKpi(send)
        this.getKpi = response.datas
        this.isAddKpi = true
        // console.log(this.getKpi);
      } catch (error) {
        console.log(error)
      }
    },
    //tambah elemen kpi sementara belum digunakan
    addMoreKpi (idDimensi, idKpi, nameKpi) {
      const newData = {
        id: null,
        user_id: this.idUser,
        dimensi_id: idDimensi,
        kpi_id: idKpi,
        date: this.date,
        nilai: null,
        max_nilai: 4,
        created_at: null,
        updated_at: null,
        nameKpi
      }
      for (let i = 0; i < this.recordPas.detailSkor3p.length; i++) {
        const detailSkor = this.recordPas.detailSkor3p[i]

        // Periksa jika id_3p cocok
        if (detailSkor.id_3p === this.temp3P) {
          const detail = detailSkor.detail

          const existingData = detail[this.tempDimensi].find(
            (data) => data.dimensi_id === idDimensi && data.kpi_id === idKpi
          )

          if (!existingData) {
            if (detail.hasOwnProperty(this.tempDimensi)) {
              detail[this.tempDimensi].push(newData)
            } else {
              detail[this.tempDimensi] = [newData]
            }
          } else {
            // let cekIsDelete = detail[this.tempDimensi].find(
            //   (data) =>
            //     data.dimensi_id === idDimensi &&
            //     data.kpi_id === idKpi &&
            //     data.isDelete === 1
            // );
            // if (cekIsDelete) {
            //   for (let i = 0; i < this.recordPas.detailSkor3p.length; i++) {
            //     const detail = this.recordPas.detailSkor3p[i].detail;

            //     for (const dimensi in detail) {
            //       const kpiArray = detail[dimensi];

            //       for (let j = 0; j < kpiArray.length; j++) {
            //         const kpi = kpiArray[j];

            //         if (kpi.dimensi_id === idDimensi && kpi.kpi_id === idKpi) {
            //           const updatedKpi = { ...kpi, nilai: 1, isDelete: 0 };
            //           kpiArray.splice(j, 1, updatedKpi);

            //           // console.log(this.recordPas);
            //         }
            //       }
            //     }
            //   }
            // } else {
            this.$vs.notify({
              color: 'danger',
              title: 'WARNING',
              text: 'DATA GANDA'
            })
            // }
          }
        }
      }
      this.isAddKpi = false
    },

    async update () {
      try {
        const response = await this.dispatchUpdate(this.recordPas)
        if (response.statusCode === 200) {
          this.isEdit = false
          this.isEdit2 = false
          this.$vs.notify({
            title: 'Success',
            text: response.message,
            color: 'primary'
          })
        }
      } catch (error) {
        console.log(error)
        this.$vs.notify({
          title: 'Oops!',
          text: error.data.message,
          color: 'danger'
        })
      }
    },

    hapus () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm',
        // text: "sasas",
        content: '<b>sasas</b>',
        accept: this.acceptHapus
      })
      // text: 'Data yang dihapus tidak dapat dipulihkan. Apakah Anda ingin menghapus Semua Data?',
    },
    async acceptHapus () {
      try {
        const response = await this.dispatchDelete(this.recordPas)
        if (response.statusCode === 200) {
          this.$vs.notify({
            title: 'Success',
            text: response.message,
            color: 'primary'
          })
          setTimeout(() => {
            this.$router.push({
              name: 'monthnilaipas',
              params: {
                idCompany: this.idCompany,
                nameCompany: this.nameCompany,
                idDivisi: this.idDivisi,
                nameDivisi: this.nameDivisi,
                idUser: this.idUser
              }
            })
          }, 500)
        } else {
          this.$vs.notify({
            title: 'Oops!',
            text: response.message,
            color: 'danger'
          })
        }
      } catch (error) {
        console.log(error)
        this.$vs.notify({
          title: 'Oops!',
          text: error.data.message,
          color: 'danger'
        })
      }
    },
    //hapusElement sementara belum digunakan
    hapusElement (dimensiId, kpiId) {
      for (let i = 0; i < this.recordPas.detailSkor3p.length; i++) {
        const detail = this.recordPas.detailSkor3p[i].detail

        for (const dimensi in detail) {
          const kpiArray = detail[dimensi]

          for (let j = 0; j < kpiArray.length; j++) {
            const kpi = kpiArray[j]

            if (kpi.dimensi_id === dimensiId && kpi.kpi_id === kpiId) {
              // kpiArray.splice(j, 1);
              // break;
              // kpi.isDelete = 1;
              const updatedKpi = { ...kpi, isDelete: 1 }
              kpiArray.splice(j, 1, updatedKpi)
            }
          }
        }
      }
    },

    cekLOG () {
      console.log(this.recordPas)
    }
  },
  mounted () {
    this.$vs.loading({
      type: 'radius',
      color: 'blue',
      textAfter: true,
      text: 'Please Wait ...'
    })
    this.getDatas()
      .then(() => {
        this.$vs.loading.close()
      })
      .catch(() => {
        this.$vs.loading.close()
      })
  }
}
</script>
<style>
.highlighted-date {
  background-color: #ff8080;
  color: #ffffff;
}
</style>

<!--   
  {
    "detailUser": {
        "id": 728,
        "nik": "001220353",
        "username": "MHDIT001220353",
        "name": "Yoga Bayu Anggana Pratama",
        "company_id": 18,
        "organization_id": 177,
        "golongan_id": 8,
        "email_verified_at": null,
        "password": "$2y$10$1pvBqwqlwWgFnZnfuMDgjuGOrDTRqmbyGg/gjhS7Eya2PfFlhpMAy",
        "created_at": null,
        "updated_at": "2023-03-21T03:50:33.000000Z",
        "image": "user_6399313447434.jpeg",
        "file": "files/olgwcLPyYL.png",
        "token": null,
        "role": 2,
        "isBasic": "1",
        "isClass": "null",
        "isCamp": "null",
        "isAcademy": "null",
        "status": 1,
        "resign_date": null,
        "phone": null,
        "kota": null,
        "email": null,
        "ui_avatar": "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=Yoga Bayu Anggana Pratama"
    },
    "finalSkor": {
        "id": 1,
        "user_id": 728,
        "date": "2023-05-29",
        "nilai": 55,
        "created_at": null,
        "updated_at": null
    },
    "detailSkor3p": [
        {
            "id": 23,
            "user_id": 728,
            "id_3p": 1,
            "date": "2023-05-29",
            "nilai": 7,
            "created_at": null,
            "updated_at": null,
            "name3p": "People",
            "persentase": 20,
            "detail": {
                "Absen": {
                    "id": 1,
                    "user_id": 728,
                    "dimensi_id": 1,
                    "date": "2023-05-29",
                    "nilai": "2.9",
                    "max_nilai": 4,
                    "created_at": null,
                    "updated_at": null,
                    "nameDimensi": "Absen",
                    "detailAbsen": [
                        {
                            "id": 1,
                            "penilaianAbsen_id": 1,
                            "kpi_id": 10,
                            "nilai": 1,
                            "created_at": null,
                            "updated_at": null,
                            "nameKPI": "Sakit"
                        },
                        {
                            "id": 2,
                            "penilaianAbsen_id": 1,
                            "kpi_id": 11,
                            "nilai": 2,
                            "created_at": null,
                            "updated_at": null,
                            "nameKPI": "Izin"
                        },
                        {
                            "id": 3,
                            "penilaianAbsen_id": 1,
                            "kpi_id": 12,
                            "nilai": 3,
                            "created_at": null,
                            "updated_at": null,
                            "nameKPI": "Terlambat"
                        },
                        {
                            "id": 4,
                            "penilaianAbsen_id": 1,
                            "kpi_id": 13,
                            "nilai": 4,
                            "created_at": null,
                            "updated_at": null,
                            "nameKPI": "Alpha"
                        },
                        {
                            "id": 5,
                            "penilaianAbsen_id": 1,
                            "kpi_id": 14,
                            "nilai": 22,
                            "created_at": null,
                            "updated_at": null,
                            "nameKPI": "HKA"
                        }
                    ]
                },
                "Unity": [
                    {
                        "id": 1,
                        "user_id": 728,
                        "dimensi_id": 2,
                        "kpi_id": 8,
                        "date": "2023-05-29",
                        "nilai": 2.7,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Kasih"
                    }
                ],
                "Visi": [
                    {
                        "id": 2,
                        "user_id": 728,
                        "dimensi_id": 3,
                        "kpi_id": 25,
                        "date": "2023-05-29",
                        "nilai": 2,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Komitmen dengan tujuan"
                    }
                ],
                "Hati": [
                    {
                        "id": 3,
                        "user_id": 728,
                        "dimensi_id": 4,
                        "kpi_id": 15,
                        "date": "2023-05-29",
                        "nilai": 1.3,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Kejujuran"
                    },
                    {
                        "id": 4,
                        "user_id": 728,
                        "dimensi_id": 4,
                        "kpi_id": 16,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Responsif"
                    },
                    {
                        "id": 5,
                        "user_id": 728,
                        "dimensi_id": 4,
                        "kpi_id": 17,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Rendah Hati"
                    },
                    {
                        "id": 6,
                        "user_id": 728,
                        "dimensi_id": 4,
                        "kpi_id": 18,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Bertanggung Jawab"
                    },
                    {
                        "id": 7,
                        "user_id": 728,
                        "dimensi_id": 4,
                        "kpi_id": 19,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Kepatuhan Kepada Perusahaan"
                    }
                ],
                "Semangat": [
                    {
                        "id": 8,
                        "user_id": 728,
                        "dimensi_id": 5,
                        "kpi_id": 20,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Disiplin"
                    },
                    {
                        "id": 9,
                        "user_id": 728,
                        "dimensi_id": 5,
                        "kpi_id": 21,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Inovatif"
                    },
                    {
                        "id": 10,
                        "user_id": 728,
                        "dimensi_id": 5,
                        "kpi_id": 22,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Ketahanan"
                    },
                    {
                        "id": 11,
                        "user_id": 728,
                        "dimensi_id": 5,
                        "kpi_id": 23,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Mindset Berkembang"
                    },
                    {
                        "id": 12,
                        "user_id": 728,
                        "dimensi_id": 5,
                        "kpi_id": 24,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Berani Mengambil Keputusan"
                    }
                ]
            }
        },
        {
            "id": 24,
            "user_id": 728,
            "id_3p": 2,
            "date": "2023-05-29",
            "nilai": 10,
            "created_at": null,
            "updated_at": null,
            "name3p": "Process",
            "persentase": 30,
            "detail": {
                "Routine": [
                    {
                        "id": 13,
                        "user_id": 728,
                        "dimensi_id": 6,
                        "kpi_id": 34,
                        "date": "2023-05-29",
                        "nilai": 2.3,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "ini KPI"
                    },
                    {
                        "id": 14,
                        "user_id": 728,
                        "dimensi_id": 6,
                        "kpi_id": 42,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "monitoring"
                    },
                    {
                        "id": 15,
                        "user_id": 728,
                        "dimensi_id": 6,
                        "kpi_id": 43,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "monitoring2"
                    },
                    {
                        "id": 16,
                        "user_id": 728,
                        "dimensi_id": 6,
                        "kpi_id": 44,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "monitoring3"
                    }
                ],
                "Cross Function": [
                    {
                        "id": 17,
                        "user_id": 728,
                        "dimensi_id": 7,
                        "kpi_id": 35,
                        "date": "2023-05-29",
                        "nilai": 2.7,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "test"
                    },
                    {
                        "id": 18,
                        "user_id": 728,
                        "dimensi_id": 7,
                        "kpi_id": 45,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "tester2"
                    },
                    {
                        "id": 19,
                        "user_id": 728,
                        "dimensi_id": 7,
                        "kpi_id": 46,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "tester3"
                    }
                ],
                "Interaction": [
                    {
                        "id": 20,
                        "user_id": 728,
                        "dimensi_id": 8,
                        "kpi_id": 41,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "Interaction KPI 1"
                    },
                    {
                        "id": 21,
                        "user_id": 728,
                        "dimensi_id": 8,
                        "kpi_id": 47,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "kpi1"
                    },
                    {
                        "id": 22,
                        "user_id": 728,
                        "dimensi_id": 8,
                        "kpi_id": 48,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "kpi2"
                    }
                ]
            }
        },
        {
            "id": 25,
            "user_id": 728,
            "id_3p": 3,
            "date": "2023-05-29",
            "nilai": 13,
            "created_at": null,
            "updated_at": null,
            "name3p": "Performance",
            "persentase": 50,
            "detail": {
                "Finance": [],
                "Daya saing": [
                    {
                        "id": 23,
                        "user_id": 728,
                        "dimensi_id": 10,
                        "kpi_id": 49,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "kpi1"
                    },
                    {
                        "id": 24,
                        "user_id": 728,
                        "dimensi_id": 10,
                        "kpi_id": 50,
                        "date": "2023-05-29",
                        "nilai": 1.3,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "kpi2"
                    }
                ],
                "Kepuasan Konsumen": [
                    {
                        "id": 25,
                        "user_id": 728,
                        "dimensi_id": 11,
                        "kpi_id": 53,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "uji kosongan"
                    }
                ],
                "Kapasitas Karyawan": [
                    {
                        "id": 26,
                        "user_id": 728,
                        "dimensi_id": 12,
                        "kpi_id": 52,
                        "date": "2023-05-29",
                        "nilai": 1,
                        "max_nilai": 4,
                        "created_at": null,
                        "updated_at": null,
                        "nameKpi": "kpiKK"
                    }
                ]
            }
        }
    ],
    "statusCode": 200
} -->
