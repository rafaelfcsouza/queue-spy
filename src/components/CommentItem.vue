<template>
  <div class="comment-row">
    <div class="comment-cell cell-size">
      ~{{ data.size }}
      <span class="can-hide">people</span>
    </div>
    <div class="comment-cell cell-comment">{{ data.comment }}</div>
    <div class="comment-cell-buttons">
      <div v-if="data.author !== user.id">
        <img alt="confirm" class="button icon" src="@/assets/img/checked.svg" />
        <img alt="cancel" class="button icon" src="@/assets/img/cancel.svg" />
      </div>
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
  align-items: center;
  width: 100%;

  .comment-cell {
    display: table-cell;
    vertical-align: middle;
  }

  .cell-size {
    width: 20%;
  }

  .cell-comment {
    width: 60%;
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
