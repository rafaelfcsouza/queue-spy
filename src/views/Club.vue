<template>
  <div class="page-wrapper">
    <span v-if="activeClub === null">Loading...</span>
    <club-item
      v-if="activeClub != null"
      :disable-actions="!networkOnLine"
      :data="activeClub"
    ></club-item>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ClubItem from '@/components/ClubItem'

export default {
  head: {
    title: {
      inner: 'Club'
    },
    meta: [
      {
        name: 'description',
        content: 'QueueSpy home page',
        id: 'desc'
      }
    ]
  },
  components: { ClubItem },
  props: {
    club: Object,
    id: String
  },
  computed: {
    ...mapState('app', ['appTitle', 'networkOnLine']),
    ...mapState('clubs', ['activeClub'])
  },
  created() {
    if (this.club && !this.club.comments) {
      this.loadClub(this.club)
    } else {
      this.getClub(this.id)
    }
    this.setDialogVisibility(null)
  },
  methods: {
    ...mapActions('clubs', ['getClub', 'loadClub']),
    ...mapMutations('clubs', ['setDialogVisibility'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    height: 150px;
    margin-bottom: 3rem;
  }

  .home-page-title {
    text-align: center;
  }
}
</style>
