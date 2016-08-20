##XMLDevice    
This module has been derived from the OpenWeather module. It is meant to turn a single XML element into a virtual device. In the configuration screen the user has to specify a number of parameters that defines the virtual device. It is important to adhere as close as possible to standard terminology as defined in the opt/z-way-server/translations/scales.xml file on your RaspberryPi.

For test purposes create status.xml with the following content (compare with PVLogger module)
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
 
##License    
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.    
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.    