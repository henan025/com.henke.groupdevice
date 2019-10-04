const Homey = require('homey')

exports = {
  method: 'GET',
  path: '/settings/:driver',
  fn: async (args, callback) => {
    const deviceDriver = await Homey.ManagerDrivers.getDriver(args.params.driver)
    const device = await deviceDriver.getDevice(args.body.deviceData)
    if (callback) {
      callback(null, device.getSettings())
    }
  }
}