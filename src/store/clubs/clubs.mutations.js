export default {
  /* Comments inputs */
  setQueueSize: (state, queueSize) => (state.queueSize = queueSize),
  setCommentFromUser: (state, commentFromUser) =>
    (state.commentFromUser = commentFromUser),

  /* Clubs */
  setClubs: (state, clubs) => (state.clubs = clubs),
  setActiveClubComments: (state, comments) => {
    const activeClub = state.activeClub
    state.activeClub = { ...activeClub, comments }
  },
  addComment: (state, createdComment) => {
    const activeClub = state.activeClub
    const comments = activeClub.comments
    comments.push(createdComment)
    state.activeClub = { ...activeClub, comments }
  },

  /* Dialog visibility */
  setDialogVisibility: (state, value) => (state.dialogVisibility = value),

  /* ActiveClub */
  setActiveClub: (state, activeClub) => {
    state.activeClub = activeClub
  },

  /* Search input */
  setSearchInput: (state, searchInput) => {
    state.searchInput = searchInput
  }
}
