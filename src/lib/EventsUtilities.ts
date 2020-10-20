import Event from '../models/mongodb/Event'
import {TokenTemplateListener} from '../lib/contractsListeners/TokenTemplateListener'
const TokenTemplate = require('../../build/contracts/TokenTemplate.json')

export async function reloadEventsListenerFromDB(web3: any) {
  let events = await Event.find()
  events.forEach((val, index) => {
    if (val.contractType == 'TokenTemplate') {
      let token_contract = new web3.eth.Contract(TokenTemplate.abi, val.contractAddress)
      const ttListener = new TokenTemplateListener(val.contractAddress, token_contract, web3, val.token_symbol, val.logoURL, val.name, val.purpose, val.owner, val.decimals)
      ttListener.subscribeTo('Transfer')
    }
  })
}