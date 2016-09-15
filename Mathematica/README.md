##Mathematica    
###Rationale    
Mathematica extends the module Arithmetic. Arithmatic has a set of five fixed formulas to choose from. Mathematica does allow the user to freely specify a calculation format. 

###Functions    
This is a very simple module, which supports *addition*, *subtraction*, *multiplication*, and *division* on two user selectable multilevel sensors, and up to two user supplied constants.
The module creates a virtualDevice which hold the result of the operation. As inputs two existing multilevel sensors can be selected from drop-down lists. If sensors have multiple metrics one of those can be defined. The default is the **type:level** metric. The result is updated every minute. As an example the following calibration function:      

```
result = sensor_a * constant_1 + constant_2
```
must be specified in the interface as:    
```     
a*c1+c2 
```        

For example you can now simply convert a Celsius sensor to Fahrenheit by choosing the values 1.8 and 32 respectively for constant_1 and const_2.

##Possible limitations      
The module has not yet been tested for scientific calculations. I guess you have at least to adhere to the [ECMA 5 syntax](http://www.ecma-international.org/ecma-262/5.1/#sec-15.8)

##Installation

The prefered way of installing this module is via the "Zwave.me App Store" available in 2.2.0 and higher. For stable module releases no access token is required. If you want to test the latest pre-releases use 'pz1' as app store access token.

##License    
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.    
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.    
