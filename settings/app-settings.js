function onHomeyReady (Homey) {
  Homey.ready()
  Homey.api('GET', '/devices', null, (err, result) => {
    if (err) { return Homey.alert('getDevices: ' + err) }
    const groups = {}
    const devices = {}
    for (let key in result) {
      const device = result[key]
      if (device.driverUri === 'homey:app:com.henke.groupdevice') {
        if (!groups[device.id]) {
          groups[device.id] = device
        }
      } else {
        if (!devices[device.id]) {
          devices[device.id] = device
        }
      }
    }

    new Vue({
      el: '#app-settings',
      data: {
        loaded: true,
        texts: {
          title: "Select group",
          title2: "Select devices",
        },
        selectedGroup: null,
        devices: devices,
        groups: groups
      },
      mounted () {},
      methods: {
        toggleSelectedDevice: function (deviceId) {
          if (!this.selectedGroup) { return }
          if (!this.selectedGroup.settings.devices) { this.selectedGroup.settings.devices = [] }
          if (this.selectedGroup && this.selectedGroup.settings.devices.indexOf(deviceId) >= 0) {
            this.selectedGroup.settings.devices.splice(this.selectedGroup.settings.devices.indexOf(deviceId), 1)
          } else {
            this.selectedGroup.settings.devices.push(deviceId)
          }
          const body = {
            deviceData: this.selectedGroup.data,
            settings: this.selectedGroup.settings
          }
          Homey.api('PUT', '/settings/' + this.selectedGroup.driverId, body, (err, result) => {
            if (err) {
              console.log(err)
              return Homey.alert('settings: ' + err)
            }
            // console.log(result)
          })
        }
      },
      watch: {},
      computed: {}
    })
  })
}