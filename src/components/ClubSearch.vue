<template>
  <div v-if="isUserLoggedIn" class="search-pannel">
    <div v-if="networkOnLine" class="search-form">
      <input
        placeholder="Search by typing the Club name..."
        class="value-input"
        type="text"
        maxlength="50"
        @keyup="triggerClubSearch"
        @input="setSearchInput($event.target.value)"
      />
      <div class="create-btn" @click="triggerClubSearch">Search</div>

      <div v-if="!networkOnLine" class="search-form">
        <p class="input-label">
          There is some problem with you connection, not possible to Search for
          a club in OFFLINE mode.
        </p>
      </div>
      <club-search-list></club-search-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import ClubSearchList from '@/components/ClubSearchList'

export default {
  components: { ClubSearchList },
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapGetters('authentication', ['isUserLoggedIn'])
  },
  methods: {
    ...mapActions('clubs', ['triggerClubSearch']),
    ...mapMutations('clubs', ['setSearchInput'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.search-pannel {
  margin-top: 0.7rem;
  margin-bottom: 1.3rem;

  .btn {
    display: block;
    cursor: pointer;
    text-align: center;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    background-color: #f0f0f0;
  }

  .input-label {
    font-size: larger;
    font-weight: bold;
  }

  .search-form {
    display: grid;
    background-color: rgb(248, 248, 248);
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0.7rem;

    .input-description {
      color: gray;
      margin-top: 0.5rem;
    }

    .value-input {
      padding-left: 5px;
      height: 30px;
      outline: none;
      font: inherit;
      border: 1px solid;
      border-color: #2c3e50;
      border-radius: 3px;
      margin-top: 0.5rem;
      width: 30rem;

      @media (max-width: 500px) {
        width: 19rem;
      }

      @media (max-width: 320px) {
        width: 16rem;
      }
    }
  }
  .create-btn {
    display: inline-block;
    cursor: pointer;
    text-align: center;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #fff;
    background-color: #2c3e50;
    color: #fff;
    margin-top: 0.5rem;

    &.disabled {
      pointer-events: none;
      background-color: #aaa;
    }

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>
