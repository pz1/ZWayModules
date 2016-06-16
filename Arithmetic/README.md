##Rationale
I badly miss a function in HA to manipulate data from virtualDevice sensors. So I decided to make a simple proof of concept: module Arithmetic.
Arithmetic replaces and improves on module Mathematica.

###Functions
This is a very simple module, which supports *addition*, *subtraction*, *multiplication*, and *division* on two inputs.
The module creates a virtualDevice which hold the result of the operation. As inputs two existing multilevel sensors can be selected from drop-down lists. If sensors have multiple metrics these can be defined. The defualt is the type:level metric. The result is updated every minute.


