##ZWay visualisation on OpenRemote       
###Background      
[ZWay](http://razberry.zwave.me/) is a home automation platform. It has its roots in supporting Z-Wave devices. Originally built as a webservice, but later totally rewritten mostly in javascript (google V8) to run on the emerging RaspberryPi platform. Over time it has developed into a generic modular system, that allows user to build and share Apps to extend functionality. At the moment of this writing there are many [public Apps](http://developer.z-wave.me/?uri=public#/web/apps) available      
[OpenRemote](http://www.openremote.com/) is an open source middleware for the Internet of Things. It is an Integration and Visualisation platform that supports many different protocols, and has a graphical editor to freely create [advanced user interfaces](https://www.youtube.com/embed/ymqnKK7QIaQ) that run on Android, iOS, and many WEBbrowsers.      
###Installation      
####ZWay: The OpenRemoteHelpers App      
This App provides a simplified API to ZWay hiding the user from the complex Z-Wave commands interaction. With http calls status values can be retrieved, actuators can be set. Within Zway, as administrator the user just installs the module with one click from the App store, no further settings required.       
####OpenRemote: The Controller
\<to be completed\>      
      
      
----      
##<a name="ORHelperAPI"></a>Appendix A: OpenRemoteHelpers Syntax   
The generalised call is: **http://IP:8083/OpenRemote/Command/N/I/param**, where the parameters are:    
- *IP* - Address of the controller RaZberry      
- *Command* - Сontrol command      
- *N* - Number of Z-Wave device      
- *I* - Inside a device can be physically multiple devices (channels), for example 2 relay or temperature sensor, motion sensor, light sensor. The Instance parameter is a channel number within the device. If a device has only one physical device, this option is 0.      
- *param* - Parameter, which is used with some commands, for example 50 to set the dimmer 50%. For use in a slider, you fill in the standard OpenRemote variable ${param}      
- *dir* - Direction up/down??      
- *ID* - Is the identifier of a virtual device e.g. ZWayVDev_zway_26-0-37      
- *metric* - is the identifier for one specific sensor. e.g. level, icon, kWh.       

As said this interface is primarily focussed on ZWave devices, but with the commands *metric* and *Setmetric* Openremote can also interact with the so-called virtualDevice level of ZWay.       

####Available Commands:      
- *SwitchBinaryOn/N/I* - Enables device      
- *SwitchBinaryOff/N/I* - Off device      
- *SwitchBinaryStatus/N/I* - Show on or off the device (on/off)      
- *SwitchMultilevelSet/N/I/param* - Open the blinds or dimming light level, param - dimming level, for example 50      
- *SwitchMultilevelLevel/N/I* - Show the percentage of open blinds or dimmed light, etc      
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
      
----
##<a name="UDPOR"></a>Appendix B: Fast status updates with UDP      
![alt text](https://github.com/pz1/ZWayModules/blob/master/Documentation/htdocs/ImVC.PNG)
/<polling issue/>
#### Zway: Send      
```     
    var sock = new sockets.udp();
    sock.connect("192.168.4.88", 9091); //Use IP and port number of your OR Controller

    this.bindFunc1 = function (zwayName) {
       if (zwayName != "zway")
          return; // you want to bind to default zway instance

       var devices = global.ZWave[zwayName].zway.devices;

       //from here insert your own devices

       // Zwave>Me Binary Switch
       devices[2].SwitchBinary.data.level.bind(function () {
          var status = (this.value) ? "on" : "off";
          sock.send("ZWay_2," + status);
       });

       // Fibaro Universal Sensor-Temperature
       devices[13].instances[5].SensorMultilevel.data[1].val.bind(function () {
          var status = this.value;
          sock.send("ZWay_13_5_1," + status);
       });

       // Vision Door/window sensor
       devices[30].SensorBinary.data[1].level.bind(function () {
          var status = (this.value) ? "on" : "off";
          sock.send("ZWay_30_0_1," + status);
       });

       // End of your own devices
    };

    // process all active bindings
    if (global.ZWave) {
       global.ZWave().forEach(this.bindFunc1);
    }

    // and listen for future ones
    global.controller.on("ZWave.register", this.bindFunc1);
```     
#### OpenRemote: Receive      
In OpenRemote designer, first create a New Device with the name *UDP Listener*. Select that new device and create a New Command with the name *RaZStatusListener*. Select protocol **UDPListener**. Specify UDP port is 9091. In the RegEx field specify: (.\*)      
Finally add a sensor of **type:custom** with the **exact name** *RaZ-UDP-Status*, choose RaZStatusListener in the command specification window. That is all.     
Unfortunately OpenRemote's UDPListener protocol does not yet have the option to parse the incoming tuplet {SensorId,Value}, directly into the corresponding sensor. The following rule is a workaround to achieve that. In principle you can use the OR rule editor to add the following rule. However it is more robust to save the following rule as plain text file OpenRemote/webapps/controller/rules/UDPListener.drl.
```      
package org.openremote.controller.protocol.preserve;
import java.util.*;
import org.openremote.controller.protocol.Event;
global org.openremote.controller.statuscache.CommandFacade execute;
 
 
rule "UDPListener9091"
when
  Event(source=="RaZ-UDP-Status", $v: value!="")
then
  java.util.regex.Pattern regexPattern = java.util.regex.Pattern.compile("\\(?(ZWay.*),([\\d\\.+|on|off]+)\\)?");
  java.util.regex.Matcher matcher = regexPattern.matcher($v.toString());
  if (matcher.find()) {
    execute.command(matcher.group(1), matcher.group(2));
  }
end
```         
Do make sure that port 9091 is not used by an other application. If you want to integrate a second Zway server with OpenRemote, you have to duplicate the UDPListener and the rule. You need a different port not to close to the existing number (e.g. 9192), and a different name for the sensor (e.g. RaZ-UDP-Status2). Do use those in the second rule! 