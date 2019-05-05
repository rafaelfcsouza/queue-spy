<template>
  <div class="club-list">
    <p v-if="clubs === null" class="infos-label">Loading...</p>
    <p v-for="club in clubs" :key="club.id" class="club-row">
      <router-link :to="{ name: 'club', params: { club: club, id: club.id } }">
        {{ club.name }}
      </router-link>
    </p>
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

.club-list {
  width: 100%;

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
</style>
