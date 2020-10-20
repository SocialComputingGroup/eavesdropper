import { EventsListener } from "./EventsListener";

export class ListenersRegistry {
  listeners: EventsListener[]

  constructor() {
    this.listeners = new Array<EventsListener>()
  }

  addListener(listener: EventsListener) {
    this.listeners.push(listener)
  }

  getListener(listeningAddress: string) : EventsListener {
    return this.listeners.find(item => {
        if(item.contractAddress == listeningAddress) return item
      }
    )
  }

  deleteListener(listeningAddress: string) : boolean {
    const ind = this.listeners.findIndex((item) => {
      if(item.contractAddress == listeningAddress) return item
    })
    if(ind != -1) {
       delete this.listeners[ind]
       return true
    } else return false
  }
}