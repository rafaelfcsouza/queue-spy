<template>
  <div class="page-wrapper">
    <div v-if="!isUserLoggedIn" class="info">
      <h1>QueueSpy</h1>
      <img alt="logo-queue-spy" class="logo" src="@/assets/img/spy.svg" />
      <p>Collaborative tool to share the status of queues in Berlin.</p>
      <p>So, how does it work?</p>
      <ol>
        <li>Login using your favorite social login</li>
        <li>Search for the club you want</li>
        <li>Check how is the queue for that club</li>
        <li>Aditionally, you can add information yourself to help others 😜</li>
      </ol>
    </div>
    <div v-if="isUserLoggedIn" class="info">
      <p>How does it work?</p>
      <ol>
        <li>Search for the club you want</li>
        <li>Check how is the queue for that club</li>
        <li>Aditionally, you can add information yourself to help others 😜</li>
      </ol>
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

  .info {
    font-size: large;
    ol {
      text-align: left;
      margin: 0 0 1.5em;
      padding: 0;
      counter-reset: item;
    }
    ol > li {
      margin: 0;
      padding: 0 0 0 2em;
      text-indent: -2em;
      list-style-type: none;
      counter-increment: item;
    }

    ol > li:before {
      display: inline-block;
      width: 1em;
      padding-right: 0.5em;
      font-weight: bold;
      text-align: right;
      content: counter(item) '.';
    }
  }
}
</style>
