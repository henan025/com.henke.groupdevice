const Device = require('/src/device')

module.exports = class LampGroupDevice extends Device {

	onInit() {
    super.onInit()
		this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this))
    this.registerCapabilityListener('dim', this.onCapabilityDim.bind(this))
  }
  
  async onCapabilityDim (value, opts) {
    await this._setCapability('dim', value, opts)
  }

	async onCapabilityOnoff (value, opts) {
    await this._setCapability('onoff', value, opts)
  }

}