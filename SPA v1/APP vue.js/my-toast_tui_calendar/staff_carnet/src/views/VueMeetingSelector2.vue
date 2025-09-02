<template>
  <div id="app">
    <vue-meeting-selector
      class="simple-example__meeting-selector"
      v-model="meeting"
      :date="date"
      :loading="loading"
      :class-names="classNames"
      :meetings-days="meetingsDays"
      @next-date="nextDate"
      @previous-date="previousDate"
    />
    <p>meeting Selected: {{ meeting ? meeting : "No Meeting selected" }}</p>
  </div>
</template>

<script>
import VueMeetingSelector from "vue-meeting-selector";
import data from "./data.json";

export default {
  name: "App",
  components: {
    VueMeetingSelector,
  },
  data() {
    return {
      date: new Date(),
      meetingsDays: [],
      meeting: { date: "2021-01-15T08:00:00.000Z" },
      loading: true,
      nbDaysToDisplay: 5,
    };
  },
  methods: {
    // @click on button-right
    async nextDate() {
      console.log("nextDate");
    },
    // @click on button-left
    async previousDate() {
      console.log("previousDate");
    },
  },
  async created() {
    this.meetingsDays = data;
    this.loading = false;
  },
};
</script>

<style>
</style>