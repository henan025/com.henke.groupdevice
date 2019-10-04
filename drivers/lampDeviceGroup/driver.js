const Driver = require('/src/driver')

module.exports = class LampGroupDriver extends Driver {
  onInit () {
      this.name = 'Lamp Group'
      this.capabilities = ['onoff', 'dim']
      super.onInit()
  }
}
