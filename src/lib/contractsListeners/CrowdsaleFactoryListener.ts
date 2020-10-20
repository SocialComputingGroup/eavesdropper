import { EventsListener } from "../EventsListener"
import { CrowdsaleAdded } from "../../models/events/CrowdsaleFactory/CrowdsaleAdded"
import { TokenCrowdsaleListener } from "./TokenCrowdsaleListener"
import * as TokenCrowdsale  from '../../../build/contracts/TokenCrowdsale.json'
import CrowdsaleAddedNotification from "../../models/co3/mongodb/CrowdsaleAddedNotification"

export class CrowdsaleFactoryListener extends EventsListener {

  constructor(contractAddress: string, contract: any, web3: any) {
    super(contractAddress, contract, web3)
    this.contractType = "CrowdsaleFactory"
  }
  eventsManager(eventName: string, eventObject: any): void {
    switch (eventName) {
      case 'CrowdsaleAdded':
        const CrowdsaleAddedObj: CrowdsaleAdded = eventObject
        console.log(`New ${eventName}!`, CrowdsaleAddedObj)
        this.handleCrowdsaleAdded(CrowdsaleAddedObj).then((val) =>{
          console.log(val)
        })
        break
    }
  }

  async handleCrowdsaleAdded(CrowdsaleAddedObj: CrowdsaleAdded) {
    await CrowdsaleAddedNotification.create({
      "contractAddress": CrowdsaleAddedObj._contractAddress,
      "identifier": CrowdsaleAddedObj._id,
      "start": CrowdsaleAddedObj._start,
      "end": CrowdsaleAddedObj._end,
      "acceptRatio": CrowdsaleAddedObj._acceptRatio,
      "giveRatio": CrowdsaleAddedObj._giveRatio,
      "owner": CrowdsaleAddedObj.owner,
      "timestamp": new Date(),
      "maxCap": CrowdsaleAddedObj._maxCap
    })

    let tokenCrowdsaleContract = new this.web3.eth.Contract(TokenCrowdsale.abi, CrowdsaleAddedObj._contractAddress)

    const tcListener = new TokenCrowdsaleListener(CrowdsaleAddedObj._contractAddress, tokenCrowdsaleContract, this.web3, CrowdsaleAddedObj._id,
      new Date(CrowdsaleAddedObj._start * 1000), new Date(CrowdsaleAddedObj._end * 1000), CrowdsaleAddedObj._acceptRatio, CrowdsaleAddedObj._giveRatio, CrowdsaleAddedObj._from, CrowdsaleAddedObj._maxCap)
    tcListener.subscribeTo('ContributionFrom')
    tcListener.subscribeTo('RefundTo')
  }
}