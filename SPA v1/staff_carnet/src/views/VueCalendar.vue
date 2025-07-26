<template>
  <div class="container">
 
    <h2> Ici Calendar 2022</h2>

    <vue-meeting-selector
      v-model="meeting"
      :date="date"
      :loading="loading"
      :meetings-days="meetingsDays"
      @next-date="nextDate"
      @previous-date="previousDate" />
      
  </div>
</template>

<script>
import VueMeetingSelector from 'vue-meeting-selector';

export default {
  components: {
    VueMeetingSelector,
  },
  data() {
    return {
      date: new Date('2022-10-14:11:00'),
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

interface MeetingSlot {
  date: Date | string;
  [key: string]: any;
}
interface MeetingsDay {
  date: Date | string;
  slots: MeetingSlot[];
  [key: string]: any;
}
interface ClassNames {
  tabClass?: string,
  tabPaginationleft?: string,
  tabPaginationPreviousButton?: string,
  tabPaginationRight?: string,
  tabPaginationNextButton?: string,
  tabPaginationUpButton?: string,
  tabPaginationDownButton?: string,
  tabDays?: string,
  tabDayDisplay?: string,
  tabMeetings?: string,
  tabMeeting?: string,
  tabMeetingButton?: string,
  tabMeetingEmpty?: string,
  tabLoading?: string,
}
// defaults value are available in src/defaults/calendarOptions.ts
interface CalendarOptions {
  daysLabel: string[]; // Labels for days in title, start by sunday
  monthsLabel: string[]; // labels for months in title, start by january
  limit: number, // max nb meetings to display on a same column
  loadingLabel: string; // label to display when loading
  disabledDate: Function; // function to disable left button (date is passed as params)
}

<style scoped lang="scss">
.simple-example {
  margin-top: 3em;
  &__meeting-selector {
    max-width: 542px;
  }
}
// since our scss is scoped we need to use ::v-deep
::v-deep .loading-div {
  top: 58px!important;
}
</style>
