<template>
  <div class="page-wrapper">
    <div v-if="!isUserLoggedIn || !networkOnLine" class="info">
      <h1>QueueSpy</h1>
      <img alt="logo-queue-spy" class="logo" src="@/assets/img/spy.svg">
      <p>Collaborative tool to share the status of queues in Berlin.</p>
      <p>So, how does it work?</p>
      <ol>
        <li>Login using your favorite social login</li>
        <li>Search for the club you want</li>
        <li>Check how is the queue for that club</li>
        <li>Aditionally, you can add information yourself to help others 😜</li>
      </ol>
    </div>
    <div v-if="isUserLoggedIn && networkOnLine" class="info">
      <h2>Welcome!</h2>
    </div>
    <club-search></club-search>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import ClubSearch from '@/components/ClubSearch'

export default {
  head: {
    title: {
      inner: 'Home'
    },
    meta: [
      {
        name: 'description',
        content: 'QueueSpy home page',
        id: 'desc'
      }
    ]
  },
  components: { ClubSearch },
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('app', ['appTitle', 'networkOnLine'])
  },
  created() {
    this.setSearchInput('')
    this.setClubs([])
  },
  methods: {
    ...mapMutations('clubs', ['setSearchInput', 'setClubs']),
    ...mapActions('clubs', ['triggerClubSearch'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  max-width: 750px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .logo {
    height: 150px;
    margin-bottom: 2rem;
    height: 75px;
  }

  .home-page-title {
    text-align: center;
  }
}
</style>
