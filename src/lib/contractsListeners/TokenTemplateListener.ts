import { EventsListener } from "../EventsListener"
import { Transfer } from '../../models/events/TokenTemplate/Transfer'
import TransferNotification from '../../models/co3/mongodb/TransferNotification'
import BalanceNotification from '../../models/co3/mongodb/BalanceNotification'

export class TokenTemplateListener extends EventsListener {

  name: string
  token_symbol: string
  logoURL: string
  purpose: number
  owner: string
  decimals: number

  constructor(contractAddress: string, contract: any, web3: any, ts: string, logoURL: string, name: string, purpose: number, owner: string, decimals: number) {
    super(contractAddress, contract, web3)
    this.contractType = "TokenTemplate"
    this.token_symbol = ts
    this.logoURL = logoURL
    this.name = name
    this.purpose = purpose
    this.owner = owner
    this.decimals = decimals
  }
  eventsManager(eventName: string, eventObject: any): void {
    //TODO Manage for the correct events cases
    switch (eventName) {
      case 'Transfer':
        const TransferObj: Transfer = eventObject
        console.log(`New ${eventName}!`, TransferObj)
        this.handleTransfer(TransferObj).then((val) => {
        })
        break
    }
  }

  async handleTransfer(TransferObj: Transfer) {
    let transf = await TransferNotification.create({
      "sender_pk": TransferObj.from,
      "receiver_pk": TransferObj.to,
      "token_symbol": this.token_symbol,
      "amount": TransferObj.value,
      "executed_on": new Date(),
      "purpose": this.purpose,
      "contractAddress": this.contractAddress,
      "owner": this.owner,
      "decimals": this.decimals
    })
    let senderBalance = await BalanceNotification.findOne({account_pk: TransferObj.from, token_symbol: this.token_symbol}).exec()

    if(senderBalance != null && TransferObj.from != "0x0000000000000000000000000000000000000000") {
      senderBalance.amount = senderBalance.amount - TransferObj.value
      senderBalance.computed_at = new Date()
      await BalanceNotification.updateOne({account_pk: TransferObj.from, token_symbol: this.token_symbol}, senderBalance).exec()
    }

    let receiverBalance = await BalanceNotification.findOne({account_pk: TransferObj.to, token_symbol: this.token_symbol}).exec()

    if(receiverBalance == null) {
      await BalanceNotification.create({
        "account_pk": TransferObj.to,
        "token_symbol": this.token_symbol,
        "logoURL": this.logoURL,
        "name": this.name,
        "amount": TransferObj.value,
        "computed_at": new Date(),
        "purpose": this.purpose,
        "contractAddress": this.contractAddress,
        "owner": this.owner,
        "decimals": this.decimals
      })
    } else {
      receiverBalance.amount = Number(receiverBalance.amount) + Number(TransferObj.value)
      receiverBalance.computed_at = new Date()
      await BalanceNotification.updateOne({account_pk: TransferObj.to, token_symbol: this.token_symbol}, receiverBalance).exec()
    }
  }
}