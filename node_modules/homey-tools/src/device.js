const Homey = require('homey')

module.exports = class ToolsDevice extends Homey.Device {
  onInit () {}

  debug (args) {
    this.log('Debugging device')
    this.log('Name:', this.getName())
    this.log('Class:', this.getClass())
    this.log('Settings: ', this.getSettings())
    if (args) {
      this.log(args)
    }
  }

  reload () {
    console.log(`[${this.getClass()}]: Has not implemented reload`)
  }

  async getDevice(deviceId) {
    try {
      return await Homey.app.getDevice(deviceId)
    } catch (e) {
      if (e.name === 'device_not_found') {
        this.log(`[${this.getName()}] Could not get device: |${deviceId}]: device no longer exists.`)
      }
      this.error(e)
      return false
    }
  }
}