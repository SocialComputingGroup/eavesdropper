import Person from '../models/mongodb/Person'
import Wallet from '../models/mongodb/Wallet'
import * as mongoose from 'mongoose'
import { Config } from '../models/config'

export abstract class EventsListener {
  contractAddress: string
  contract: any
  contractType: string
  web3: any
  subscribedEvents: object

  constructor(contractAddress: string, contract: any, web3: any) {
    this.contractAddress = contractAddress
    this.contract = contract
    this.web3 = web3
    this.subscribedEvents = {}
  }

  subscribeTo(eventName: string) {
    return this.subscribeLogEvent(this.contract, eventName)
  }

  subscribeLogEvent = (contract, eventName) => {
    const eventJsonInterface = this.web3.utils._.find(
      contract._jsonInterface,
      o => o.name === eventName && o.type === 'event',
    )
  
    const subscription = this.web3.eth.subscribe('logs', {
      address: contract.options.address,
      topics: [eventJsonInterface.signature]
    }, async (error, result) => {
      if(!error) {
        this.eventsManager(eventName, this.web3.eth.abi.decodeLog(
          eventJsonInterface.inputs,
          result.data,
          result.topics.slice(1)
        ))
        //await this.retrieveUserFromEthAddress()
      } else {
        console.log(error)
      }
    })
  
    this.subscribedEvents[eventName] = subscription
  }

  /*retrieveUserFromEthAddress = async (userEthAddress: string) => {
    await mongoose.connect(config.mongoDB_URI, {
      useNewUrlParser: true
    })
    const wallet = await Wallet.findOne({address: userEthAddress})
    let user = await Person.findOne({id: wallet.userId})
    return user
  }*/
  
  abstract eventsManager(eventName: string, eventObject: any) : void
  //TODO create documentation
}