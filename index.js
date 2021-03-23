//单链表 更新队列
class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate
  }
}
class UpdateQueue {
  constructor() {
    this.baseState = null
    this.firstUpdate = null
    this.lastUpdate = null
  }
  enqueueUpdate(updater) {
    if (this.firstUpdate === null) {
      this.firstUpdate = this.lastUpdate = updater
    } else {
      this.lastUpdate.nextUpdate = updater
      this.lastUpdate = updater
    }
  }
  //获取initstate 进行更新
  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      let nextState =
        typeof currentUpdate.payload == 'function'
          ? currentUpdate.payload(currentState)
          : currentUpdate.payload
      if (typeof currentUpdate.payload == 'function') {
        console.info(currentUpdate.payload(currentState))
      } else {
        console.info(currentUpdate.payload)
      }

      currentState = { ...currentState, ...nextState }
      console.log('currentState', currentState)
      currentUpdate = currentUpdate.nextUpdate
    }
    this.firstUpdate = this.lastUpdate = null
    this.baseState = currentState
    return currentState
  }
}

let queue = new UpdateQueue()
queue.enqueueUpdate(new Update({ a: 1 }))
queue.enqueueUpdate(new Update({ b: 1 }))
queue.enqueueUpdate(
  new Update((state) => {
    return { num: state.a + 1 }
  })
)
queue.enqueueUpdate(
  new Update((state) => {
    return { num: state.a + 1 }
  })
)
queue.forceUpdate()
