'use strict'

const App = require('homey-tools/app')

class DeviceGroupApp extends App {

  onInit() {
    this.log(`[OnInit]: Initializing DeviceGroupApp`)
    super.onInit()
  }
	
}

module.exports = DeviceGroupApp
