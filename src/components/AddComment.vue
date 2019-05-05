<template>
  <div class="add-comment">
    <p
      v-if="dialogVisibility === null"
      class="create-btn"
      @click="triggerVisibility(data.id)"
    >
      Add information!
    </p>

    <p v-if="dialogVisibility === 'creating'" class="input-label">
      Adding your information to {{ data.name }} queue!
    </p>

    <div v-if="dialogVisibility === data.id" class="comment-action-bar">
      <label class="input-label"
        >How many people you think there are on the queue?</label
      >
      <input
        placeholder="Can be aproximate size ;)"
        class="value-input"
        type="number"
        min="0"
        max="9999"
        required
        @input="setQueueSize($event.target.value, data)"
      />
      <label class="input-label"
        >Do you want to share any comments on the queue?</label
      >
      <input
        placeholder="It's past the späti! Or send a message to your loved one s2"
        class="value-input"
        type="text"
        @input="setCommentFromUser($event.target.value, data)"
      />
      <div
        :class="{ disabled: dialogVisibility === 'creating' }"
        class="create-btn"
        @click="triggerAddCommentAction(data.id)"
      >
        Send
      </div>

      <span
        v-if="dialogVisibility !== null"
        class="btn"
        @click="triggerVisibility(null)"
        >Close</span
      >
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  props: {
    data: Object
  },
  computed: mapState('clubs', ['dialogVisibility']),
  methods: {
    ...mapMutations('clubs', ['setQueueSize', 'setCommentFromUser']),
    ...mapActions('clubs', ['triggerAddCommentAction', 'triggerVisibility'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.add-comment {
  text-align: center;
  .btn {
    display: block;
    cursor: pointer;
    text-align: center;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    background-color: #f0f0f0;
  }

  .comment-action-bar {
    display: grid;
    background-color: rgb(248, 248, 248);
    align-items: center;
    justify-content: center;
    padding: 0.7rem;

    .input-label {
      font-size: larger;
      font-weight: bold;
      margin-top: 0.5rem;
    }

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
