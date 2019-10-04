const Device = require('/src/device')

module.exports = class OnOffGroupDevice extends Device {

	onInit() {
    super.onInit()
		this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this))
  }

	async onCapabilityOnoff (value, opts) {
    await this._setCapability('onoff', value, opts)
  }
}