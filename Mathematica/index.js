/*** Mathematica Z-Way HA module *******************************************

Version: 0.0.3
(c) 2016
-----------------------------------------------------------------------------
Author: Pieter E. Zanstra
Description:
This module allows the user to create a multilevel sensor, which value is derived
from one or two user selectable sensors, and up to two user specified fixed values
The user can supply any valid mathematical expression to combine these inputs.

 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function Mathematica(id, controller) {
	// Call superconstructor first (AutomationModule)
	Mathematica.super_.call(this, id, controller);
}

inherits(Mathematica, AutomationModule);

_module = Mathematica;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

Mathematica.prototype.init = function (config) {
	Mathematica.super_.prototype.init.call(this, config);

	var self = this;

	this.vDev = self.controller.devices.create({
			deviceId : "Mathematica_" + this.id,
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

Mathematica.prototype.stop = function () {
	Mathematica.super_.prototype.stop.call(this);

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

Mathematica.prototype.fetchEquation = function (instance) {
	var self = instance,
	result = 0;

	var calculation = self.config.formula;
	var metric1 = "metrics:" + self.config.metric1;
	var metric2 = "metrics:" + self.config.metric2;
	var a = controller.devices.get(self.config.sensor1).get(metric1);
	var b = controller.devices.get(self.config.sensor2).get(metric2);

	result = eval(calculation);

	self.vDev.set("metrics:level", result);
	self.vDev.set("metrics:icon", "/ZAutomation/api/v1/load/modulemedia/Mathematica/icon.png");
};
