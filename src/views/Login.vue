<template>
  <div class="page-wrapper">
    <h1 class="login-page-title">How would you like to login?</h1>

    <!-- Loader -->
    <div v-show="user === undefined" data-test="loader">Authenticating...</div>

    <!-- Offline instruction -->
    <div v-show="!networkOnLine" data-test="offline-instruction">
      Please check your connection, login feature is not available offline.
    </div>

    <p v-if="loginError">{{ loginError }}</p>
    <!-- Auth UI -->
    <div
      v-show="user !== undefined && !user && networkOnLine"
      data-test="login-btn"
      class="login-btn"
      @click="login('google')"
    >
      <span>Login with Google</span>
      <img alt="logo-google" class="logo" src="@/assets/img/google.svg" />
    </div>

    <div
      v-show="user !== undefined && !user && networkOnLine"
      data-test="login-btn"
      class="login-btn"
      @click="login('twitter')"
    >
      <span>Login with Twitter</span>
      <img alt="logo-twitter" class="logo" src="@/assets/img/twitter.svg" />
    </div>

    <div
      v-show="user !== undefined && !user && networkOnLine"
      data-test="login-btn"
      class="login-btn"
      @click="login('facebook')"
    >
      <span>Login with Facebook</span>
      <img alt="logo-facebook" class="logo" src="@/assets/img/facebook.svg" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'
import { desktop as isDesktop } from 'is_js'

export default {
  data: () => ({ loginError: null }),
  head: {
    title: {
      inner: 'Login'
    },
    meta: [
      {
        name: 'description',
        content: 'Sign in or sign up to QueueSpy',
        id: 'desc'
      }
    ]
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine'])
  },
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/products'
            : this.$route.query.redirectUrl
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    async login(method) {
      this.loginError = null
      this.setUser(undefined)
      let provider
      if (method === 'google') {
        provider = new firebase.auth.GoogleAuthProvider()
      }
      if (method === 'twitter') {
        provider = new firebase.auth.TwitterAuthProvider()
      }
      if (method === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider()
      }
      try {
        // Firebase signin with popup is faster than redirect
        // but we can't use it on mobile because it's not well supported
        // when app is running as standalone on ios & android
        isDesktop()
          ? await firebase.auth().signInWithPopup(provider)
          : await firebase.auth().signInWithRedirect(provider)
      } catch (err) {
        this.loginError = err
        this.setUser(null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  max-width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-page-title {
    text-align: center;
  }

  .login-btn {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #fff;
    background-color: #2c3e50;
    color: #fff;
    margin-top: 0.5rem;
    font-size: large;
    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }

  .logo {
    padding-left: 0.5rem;
    width: 20px;
  }
}
</style>
