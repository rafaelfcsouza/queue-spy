import ClubsDB, { ClubCommentsDB } from '@/firebase/clubs-db'

export default {
  /**
   * Fetch club
   */
  loadClub: async ({ dispatch, commit }, club) => {
    dispatch('getClubComments', club.id)
    commit('setActiveClub', club)
  },

  /**
   * Fetch club
   */
  getClub: async ({ dispatch, commit }, clubId) => {
    const clubsDb = new ClubsDB()

    const club = await clubsDb.read(clubId)

    dispatch('getClubComments', clubId)
    commit('setActiveClub', club)
  },

  /**
   * Fetch clubs
   */
  getClubs: async ({ dispatch, commit }) => {
    const clubsDb = new ClubsDB()

    const clubs = await clubsDb.readAll()

    clubs.forEach(c => dispatch('getClubComments', c.id))

    commit('setClubs', clubs)
  },

  /**
   * Search Clubs by name
   */
  triggerClubSearch: async ({ state, commit }) => {
    const clubsDb = new ClubsDB()
    const clubs = await clubsDb.findByName(state.searchInput)

    commit('setClubs', clubs)
  },

  /**
   * Load comments from clubs
   */
  getClubComments: async ({ commit }, parentId) => {
    const clubCommentsDb = new ClubCommentsDB(parentId)
    const comments = await clubCommentsDb.readLastHour()

    commit('setActiveClubComments', comments)
  },

  /**
   * Trigger Dialog Visibility
   */
  triggerVisibility: async ({ commit }, dialogId) => {
    commit('setDialogVisibility', dialogId)
  },

  /**
   * Create a product for current loggedin user
   */
  createComment: async ({ commit }, { comment, clubId }) => {
    const clubCommentsDb = new ClubCommentsDB(clubId)

    commit('setDialogVisibility', 'creating')
    const createdComment = await clubCommentsDb.create(comment)
    commit('addComment', createdComment)
    commit('setDialogVisibility', null)
  },

  /**
   * Create a new product for current loggedin user and reset product name input
   */
  triggerAddCommentAction: ({ dispatch, state, commit, rootState }, clubId) => {
    if (state.queueSize === 0) return

    const comment = {
      size: state.queueSize,
      comment: state.commentFromUser,
      author: rootState.authentication.user.id
    }

    commit('setQueueSize', null)
    commit('setCommentFromUser', '')
    dispatch('createComment', { comment, clubId })
  },

  listenToChanges: ({ commit }, clubId) => {
    const clubsDb = new ClubCommentsDB(clubId)
    clubsDb.listenToChanges(function(querySnapshot) {
      const comments = querySnapshot.docs.map(doc => doc.data())
      commit('setActiveClubComments', comments)
    })
  }
}
