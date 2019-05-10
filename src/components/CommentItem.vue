<template>
  <div class="comment-row">
    <div class="row">
      <div class="comment-cell cell-time">{{ formatedDate }}</div>
      <div class="comment-cell">
        <span>Aprox. {{ data.size }} 👥 in the line</span>
      </div>
    </div>
    <div class="row">
      <span class="comment">
        <i>"</i>
        {{ data.comment }}
        <i>"</i>
      </span>
    </div>
    <!-- <div class="comment-cell-buttons">
      <div v-if="data.author !== user.id">
        <img alt="confirm" class="button icon" src="@/assets/img/checked.svg" />
        <img alt="cancel" class="button icon" src="@/assets/img/cancel.svg" />
      </div>-
    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    data: Object,
    disableActions: Boolean
  },
  computed: {
    ...mapState('authentication', ['user'])
  },
  created() {
    this.formatDate()
  },
  methods: {
    appendLeadingZeroes(n) {
      if (n <= 9) {
        return '0' + n
      }
      return n
    },
    getDayOfWeek(day) {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
      return days[day]
    },
    formatDate() {
      let date
      let formatedDate
      try {
        date = this.data.createTimestamp.toDate()
      } catch (e) {
        //nothing to do...
      }

      if (!date) {
        date = this.data.createTimestamp
      }

      if (date) {
        formatedDate =
          this.getDayOfWeek(date.getDay()) +
          ' ' +
          this.appendLeadingZeroes(date.getHours()) +
          ':' +
          this.appendLeadingZeroes(date.getMinutes())
      } else {
        formatedDate = '🍩'
      }
      this.formatedDate = formatedDate
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
.comment-row {
  width: 100%;
  padding: 1rem;
  justify-content: space-between;
  border: 1px solid #aaaaaa;
  box-shadow: 1px 1px 0px #c2c2c2;
  font-size: large;
  text-align: center;

  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;

    .comment-cell {
      display: flex;
      flex-direction: column;
      flex-basis: 100%;
      flex: 1;
      vertical-align: middle;
    }

    .cell-time {
      color: grey;
    }

    .comment {
      text-overflow: ellipsis;
      width: 100%;
      display: block;
      white-space: nowrap;
      overflow: hidden;
      color: #aaaaaa;
      padding-top: 10px;
    }

    .comment-cell-buttons {
      display: table-cell;
      text-align: right;
      width: 80px;
      vertical-align: middle;
    }

    .button {
      cursor: pointer;
      padding: 0px 5px;
      display: inline-block;
      border-radius: 3px;
    }

    @media (max-width: 500px) {
      .can-hide {
        display: none;
      }
    }
  }
}
</style>
