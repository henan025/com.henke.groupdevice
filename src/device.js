const ToolsDevice = require('homey-tools/src/device')

const utils = require('homey-tools/src/utils')

module.exports = class Device extends ToolsDevice {
  onInit () {
    super.onInit()

    this._deviceStateUpdateTimoutTime = 30
    this._checkGroupDevicesStateTimeout = null
    this.checkGroupDevicesState()
  }

  async checkGroupDevicesState () {
    const cap = 'onoff'
    const { devices } = this.getSettings()
    const capValue = this.getCapabilityValue(cap)
    for (let idx in devices) {
      let device = await this.getDevice(devices[idx])
      if (device && device.capabilitiesObj && device.capabilitiesObj[cap]) {
        const deviceCapValue = device.capabilitiesObj[cap].value
        if (capValue !== deviceCapValue && device.capabilitiesObj[cap].type === 'boolean') {
          await this.setCapabilityValue(cap, false)
          break
        }
      }
    }
    this._checkGroupDevicesStateTimeout = setTimeout(this.checkGroupDevicesState.bind(this), this._deviceStateUpdateTimoutTime * 1000)
  }

  async _setCapability(cap, value, opts) {
    const { devices } = this.getSettings()
    for (let idx in devices) {
      const device = await this.getDevice(devices[idx])
      try {
        let result = await device.setCapabilityValue(cap, value)
        await utils.sleep(0.2)
      } catch (e) {
        console.log(`Error: Switching the device [${this.getName()}] failed!`, e)
      }
    }
  }
}