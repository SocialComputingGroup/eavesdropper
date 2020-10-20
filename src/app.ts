import createError = require('http-errors')
import express = require('express')
import path = require('path')
import cookieParser = require('cookie-parser')
import logger = require('morgan')
import contract = require('@truffle/contract')

import {TokenFactoryListener} from './lib/contractsListeners/TokenFactoryListener'
const TokenFactory = require('../../build/contracts/TokenFactory.json')
const CrowdsaleFactory = require('../../build/contracts/CrowdsaleFactory.json')
const Web3 = require('web3')
import * as Sentry from "@sentry/node"
import * as Tracing from"@sentry/tracing"

let web3 = new Web3 (new Web3.providers.WebsocketProvider("ws://",{
  clientConfig: {
      keepalive: true,
      keepaliveInterval: 60000
  },
  reconnect: {
    auto: true,
    delay: 1000,
    maxAttempts: 10,
  }
}))
import { initDB } from './config/database'
import * as EventUtilities from './lib/EventsUtilities'
import { CrowdsaleFactoryListener } from './lib/contractsListeners/CrowdsaleFactoryListener'

initDB()
let app = express()

web3.eth.getBlockNumber()
.then(console.log)

const address = ''
const contr = new web3.eth.Contract(TokenFactory.abi,address)
const crowdsaleFactoryAddress = ''
const crowdsaleFactoryContr = new web3.eth.Contract(CrowdsaleFactory.abi, crowdsaleFactoryAddress)

let tokenFactoryEvents = new TokenFactoryListener(address, contr, web3)
let crowdsaleFactoryEvents = new CrowdsaleFactoryListener(crowdsaleFactoryAddress, crowdsaleFactoryContr, web3)

tokenFactoryEvents.subscribeTo('TokenAdded')
crowdsaleFactoryEvents.subscribeTo('CrowdsaleAdded')

EventUtilities.reloadEventsListenerFromDB(web3)
//tokenEvents.subscribeTo('Transfer')
/*web3.eth.subscribe('TokenAdded', function(error, result){
  if (!error)
      console.log(result);
})*/


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  res.render('error')
})

app.listen(8081, 'localhost', (result, error) => {

})

module.exports = app
