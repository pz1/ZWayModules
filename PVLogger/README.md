##PVLogger    
This Module requires a [Chint PV-Logger](http://fp4all.com/documents/Chint-PV-logger-leaflet-EN.pdf) 
At programmable intervals it reads some of the data coming from the logger. 
The following xml structure is assumed. The code for this module (index.js) is not very complex, and can be easily adapted to accommodate other more or less similar structures
```
    <?xml version="1.0" encoding="UTF-8"?>
    <response>
        <gauge_power>283</gauge_power>
        <gauge_temp>33.1</gauge_temp>
        <gauge_vpv>281.2</gauge_vpv>
        <gauge_iac>1.3</gauge_iac>
        <energy_today>0.436</energy_today>
        <energy_total>7911.2</energy_total>
        <hours_total>10893</hours_total>
        <time_stamp>20150226 10:06</time_stamp>
    </response>
```	
If you happen to have two of these inverters the SolQoS module may be of interest to you
######Testing the module    
If you don not have a PVlogger, you can test this module by creating a XML file named status.xml with the above contents. Place it somewhere on a website. Use that website address in the PVLogger configuration

##License    
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.    
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.    