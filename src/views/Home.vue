<template>
  <div class="page-wrapper">
    <h1>QueueSpy</h1>
    <img alt="logo-queue-spy" class="logo" src="@/assets/img/spy.svg" />
    <span v-if="!isUserLoggedIn"
      >Collaborative tool to share the status of queues in Berlin.</span
    >
    <club-search></club-search>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState('authentication', ['isUserLoggedIn']),
    ...mapState('app', ['appTitle', 'networkOnLine'])
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
  text-align: center;

  .logo {
    height: 150px;
    margin-bottom: 2rem;
  }

  .home-page-title {
    text-align: center;
  }

  .logo {
    height: 75px;
  }
}
</style>
