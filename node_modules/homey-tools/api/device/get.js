const Homey = require('homey')

/**
 * Get all devices
 */
module.exports = {
  method: 'GET',
  path: '/devices',
  fn: async (args, callback) => {
    let res = await Homey.app.getDevices()
    if (callback) {
      callback(null, res)
    }
  }
}