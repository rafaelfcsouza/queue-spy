<template>
  <div v-if="isUserLoggedIn && networkOnLine" class="search-pannel">
    <ol v-if="clubs !== null && clubs.length <= 0">
      <li>Search for the club you want</li>
      <li>Check how is the queue for that club</li>
      <li>Aditionally, you can add information yourself to help others 😜</li>
    </ol>
    <div class="search-form">
      <input
        placeholder="Search by typing the Club name..."
        class="value-input"
        type="text"
        maxlength="50"
        @keyup="triggerClubSearch"
        @input="setSearchInput($event.target.value)"
      >
      <div class="create-btn" @click="triggerClubSearch">🕵️‍♀️Search</div>

      <div v-if="!networkOnLine" class="search-form">
        <p class="input-label">
          There is some problem with you connection, not possible to Search for
          a club in OFFLINE mode.
        </p>
      </div>
    </div>
    <club-search-list></club-search-list>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import ClubSearchList from '@/components/ClubSearchList'

export default {
  components: { ClubSearchList },
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('clubs', ['clubs']),
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
  width: 100%;

  .btn {
    display: block;
    cursor: pointer;
    text-align: center;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    background-color: #f0f0f0;
  }

  .search-form {
    display: grid;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin-bottom: 1em;
    font-size: larger;

    .input-description {
      color: gray;
      margin-top: 0.5rem;
    }

    .value-input {
      padding-left: 5px;
      height: 35px;
      outline: none;
      font: inherit;
      border: 1px solid;
      border-color: #2c3e50;
      border-radius: 3px;
      margin-top: 0.5rem;

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
  ol {
    font-size: large;
    text-align: left;
    margin: 0 0 1em;
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
</style>
