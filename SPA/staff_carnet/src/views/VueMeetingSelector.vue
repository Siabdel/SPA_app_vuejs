<template>
  <vue-meeting-selector
    v-model="meeting"
    :date="date"
    :loading="loading"
    :meetings-days="meetingsDays"
    @next-date="nextDate"
    @previous-date="previousDate" />
</template>

<script>
//import VueMeetingSelector from 'vueMeetingSelector';

import VueMeetingSelector from 'vue-meeting-selector';

export default {
  components: {
    VueMeetingSelector,
  },
  data() {
    return {
      date: new Date('2020-01-01:01:00'),
      meeting: null,
      loading: false,
      meetingsDays: [],
    };
  },
  methods: {
    getMeetings(date) {
      // methods who return the meetings
      return date
    },
    async nextDate() {
      this.loading = true;
      const date = new Date(this.date);
      date.setDate(date.getDate() + 7);
      this.meetingsDays = await this.getMeetings(date);
      this.date = date;
      this.loading = false;
    },
    async previousDate() {
      this.loading = true;
      const date = new Date(this.date);
      date.setDate(date.getDate() - 7);
      this.meetingsDays = await this.getMeetings(date);
      this.date = date;
      this.loading = false;
    },
  },
  async created() {
    this.loading = true;
    this.meetingsDays = await this.getMeetings(this.date);
    this.loading = false;
  },
};
</script>