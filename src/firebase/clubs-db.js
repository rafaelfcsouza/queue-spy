import GenericDB from './generic-db'
import firestore from './async-firestore'

export default class ClubsDB extends GenericDB {
  constructor() {
    super(`clubs`)
  }

  /**
   * Search Clubs by Name
   * @param name
   */
  async findByName(name) {
    const collectionRef = (await firestore()).collection(this.collectionPath)
    let query = collectionRef

    name = name.toLowerCase()

    query = query
      .orderBy('search_name')
      .startAt(name)
      .endAt(name + '\uf8ff')

    const formatResult = result =>
      result.docs.map(ref =>
        this.convertObjectTimestampPropertiesToDate({
          id: ref.id,
          ...ref.data()
        })
      )

    return query.get().then(formatResult)
  }
}

export class ClubCommentsDB extends GenericDB {
  constructor(clubId) {
    super(`clubs/${clubId}/comments`)
  }

  /**
   * Read all documents in the collection following constraints
   */
  async readLastHour() {
    const collectionRef = (await firestore()).collection(this.collectionPath)
    let query = collectionRef
    const date = new Date()
    date.setHours(date.getHours() - 1)

    query = query
      .where('createTimestamp', '>', date)
      .orderBy('createTimestamp', 'desc')

    const formatResult = result =>
      result.docs.map(ref =>
        this.convertObjectTimestampPropertiesToDate({
          id: ref.id,
          ...ref.data()
        })
      )

    return query.get().then(formatResult)
  }

  async listenToChanges(callback) {
    const date = new Date()
    date.setHours(date.getHours() - 1)

    const collectionRef = (await firestore()).collection(this.collectionPath)

    return collectionRef
      .where('createTimestamp', '>', date)
      .orderBy('createTimestamp', 'desc')
      .onSnapshot(callback)
  }
}
