const Homey = require('homey')

/**
 * Get device by id
 */
module.exports = {
  method: 'GET',
  path: '/devices/:deviceId',
  fn: async (args, callback) => {
    const device = await Homey.app.getDevice(args.params.driver)
    if (callback) {
      callback(null, device)
    }
  }
}