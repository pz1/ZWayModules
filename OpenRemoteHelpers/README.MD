/*** OpenRemoteHelpers Z-Way HA module *******************************************
Version 1.01.03

Description:
    This module provides HTTP helpers for OpenRemote integration.

Author: Pieter E. Zanstra
Converted into Z-Way HA module: Poltorak Serguei

Version 1.01.03       2016-01-29 (Pieter E. Zanstra)
Added SetMetrics command which allows to set the value of a virtualDevce metric in the form of
http://raspberryIP:8083/OpenRemote/SetMetrics/vDevName/metric/value

Version 1.01.02       2015-02-12 (Pieter E. Zanstra)
Added a second argument to metrics command, so the user can select other attributes than the
default level-attribute (http://192.168.0.85:8083/OpenRemote/metrics/ZWayVDev_zway_26-0-37/icon)
Without the second argument the call returns all device attributes as json.
Closed the Switch statement with keyword default: to cater for erroneous function calls 

Version 1.01.01       2014-09-09 (Yurkin Vitaliy aivs@z-wave.me)
Added metrics command to get metrics (http://192.168.0.85:8083/OpenRemote/metrics/ZWayVDev_zway_26-0-37)

Version 1.01.01	      2014-02-28
Testing all functions and bugfixing (Yurkin Vitaliy aivs@z-wave.me)

Version 1.01.00       2013-12-11
Converted into Z-Way HA module

Version 1.00.009      2013-09-27
Updated installation instruction in this file

Version 1.00.008      2013-09-25
Adaptations for RazBerry v1.4 release
- .SetWithDuration has been abandoned so DimmerSet has been changed again.


Version 1.00.007      2013-08-07
- Added a number of SensorMultilevel variants (Humidity, Luminescence)

Version 1.00.006      2013-07-31
- Fixed error with DimmerSet function

Version 1.00.005      2013-07-21
- Fixed error in DimmerLevel
- Now use .SetWithDuration (0) instead of .Set in DimmerSet function
- Added function DimmerStatus (author Velouria)       

**USAGE**
General parameters used in the calls are:
N        the number that designates a Z-Wave device
I        the number that refers to an instance (e.g. a channel in a dual binary switch
         Use 0 for single binary switches. For dual switches use 1 and 2 for 
	     channels 1 and 2 respectively)
${param} This variable is an OpenRemote system parameter that is used e.g. for 
         passing values from a slider.
S		 Scale (e.g. Watt, kWh, etc.)

**NOTA BENE**
For the virtualDevices commands metrics, and SetMetrics the parameters N,I,S have a different meaning
N       the name of the vDev
I       the type of the metric
S       the value for the metric

Status functions that return the value "on" or "off" are to be used in OpenRemote with 
sensors of the type:switch. Apply Regular expression: on|off in the http call. 		 

OpenRemote usage: http://IP:8083/OpenRemote/<Command>/N/I/...

SwitchBinaryOn/N/I
SwitchBinaryOff/N/I
SwitchBinaryStatus/N/I
    *Add Regular Expression on|off in http call specification 
    Do use Sensor type:switch with this command*
SwitchMultilevelSet/N/I/${param}
SwitchMultilevelLevel/N/I
    *Returns exact dimmer level*
SwitchMultilevelStatus/N/I
    *Add Regular Expression on|off in http call specification 
    Do use Sensor type:switch with this command*
AlarmStatus/N
    *off means not triggered*
SensorBinaryStatus/N/I/Type
    *off means not triggered*
ThermostatLevel/N
ThermostatSet/N/${param}
ThermostatSetMode/N/Mode
ThermostatModeName/N
    *Do use RexExp [\w\s]{1,} in the http-call to get rid of quotes*
BatteryLevel/N
    *Do use Sensor type:Range with this command for use in slider*
MeterLevel/N/I/S
    *Use S=0 for kWh; S=2 for Watts*
MeterReset/N/I
TemperatureLevel/N/I
HumidityLevel/N/I
SensorMultilevel/N/I/S
DoorLock/N
DoorUnlock/N

**Helpers for virtualDevices**
metrics/N/I
   *the I parameter is optional, if omitted all metrics are returned*
SetMetrics/N/I/S