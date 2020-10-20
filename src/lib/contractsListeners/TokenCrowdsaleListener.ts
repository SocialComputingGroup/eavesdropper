import { EventsListener } from "../EventsListener"
import { ContributionFrom } from "../../models/events/TokenCrowdsale/ContributionFrom"
import ContributionFromNotification from "../../models/co3/mongodb/ContributionFromNotification"
import { RefundTo } from "../../models/events/TokenCrowdsale/RefundTo"
import RefundToNotification from "../../models/co3/mongodb/RefundToNotification"

export class TokenCrowdsaleListener extends EventsListener {

  name: string
  identifier: string
  start: Date
  end: Date
  acceptRatio: number
  giveRatio: number
  owner: string
  maxCap: number

  constructor(contractAddress: string, contract: any, web3: any, _id: string, start: Date, end: Date, acceptRatio: number, giveRatio: number, owner: string, maxCap: number) {
    super(contractAddress, contract, web3)
    this.contractType = "TokenCrowdsale"
    this.identifier = _id
    this.start = start
    this.end = end
    this.acceptRatio = acceptRatio
    this.giveRatio = giveRatio
    this.owner = owner
    this.maxCap = maxCap
  }
  eventsManager(eventName: string, eventObject: any): void {
    switch (eventName) {
      case 'ContributionFrom':
        const ContributionObj: ContributionFrom = eventObject
        console.log(`New ${eventName}!`, ContributionObj)
        this.handleContribution(ContributionObj).then((val) => {
        })
        break
      
      case 'RefundTo':
        const RefundObj: RefundTo = eventObject
        console.log(`New ${eventName}!`, RefundObj)
        this.handleRefund(RefundObj).then((val) => {
        })
        break
    }
  }

  async handleContribution(ContributionObj: ContributionFrom) {
    let contr = await ContributionFromNotification.create({
      "contractAddress": this.contractAddress,
      "identifier": this.identifier,
      "amount": ContributionObj.amount,
      "from": ContributionObj.address,
      "timestamp": new Date()
    })
  }

  async handleRefund(RefundObj: RefundTo) {
    let refund = await RefundToNotification.create({
      "contractAddress": this.contractAddress,
      "identifier": this.identifier,
      "amount": RefundObj.amount,
      "from": RefundObj.address,
      "timestamp": new Date(),
      "contractReferral": 0
    })
  }

}