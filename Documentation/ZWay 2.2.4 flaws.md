## Several issues submitted to Github (quite) a while ago      
- https://github.com/Z-Wave-Me/ExpertUI/issues/210  potentially serious       
- https://github.com/Z-Wave-Me/ExpertUI/issues/209  *minor*          
- https://github.com/Z-Wave-Me/ExpertUI/issues/206  *assigned*     
- https://github.com/Z-Wave-Me/zwave-smarthome/issues/177  waiting for response    
- https://github.com/Z-Wave-Me/zwave-smarthome/issues/176  Abiguity imported device; *assigned*       
- https://github.com/Z-Wave-Me/ExpertUI/issues/187 temperature setting StellaZ very serious for me      
- https://github.com/Z-Wave-Me/home-automation/issues/299 HTTP authentication; Still serious problem for me, but I assume nothing will be done about it. (Couple of days ago I saw a cryptic note re http authentication on OR forum, but unsure if it affects this one. I'll give it a try once it is a formal OR release)      

## Issues spotted in v2.2.4-rc16     
- *Expert UI* - *Network/Timing Info* still not presenting any data
- *Expert UI* - *Configuration/Association* Associations with battery devices show triangle error status. Seen at Popp smoke sensor, Sensative door sensor, but not in Vision ZD2102EU 2013. The failing devices all happen to be of *Device type:Unknown device type: 7*
- *Smarthome* -  The zero in the centigrade symbol is displayed as a question mark in a diamond shape. Observed this only with one of my Fibaro Universal Sensors (the newer of the two that refuses to complete the interview (2 alarms are missing) 
-  *Smarthome* - After upgrade from v2.2.4-rc9, for both my **Sensative strips** I do get error: *Cannot create vDev based on: 32-0-113: ReferenceError: renameDevices is not defined*. I assume this has to do with new Postfix settings, which remove these unwanted vDevs as [explained on the forum](http://forum.z-wave.me/viewtopic.php?f=3419&t=23470&p=63958#p63955).      
## Issues spotted in v2.2.4-rc17
- *Smarthome* - After a reboot changed vDev names are reverted to the original name given in index.js in the overlay section. Observed with my own modules under userModules, but doesn't seem to happen in the included standard modules. I have seen this behaviour before in much earlier releases. This happens also in my rc16 system with Popp smoke alarm. I had given it a human understandable name, but the element name has also been reverted to Smoke Alarm (23.0.48.2)      
- *Smarthome* - In my own module Wunderground, which is a slightly modified version of the standard distribution's OpenWeather App, I do get since tyhe upgrade to rc17 repeated messages "Can not parse weather information". In the log file I see "Notification: error (module): Can not parse weather information". Apparently the module name is not found, but definitely specified in index.js. Besides if I interrogate the device, the full set of metrics can be read and seen in the UI. I vaguely remember to have seen this in a much earlier too.                 
