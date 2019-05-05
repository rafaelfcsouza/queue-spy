<template>
  <div class="comment-row">
    <div class="comment-cell cell-time">{{ formatedDate }}</div>
    <div class="comment-cell cell-size">
      ~{{ data.size }}
      <span class="can-hide">people</span>
    </div>
    <div class="comment-cell cell-comment">
      <span class="comment">{{ data.comment }}</span>
    </div>
    <div class="comment-cell-buttons">
      <!-- <div v-if="data.author !== user.id">
        <img alt="confirm" class="button icon" src="@/assets/img/checked.svg" />
        <img alt="cancel" class="button icon" src="@/assets/img/cancel.svg" />
      </div>-->
    </div>
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
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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
  display: table-row;
  align-items: center;
  width: 100%;
  margin: 10px auto;
  justify-content: space-between;

  .comment-cell {
    display: table-cell;
    vertical-align: middle;
    padding-right: 10px;
    padding-top: 10px;
  }

  .cell-time {
    font-size: small;
    color: grey;
    min-width: 70px;
  }

  .cell-size {
    min-width: 30px;
  }

  .cell-comment {
    .comment {
      text-overflow: ellipsis;
      width: 10rem;
      display: block;
      white-space: nowrap;
      overflow: hidden;
    }
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
    padding: 0.7rem 0.7rem;

    .can-hide {
      display: none;
    }
  }
}
</style>
