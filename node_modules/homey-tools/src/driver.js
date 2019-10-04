const Homey = require('homey')

const utils = require('./utils')

/**
 * Homey Tools Driver
 */
module.exports = class ToolsDriver extends Homey.Driver {
  onInit () {
    this.version = Homey.app.manifest.version
  }

  /**
   * Create initial device template, pass additional settings
   * @param {*} settings 
   */
  createDefaultDevice (settings = {}) {
    this._device = {
      data: { id: utils.generateUuid() },
      name: this.name,
      capabilities: this.capabilities,
      settings: Object.assign({ createdVersion: this.version }, settings)
    }
  }
}