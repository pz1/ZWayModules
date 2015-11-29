/*** TTNLoraWAN Z-Way HA module *******************************************

Version: 0.0.2
(c) Z-Wave.Me, 2014
-----------------------------------------------------------------------------
Author: Pieter E. Zanstra adaptation for TTN-LoraWAN
Derived from OpenWeather module by Serguei Poltorak <ps@z-wave.me>
Description:
This module creates ??EXPERIMENTAL??

 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function TTNLoraWAN(id, controller) {
	// Call superconstructor first (AutomationModule)
	TTNLoraWAN.super_.call(this, id, controller);
}

inherits(TTNLoraWAN, AutomationModule);

_module = TTNLoraWAN;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

TTNLoraWAN.prototype.init = function (config) {
	TTNLoraWAN.super_.prototype.init.call(this, config);

	var self = this;

	this.vDev = self.controller.devices.create({
			deviceId : "TTNLoraWAN_" + this.id,
			defaults : {
				deviceType : "sensorMultilevel",
				metrics : {
					probeTitle : this.config.nodetitle
				}
			},
			overlay : {
				metrics : {
					scaleTitle : '°C',
					title : this.config.node_eui
				}
			},
			moduleId : this.id
		});

	this.timer = setInterval(function () {
			self.fetchTTNSensor(self);
		}, self.config.polling * 60 * 1000);
	self.fetchTTNSensor(self);
};

TTNLoraWAN.prototype.stop = function () {
	TTNLoraWAN.super_.prototype.stop.call(this);

	if (this.timer)
		clearInterval(this.timer);

	if (this.vDev) {
		this.controller.devices.remove(this.vDev.id);
		this.vDev = null;
	}
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------

TTNLoraWAN.prototype.fetchTTNSensor = function (instance) {
	var self = instance,
	moduleName = "TTNLoraWAN",
	langFile = self.controller.loadModuleLang(moduleName);

	http.request({
		url : self.config.url + self.config.node_eui + "/?format=json",
		method : "GET",
		async : true,
		success : function (res) {
			try {
				var data = res.data;
				if (data instanceof Array) {
					var first_entry = data[0];

					self.vDev.set("metrics:level", first_entry[self.config.sensor]);
					self.vDev.set("metrics:name", first_entry.node_eui);
					self.vDev.set("metrics:observe_time", first_entry.time);
					self.vDev.set("metrics:icon", "http://192.168.1.28:8083/ZAutomation/api/v1/load/modulemedia/TTNLoraWAN/icon.png");
				}
			} catch (e) {
				self.controller.addNotification("error", langFile.err_parse, "module", moduleName);
			}
		},
		error : function () {
			self.controller.addNotification("error", langFile.err_fetch, "module", moduleName);
		}
	});
};
