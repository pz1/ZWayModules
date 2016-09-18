##ZWay visualisation on OpenRemote       
###Background      
[ZWay](http://razberry.zwave.me/) is a home automation platform. It has its roots in supporting Z-Wave devices. Originally built as a webservice, but later totally rewritten mostly in javascript (google V8) to run on the emerging RaspberryPi platform. Over time it has developed into a generic modular system, that allows user to build and share Apps to extend functionality. At the moment of this writing there are many [public Apps](http://developer.z-wave.me/?uri=public#/web/apps) available      
[OpenRemote](http://www.openremote.com/) is an open source middleware for the Internet of Things. It is an Integration and Visualisation platform that supports many different protocols, and has a graphical editor to freely create [advanced user interfaces](https://www.youtube.com/embed/ymqnKK7QIaQ) that run on Android, iOS, and many WEBbrowsers.      
####The OpenRemoteHelpers App      
This App provides a simplified API to ZWay hiding the user from the complex Z-Wave commands interaction. With http calls status values can be retrieved, actuators can be set. Within Zway, as administrator the user just installs the module with one click from the App store, no further settings needed.       
<to be continued>      
      
      
<a name="ORHelperAPI"></a>      
##Appendix A: OpenRemoteHelpers Syntax   
The generalised call is: **http://IP:8083/OpenRemote/Command/N/I/param**, where the parameters are:    
- *IP* - Address of the controller RaZberry      
- *Command* - Сontrol command      
- *N* - Number of Z-Wave device      
- *I* - Inside a device can be physically multiple devices (channels), for example 2 relay or temperature sensor, motion sensor, light sensor. The Instance parameter is a channel number within the device. If a device has only one physical device, this option is 0.      
- *param* - Parameter, which is used with some commands, for example 50 to set the dimmer 50%. For use in a slider, you fill in the standard OpenRemote variable ${param}      
- *dir* - Direction up/down??      
- *ID* - Is the identifier of a virtual device e.g. ZWayVDev_zway_26-0-37      
- *metric* - is the identifier for one specific sensor. e.g. level, kWh.       

As said this interface is primarily focussed on ZWave devices, but with the commands *metric* and *Setmetric* Openremote can also interact with the so-called virtualDevice level of ZWay.       

####Available Commands:      
- *SwitchBinaryOn/N/I* - Enables device      
- *SwitchBinaryOff/N/I* - Off device      
- *SwitchBinaryStatus/N/I* - Show on or off the device (on/off)      
- *SwitchMultilevelSet/N/I/param* - Open the blinds or dimming light level, param - dimming level, for example 50      
- *SwitchMultilevelLevel/N/I* - Show the percentage of open blinds or продиммирован light      
- *SwitchMultilevelStatus/N/I* - Show dimmer on/off, blinds open/closed      
- *StartLevelChange/N/I/dir* - Move dimmer/blinds up/down      
- *StopLevelChange/N/I* - Stop moving dimmer/blinds      
- *AlarmStatus/N* - Show whether the alarm ,"on" alarm means      
- *SensorBinaryStatus/N/I/Type* - Show for determining whether a binary sensor (opening movement, leakage), "on" means work. Type - the Type of sensor is usually equal to 1      
- *ThermostatLevel/N* - Show temperature which must support thermostat      
- *ThermostatSet/N/param* - Set temperature, which must support a thermostat, param - temperature      
- *ThermostatSetMode/N/Mode* - Set the thermostat mode Off, Heat, Cool, Auto, Auxiliary, Resume, Fan Only, Furnace, Dry Air, Moist Air, Auto Change Over, Heat Energy Save, Save Energy Save Cool, Heat Away, Away, Cool, Full Power, Manufacturer Specific, Low Auto, On Low, Auto, High, On High, Auto Medium, On Medium      
ThermostatModeName/N* - Show the name of the regime, which is now set      
- *BatteryLevel/N* - Show charge batteries      
- *MeterLevel/N/I/S* - Show electricity consumption. S=0 for kWh; S=2 Watts      
- *MeterReset/N/I* - read Zero power consumption      
- *TemperatureLevel/N/I* - Show temperature      
- *HumidityLevel/N/I* - Show humidity      
- *SensorMultilevel/N/I/S* - Is indication of the sensor S - conditional number of the sensor in the Z-Way      
- *DoorLock/N* - Close castle      
- *DoorUnlock/N* - Open the lock      
- *DeviceName/N/I* - user specified name of device      
- *DeviceLocation/N/I* - user specified location of device      
**For virtual devices**:      
- *metrics/ID/metric* - If the metric parameter is omitted, it returns a JSON block of all available metrics from the virtual device. A sensor reading is returned if a valid metric parameter has been given.      
- *Setmetrics/ID/metric/param* - Sets a specific metric of a virtualDevice to a value.      