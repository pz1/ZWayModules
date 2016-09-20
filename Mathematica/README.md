##Mathematica    
###Rationale    
Mathematica extends the module Arithmetic. Arithmatic had a set of five fixed formulas to choose from. Mathematica does allow the user to freely specify a calculation format. 

###Functions    
This is a very simple module, which supports math operations on two user selectable multilevel sensors. 
The module creates a virtualDevice which hold the result of the operation. As inputs two existing multilevel sensors can be selected from drop-down lists. If sensors have multiple metrics one of those can be defined. The default is the **type:level** metric. The result is updated every at the moment any of the sensor(s) updates it value. As an example the following calibration function:      
    result = sensor_a * constant_b + constant_c      
For example converting a Celsius sensor to Fahrenheit can be specified in the interface as:    
**a*1.8+32 **      
But Math library function can be used as well:      
**a-b+Math.sqrt(16)**      

##Possible limitations      
The module has not yet been tested for scientific calculations. I guess you have at least to adhere to the [ECMA 5 syntax](http://www.ecma-international.org/ecma-262/5.1/#sec-15.8)    
**Nota bene** Because the output of this device only changes if any of the sensors changes, it may take quite a while before you will see a new result. That can be confusing while you are changing the formula, and want to check the result.      

##Installation

The prefered way of installing this module is via the "Zwave.me App Store" available in 2.2.0 and higher. For stable module releases no access token is required. If you want to test the latest pre-releases use 'pz1' as app store access token.

##License    
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.    
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.    
