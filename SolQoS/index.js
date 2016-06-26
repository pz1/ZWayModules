/*** SolQoS Z-Way HA module *******************************************

Version: 1.1.0 beta
(c) 2015-2016
-----------------------------------------------------------------------------
Author: Pieter E. Zanstra
Description:
This module combines and compares the results of two instances of userModule PVLogger
If either of the power levels is lower than 40% of the combined power, there possibly
is a malfunctioning device. However false warnings will occur if reporting of solar
power inverters is not in sync while the level of solar radiation rapidly changes due
to cloudy weather.

 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function SolQoS(id, controller) {
	// Call superconstructor first (AutomationModule)
	SolQoS.super_.call(this, id, controller);
}

inherits(SolQoS, AutomationModule);

_module = SolQoS;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

SolQoS.prototype.init = function (config) {
	SolQoS.super_.prototype.init.call(this, config);

	var self = this;

	this.vDev = self.controller.devices.create({
			deviceId : "SolQoS_" + this.id,
			defaults : {
				deviceType : "sensorMultilevel",
				metrics : {
					probeTitle : "Power"
				}
			},
			overlay : {
				metrics : {
					scaleTitle : "Watt",
					title : "QualityOfService"
				}
			},
			moduleId : this.id
		});

	this.controller.devices.on((self.config.pvlogger1 + "-1"), 'change:metrics:level', function() { 
		self.fetchEquation(self);
	});
	this.controller.devices.on((self.config.pvlogger2 + "-1"), 'change:metrics:level', function() {
		self.fetchEquation(self);
	});

//	this.timer = setInterval(function () {
//			self.fetchEquation(self);
//		}, self.config.polling * 60 * 1000); //every minute
//	self.fetchEquation(self);
};

SolQoS.prototype.stop = function () {
	SolQoS.super_.prototype.stop.call(this);

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

SolQoS.prototype.fetchEquation = function (instance) {
	var self = instance,
	QoS = 0,
	pv1power = self.config.pvlogger1 + "-1",
	pv1energy = self.config.pvlogger1 + "-2",
	pv2power = self.config.pvlogger2 + "-1",
	pv2energy = self.config.pvlogger2 + "-2",
	timestamp = controller.devices.get(pv1power).get("metrics:timeStamp"),
	watt1 = parseFloat(controller.devices.get(pv1power).get("metrics:level")),
	watt2 = parseFloat(controller.devices.get(pv2power).get("metrics:level")),
	kwh1 = parseFloat(controller.devices.get(pv1energy).get("metrics:level")),
	kwh2 = parseFloat(controller.devices.get(pv2energy).get("metrics:level")),
	power = watt1 + watt2,
	power40 = 0.4 * power,
	energy = kwh1 + kwh2,
	outputRatio = parseInt((power / self.config.capacity) * 100);

	if (power < 90) {
		QoS = 0;
		status = "solardead";
	}

	if ((power > 90) &&
		(watt1 > power40) &&
		(watt2 > power40)) {
		QoS = 1;
		status = "solarok";
	}

	if ((power > 90) &&
		(watt1 < power40) &&
		(watt2 > power40)) {
		QoS = 2;
		status = "solardefect1";
	}

	if ((power > 90) &&
		(watt1 > power40) &&
		(watt2 < power40)) {
		QoS = 3;
		status = "solardefect2";
	}

	self.vDev.set("metrics:icon","http://" + self.config.host + "/ZAutomation/api/v1/load/modulemedia/SolQoS/" + status + "58px.png" );
	self.vDev.set("metrics:level", power);
	self.vDev.set("metrics:kW", power/1000);
	self.vDev.set("metrics:outputRatio", outputRatio);
	self.vDev.set("metrics:kWh", energy);
	self.vDev.set("metrics:QoS", QoS);
	self.vDev.set("metrics:timeStamp", timestamp);
};
