Homey.showLoadingOverlay()
Homey.setTitle("Devices") // Homey.__("pair.devices.title"))

Homey.emit('devices.initialized', null, function (err, result) {
  if (err) { return console.log(err) }
  
  new Vue({
    el: '#select_devices',
    data: {
      title: "Select group devices",
      state: "Loading",
      noDevices: "No devices available",
      selectedDevices: {},
      devices: result.devices,
      virtualGroup: result.group
    },
    mounted () {
      Homey.hideLoadingOverlay()
    },
    methods: {
      done: function (event) {
        Homey.emit('virtualgroup.getdevice', null, function (err, vg) {
          if (err) { return console.log(err) }
          Homey.addDevice(vg, (error, result) => {
            if (error) {
              Homey.alert(error)
              return
            }
            Homey.emit('virtualgroup.clear', null, function (error, result) {
              Homey.done()
            })
          })
        })
      },
      toggleSelectedDevice: function (deviceId) {
        if (this.selectedDevices[deviceId]) {
          delete this.selectedDevices[deviceId]
        } else {
          this.selectedDevices[deviceId] = true
        }
        Homey.emit('devices.changed', { 'devices': Object.keys(this.selectedDevices) }, function (err, result) {
          if (err) { return console.log(err) }
        })
        this.$forceUpdate()
      }
    },
    watch: {},
    computed: {
      filteredDevices () {
        const filtered = []
        for (let key in this.devices) {
          let add = true
          for (let i in this.virtualGroup.capabilities) {
            if (this.virtualGroup.driverUri === 'homey:app:com.henke.groupdevice' || this.devices[key].capabilities.indexOf(this.virtualGroup.capabilities[i]) < 0) {
              add = false
            }
          }
          if (add) { filtered.push(this.devices[key]) }
        }
        return filtered
      }
    }
  })
})