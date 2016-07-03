/*** PVLogger Z-Way HA module *******************************************

Version: 1.0.1
(c) 2015-2016
-----------------------------------------------------------------------------
Author: Pieter E. Zanstra
Description:
This module creates temperature widget

 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function PVLogger(id, controller) {
	// Call superconstructor first (AutomationModule)
	PVLogger.super_.call(this, id, controller);
}

inherits(PVLogger, AutomationModule);

_module = PVLogger;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

PVLogger.prototype.init = function (config) {
	PVLogger.super_.prototype.init.call(this, config);

	var self = this;

	this.vDev = self.controller.devices.create({
			deviceId : "PVLogger_" + this.id + "-1",
			defaults : {
				deviceType : "sensorMultilevel",
				metrics : {
					probeTitle : "Power"
				}
			},
			overlay : {
				metrics : {
					scaleTitle : 'W',
					title : "SolarPower_" + this.id
				}
			},
			moduleId : this.id
		});

	this.vDev2 = self.controller.devices.create({
			deviceId : "PVLogger_" + this.id + "-2",
			defaults : {
				deviceType : "sensorMultilevel",
				metrics : {
					probeTitle : "Energy"
				}
			},
			overlay : {
				metrics : {
					scaleTitle : 'kWh',
					title : "SolarEnergy_" + this.id
				}
			},
			moduleId : this.id
		});
	this.timer = setInterval(function () {
			self.fetchSolar(self);
		}, self.config.polling * 60 * 1000);
	self.fetchSolar(self);
};

PVLogger.prototype.stop = function () {
	PVLogger.super_.prototype.stop.call(this);

	if (this.timer) {
		clearInterval(this.timer);
	}

	if (this.vDev) {
		this.controller.devices.remove(this.vDev.id);
		this.vDev = null;
	}

	if (this.vDev2) {
		this.controller.devices.remove(this.vDev2.id);
		this.vDev2 = null;
	}

};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

PVLogger.prototype.fetchSolar = function (instance) {
	var self = instance,
	    moduleName = "PVLogger",
            langFile = self.controller.loadModuleLang(moduleName),
            lang = self.controller.defaultLang;



	http.request({
		url : "http://" + self.config.pvlogger + "/status.xml",
		method : "GET",
		async : true,
		success : function (response) {
			try {
				var doc1 = response.data; // it is already ZXmlDocument
				power = parseFloat(doc1.findOne("/response/gauge_power/text()"));
console.log("PVLogger: ",power);
				eToday = parseFloat(doc1.findOne("/response/energy_today/text()"));
				timeStamp = doc1.findOne("/response/time_stamp/text()");
				self.vDev.set("metrics:level", power);
				self.vDev.set("metrics:timeStamp", timeStamp);
			        self.vDev.set("metrics:icon", "/ZAutomation/api/v1/load/modulemedia/PVLogger/solarpanel.png");
				self.vDev2.set("metrics:level", eToday);
				self.vDev2.set("metrics:timeStamp", timeStamp);
			        self.vDev2.set("metrics:icon", "/ZAutomation/api/v1/load/modulemedia/PVLogger/solarpanel.png");
			} catch (e) {
				self.controller.addNotification("error", langFile.err_parse, "module", moduleName);
			}
		},
		error : function () {
			//self.vDev.set("metrics:level", 0);
			//self.vDev2.set("metrics:level", 0);
			//The following line is commented, because the logger is not available at night. Uncomment for initial testing.
			//self.controller.addNotification("error" , langFile.err_fetch, "module", moduleName);
		}
	});
};
