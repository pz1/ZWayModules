/*** Arithmetic Z-Way HA module *******************************************

Version: 1.0.4
(c) 2015-2016
-----------------------------------------------------------------------------
Author: Pieter E. Zanstra
Description:
This module combines two or more multiLevel signals into one outcome

 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function Arithmetic(id, controller) {
	// Call superconstructor first (AutomationModule)
	Arithmetic.super_.call(this, id, controller);
}

inherits(Arithmetic, AutomationModule);

_module = Arithmetic;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

Arithmetic.prototype.init = function (config) {
	Arithmetic.super_.prototype.init.call(this, config);

	var self = this;

	this.vDev = self.controller.devices.create({
			deviceId : "Arithmetic_" + this.id,
			defaults : {
				deviceType : "sensorMultilevel",
				metrics : {
					probeTitle : self.config.Title
				}
			},
			overlay : {
				metrics : {
					scaleTitle : self.config.scaleTitle,
					title : self.config.Title
				}
			},
			moduleId : this.id
		});

//  Following code is a replacement for the 'timed' call to fetch equation. It should fix
//  the problem of not initialised variables at start up.

	this.controller.devices.on(self.config.sensor1, 'change:metrics:level', function() { 
		self.fetchEquation(self);
	});
	this.controller.devices.on(self.config.sensor2, 'change:metrics:level', function() {
		self.fetchEquation(self);
	});

//	this.timer = setInterval(function () {
//			self.fetchEquation(self);
//		}, 60 * 1000); //every minute
//	self.fetchEquation(self);
};

Arithmetic.prototype.stop = function () {
	Arithmetic.super_.prototype.stop.call(this);

	if (this.timer) {
		clearInterval(this.timer);
	}

	if (this.vDev) {
		this.controller.devices.remove(this.vDev.id);
		this.vDev = null;
	}
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

Arithmetic.prototype.fetchEquation = function (instance) {
	var self = instance,
	result = 0;

	var calculation = self.config.formula;
	var param = self.config.cParams;
	if (param.length >0) {
		var cArray = param.split(";",2);
        	var c1 = parseFloat(cArray[0]);
        	var c2 = parseFloat(cArray[1]);
	}
	var metric1 = "metrics:" + self.config.metric1;
	var metric2 = "metrics:" + self.config.metric2;
	var a = controller.devices.get(self.config.sensor1).get(metric1);
	var b = controller.devices.get(self.config.sensor2).get(metric2);

	switch (calculation) {
	case "add":
		result = a + b;
		break;
	case "sub":
		result = a - b;
		break;
	case "mult":
		result = a * b;
		break;
	case "div":
		if (b !== 0) {
			result = a / b;
		} else {
			result = 0;
		}
		break;
	case "calibrate":
		result = a * c1 + c2;
		break;
	default:
		return "Error: function " + calculation + " is not defined in module Arithmetic";
	}
	self.vDev.set("metrics:level", result);
	self.vDev.set("metrics:icon", "/ZAutomation/api/v1/load/modulemedia/Arithmetic/icon.png");
};
