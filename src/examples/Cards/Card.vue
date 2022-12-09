<template>
  <div class="mb-4 card div-hover">
    <div class="p-3 card-body" @click="onCLick(onclick)" :style="style">
      <div class="d-flex" :class="directionReverse ? reverseDirection : ''">
        <div>
          <div
            class="text-center icon icon-shape"
            :class="`${iconBackground} ${
              this.$store.state.isRTL ? 'border-radius-md' : 'border-radius-2xl'
            }`"
          ></div>
        </div>
        <div :class="contentClass">
          <div class="numbers" v-if="this.$store.state.isRTL">
            <p
              class="mb-0 text-sm text-uppercase font-weight-bold"
              :class="titleColor"
            >
              {{ title }}
            </p>
            <h5 class="font-weight-bolder" :class="valueColor">
              {{ value }}
              <span class="text-sm" :class="percentageColor">{{
                percentage
              }}</span>
              <span class="font-weight-light text-sm"> {{ detail }}</span>
            </h5>
          </div>
          <div class="numbers" v-else>
            <p
              class="mb-0 text-sm text-uppercase font-weight-bold"
              :class="titleColor"
            >
              {{ title }}
            </p>
            <span class="font-weight-light text-sm"> {{ detail }}</span>
            <h5 class="font-weight-bolder" :class="valueColor">{{ value }}</h5>
            <span class="text-sm" :class="percentageColor">{{
              percentage
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  data() {
    return {
      reverseDirection: "flex-row-reverse justify-content-between",
    };
  },
  methods: {
    onCLick(onclick) {
      this.$router.push({ name: onclick });
    },
  },
  props: {
    directionReverse: Boolean,
    onclick: {
      type: String,
      // required: true,
    },
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
    titleColor: {
      type: String,
    },
    value: {
      required: true,
    },
    valueColor: {
      type: String,
    },
    percentage: String,
    iconClass: {
      type: String,
    },
    percentageColor: {
      type: String,
      default: "text-success",
    },
    iconBackground: {
      type: String,
      default: "bg-white",
    },
    contentClass: {
      type: String,
    },
  },
};
</script>
<style scoped>
.div-hover:hover {
  background-color: rgb(67, 193, 231);
  color: white;
  cursor: pointer;
}
</style>
