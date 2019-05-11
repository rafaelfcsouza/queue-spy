<template>
  <div class="search-result-box">
    <div v-if="clubs.length > 0" class="club-list">
      <div v-for="club in clubs" :key="club.id" class="club-row">
        <router-link
          :to="{ name: 'club', params: { club: club, id: club.id } }"
          >{{ club.name }}</router-link
        >
      </div>
    </div>
    <p v-if="clubs === null" class="infos-label">Loading...</p>
    <div class="club-not-found">
      <span>
        If you don't see your favorite club here, just send a request to
        queuespy@gmail.com
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('clubs', ['clubs']),
    ...mapState('app', ['networkOnLine'])
  },
  methods: {
    ...mapActions('clubs', ['loadClub'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.infos-label {
  text-align: center;
}

.search-result-box {
  border: 1px solid #aaaaaa;
  box-shadow: 1px 1px 0px #c2c2c2;
  width: 100%;

  .club-list {
    padding: 0.7rem;
    text-align: left;

    .club-row {
      margin-top: 1rem;
    }

    a {
      font-weight: 500;
      font-size: 1.5rem;
      text-decoration: none;
      color: $navbar-link-color;
      border-color: #2c3e50;
      line-height: 1.4rem;
      display: inline-block;
      cursor: pointer;
    }
  }
  .club-not-found {
    margin: 0.7rem;
    color: #aaaaaa;
  }
}
</style>
