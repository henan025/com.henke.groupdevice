'use strict';
const AddSetting = require('homey-tools/api/settings/add')
const GetDevices = require('homey-tools/api/device/get')

module.exports = [GetDevices, AddSetting]