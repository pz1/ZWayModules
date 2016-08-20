##Arithmetic    
###Rationale    
I badly miss a function in HA to manipulate data from virtualDevice sensors. So I decided to make a simple proof of concept: module Arithmetic.
Arithmetic replaces and improves on module Mathematica.

###Functions    
This is a very simple module, which supports *addition*, *subtraction*, *multiplication*, and *division* on two inputs.
The module creates a virtualDevice which hold the result of the operation. As inputs two existing multilevel sensors can be selected from drop-down lists. If sensors have multiple metrics these can be defined. The defualt is the type:level metric. The result is updated every minute.

Version 1.0.2:  Added a calibration function that acts on the first sensor. Its value can be muliplied by one constant, and offset by another:
```
result = sensor_a * constant_1 + constant_2
```
For example you can now simply convert a Celsius sensor to Fahrenheit by choosing the values 1.8 and 32 respectively for constant_1 and const_2.

##License    
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.    
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.    