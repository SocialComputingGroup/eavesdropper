import { EventsListener } from "../EventsListener"
import { TokenAdded } from "../../models/events/TokenFactory/TokenAdded"
import { TokenTemplateListener } from "./TokenTemplateListener"
import BalanceNotification from "../../models/co3/mongodb/BalanceNotification"
import TokenAddedNotification from "../../models/co3/mongodb/TokenAddedNotification"
import * as TokenTemplate  from '../../../build/contracts/TokenTemplate.json'
import Event from '../../models/mongodb/Event'

export class TokenFactoryListener extends EventsListener {

  constructor(contractAddress: string, contract: any, web3: any) {
    super(contractAddress, contract, web3)
    this.contractType = "TokenFactory"
  }
  eventsManager(eventName: string, eventObject: any): void {
    switch (eventName) {
      case 'TokenAdded':
        const TokenAddedObj: TokenAdded = eventObject
        console.log(`New ${eventName}!`, TokenAddedObj)
        this.handleTokenAdded(TokenAddedObj).then((val) =>{
          console.log(val)
        })
        break
    }
  }

  async handleTokenAdded(TokenAddedObj: TokenAdded) {
    await Event.create({
      "contractAddress": TokenAddedObj._contractAddress,
      "contractType": 'TokenTemplate',
      "name": TokenAddedObj._name,
      "token_symbol": TokenAddedObj._symbol,
      "logoURL": TokenAddedObj._logoURL,
      "purpose": TokenAddedObj._purpose,
      "owner": TokenAddedObj._from,
      "decimals": TokenAddedObj._decimals
    })
    await TokenAddedNotification.create({
      "contractAddress": TokenAddedObj._contractAddress,
      "name": TokenAddedObj._name,
      "symbol": TokenAddedObj._symbol,
      "decimals": TokenAddedObj._decimals,
      "logoURL": TokenAddedObj._logoURL,
      "owner": TokenAddedObj._from,
      "hardCap": TokenAddedObj._hardCap,
      "timestamp": new Date(),
      "mintable": TokenAddedObj.mintable,
      "purpose": TokenAddedObj._purpose
    })
    let token_contract = new this.web3.eth.Contract(TokenTemplate.abi, TokenAddedObj._contractAddress)
    let balance = await token_contract.methods.balanceOf(TokenAddedObj._from).call()
    await BalanceNotification.create({
      "account_pk": TokenAddedObj._from,
      "token_symbol": TokenAddedObj._symbol,
      "logoURL": TokenAddedObj._logoURL,
      "name": TokenAddedObj._name,
      "amount": balance,
      "computed_at": new Date(),
      "purpose": TokenAddedObj._purpose,
      "contractAddress": TokenAddedObj._contractAddress,
      "owner": TokenAddedObj._from,
      "decimals": TokenAddedObj._decimals
    })
    const ttListener = new TokenTemplateListener(TokenAddedObj._contractAddress, token_contract, this.web3, TokenAddedObj._symbol, TokenAddedObj._logoURL, TokenAddedObj._name, TokenAddedObj._purpose, TokenAddedObj._from, TokenAddedObj._decimals)
    ttListener.subscribeTo('Transfer')
  }
}
