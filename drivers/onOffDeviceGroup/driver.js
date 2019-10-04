const Driver = require('/src/driver')

module.exports = class OnOffGroupDriver extends Driver {
  onInit () {
      this.name = 'OnOff Group'
      this.capabilities = ['onoff']
      super.onInit()
  }
}
