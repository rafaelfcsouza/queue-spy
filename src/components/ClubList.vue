<template>
  <div class="club-list">
    <p v-if="clubs === null" class="infos-label">Loading...</p>
    <club-item
      v-for="(club, index) in clubs"
      :key="club.id"
      class="club-row"
      :index="index"
      :disable-actions="!networkOnLine"
      :data="club"
    ></club-item>
  </div>
</template>

<script>
import ClubItem from '@/components/ClubItem'
import { mapState } from 'vuex'

export default {
  components: { ClubItem },
  computed: {
    // ...mapGetters('club', ['isProductDeletionPending']),
    ...mapState('clubs', ['clubs']),
    ...mapState('app', ['networkOnLine'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.club-row {
  display: table;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.club-list {
  width: 100%;
}
</style>
