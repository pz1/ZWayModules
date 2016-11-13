###Wunderground    
Simple weathermodule based on the [Wunderground Weather service](https://www.wunderground.com/?apiref=06d5c981eb770fb1). It holds minimum local weather data in the base virtualDevice Wunderground_X. vDev Wunderground_X also holds the essential data of the two additional vDevs. That makes use via the [OpenRemoteHelpers](https://github.com/pz1/ZWayModules/tree/master/OpenRemoteHelpers/README.MD) simpler and easier for users.       
There are two additional virtual devices designed for use in logical rules etc, which expect by default  _level_ type metric. One vDev is for wind direction (Wunderground_X-1) and a second (Wunderground_X-2) for sunset/sunrise time strings and a on/off variable for night/day. The night/day switch is not very precise because it is only updated every 15 minutes, which suffices in many applications.      
The three virtual devices:      
```     
{
	"scaleTitle": "Â°C",
	"title": "Schiphol",
	"probeTitle": "Temperature",
	"level": 2.9,
	"windgust": 0,
	"pressure": 1025,
	"wind_degrees": 185,
	"observe_time": "Sun, 13 Nov 2016 14:11:17 +0100",
	"max_temp": 3,
	"icon": "http://icons.wxug.com/i/c/k/cloudy.gif",
	"modificationTime": 1468154510,
	"sunrise": "7:56",
	"wind_dir": "S",
	"sunset": "16:40",
	"day_light": "off"
}

{
	"scaleTitle": "Â°",
	"title": "Schiphol",
	"level": "SSE",
	"icon": "/ZAutomation/api/v1/load/modulemedia/Wunderground/SSE.png",
	"observe_time": "Thu, 10 Nov 2016 13:32:27 +0100",
	"probeTitle": "Wind Direction"
}

{
	"scaleTitle": "",
	"title": "Schiphol Day/Night",
	"probeTitle": "isNight",
	"level": "off",
	"sunrise": "7:50",
	"sunset": "16:45",
	"icon": "/ZAutomation/api/v1/load/modulemedia/Wunderground/day.png",
	"observe_time": "Thu, 10 Nov 2016 13:32:27 +0100"
}

```
See [instructions](http://forum.z-wave.me/viewtopic.php?f=3424&t=21246) on forum

##License    
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.    
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.    

