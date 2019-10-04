const Homey = require('homey')

/**
 * Update the device settings
 */
module.exports = {
  method: 'PUT',
  path: '/settings/:driver',
  fn: async (args, callback) => {
    const deviceDriver = await Homey.ManagerDrivers.getDriver(args.params.driver)
    const device = await deviceDriver.getDevice(args.body.deviceData)
    device.setSettings(args.body.settings)
    if (callback) {
      callback(null, device.getSettings())
    }
  }
}