<template>
  <div class="page-wrapper">
    <p v-if="data && data.length == 0" class="infos-label">
      There is no information on this Club's queue in the last 6 hours...
    </p>
    <div v-if="data && data.length > 0" class="comment-list">
      <comment-item
        v-for="comment in data"
        :key="comment.id"
        :data="comment"
      ></comment-item>
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
    width: 100%;
  }
}
</style>
