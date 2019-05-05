<template>
  <div class="page-wrapper">
    <p v-if="data && data.length == 0" class="infos-label">
      There is no information on this Club's queue in the last hour...
    </p>
    <div v-if="data && data.length > 0" class="comment-list">
      <div class="comment-header-group">
        <div class="comment-header">⏳</div>
        <div class="comment-header">👥</div>
        <div class="comment-header">💬</div>
        <div class="comment-header-buttons"></div>
      </div>
      <div class="comment-body">
        <comment-item
          v-for="comment in data"
          :key="comment.id"
          :data="comment"
        ></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import { mapActions } from 'vuex'

export default {
  components: { CommentItem },
  props: {
    data: Array,
    clubId: String
  },
  created() {
    this.listenToChanges(this.clubId)
  },
  methods: {
    ...mapActions('clubs', ['listenToChanges'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  .infos-label {
    text-align: center;
  }

  .club-item {
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .comment-list {
    margin: 20px 0;
    display: table;
    width: 100%;

    .comment-header-group {
      display: table-header-group;
      font-weight: bold;
      margin: 0 0 0 10px;
    }

    .comment-header {
      display: table-cell;
      text-align: justify;
    }

    .comment-header-buttons {
      display: table-cell;
      text-align: justify;
      width: 50px;
    }

    .comment-body {
      display: table-row-group;
    }
  }
}
</style>
