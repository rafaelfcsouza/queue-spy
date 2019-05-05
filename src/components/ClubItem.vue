<template>
  <div class="club-item">
    <h1 class="club-header">{{ data.name }}</h1>

    <comment-list :data="data.comments" :club-id="data.id"></comment-list>
    <add-comment v-if="networkOnLine" :data="data"></add-comment>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import { mapState } from 'vuex'
import AddComment from '@/components/AddComment'

/**
 * <div
      v-if="!disableActions"
      class="delete-btn"
      @click="$emit('deleteProduct', data.id)"
    >
      {{ isProductDeletionPending ? 'delete in progress...' : 'delete' }}
    </div>
 */
export default {
  components: { CommentList, AddComment },
  props: {
    data: Object,
    index: Number,
    isProductDeletionPending: Boolean,
    disableActions: Boolean
  },
  computed: {
    ...mapState('app', ['networkOnLine'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.club-item {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.7rem;

  .club-header {
    margin-top: 0px;
    font-size: x-large;
    text-align: center;
  }
}
</style>
