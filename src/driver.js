const Homey = require('homey')
const ToolsDriver = require('homey-tools/src/driver')

module.exports = class Driver extends ToolsDriver {
  onInit () {
    super.onInit()
  }

  async onDevicesInitialized (data, callback) {
    let result = {
        devices: [],
        group: this._device
    }
    try {
      const _devices = await Homey.app.getDevices()
      const filteredDevices = []
      for (let key in _devices) {
        let add = true
        for (let i in this.capabilities) {
          if (_devices[key].driverUri === 'homey:app:com.henke.groupdevice' || _devices[key].capabilities.indexOf(_devices[key].capabilities[i]) < 0) {
            add = false
          }
        }
        if (add) {
          filteredDevices.push(_devices[key])
        }
      }
      result.devices = filteredDevices
      callback(null, result)
    } catch (e) {
      console.log(e)
      callback(e, null)
    }
  }

  onDevicesChanged (data, callback) {
    this._device.settings.devices = data.devices
    callback(null, true)
  }

  getPairingDevice (data, callback) {
    callback(null, this._device)
  }

  clear (data, callback) {
    this._device = null
    callback(null, true)
  }

  onPair(socket) {
    this.createDefaultDevice({ devices: {} })
    
    let devicesInitialized  = async (data, callback) => { this.onDevicesInitialized(data, callback) }
    let deviceChanged  = async (data, callback) => { this.onDevicesChanged(data, callback) }
    let getPairingDevice  = async (data, callback) => { this.getPairingDevice(data, callback) }
    let clear  = async (data, callback) => { this.clear(data, callback) }

    socket.on('devices.initialized', devicesInitialized)
    socket.on('devices.changed', deviceChanged)
    socket.on('virtualgroup.getdevice', getPairingDevice)
    socket.on('virtualgroup.clear', clear)
  }

}