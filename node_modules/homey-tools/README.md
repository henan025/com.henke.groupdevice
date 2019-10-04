# homey-tools
Helper tools for Homey SDK development.

## APP example
Extend de tools App to gain functions for retriving devices

```javascript
const App = require('homey-tools/app')

class <YourAPP> extends App {
  onInit() {
    this.log(`[OnInit]: Initializing`)
    super.onInit()
  }	
}
module.exports = <YourAPP>
```



## API example
To add API functions

```javascript
const AddSetting = require('homey-tools/api/settings/add')
const GetDevices = require('homey-tools/api/device/get')

module.exports = [GetDevices, AddSetting]
```

