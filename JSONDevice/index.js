/*** JSONDevice Z-Way HA module *******************************************

Version: 0.0.1
(c) Christian Ashby, 2016
-----------------------------------------------------------------------------
Author: Christian Ashby's adaptation for JSONDevice API
Derived from XMLDevice module by Serguei Poltorak <ps@z-wave.me>
Description:
This module creates a sensorMultilevel or a sensorBinary widget

 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function XMLDevice(id, controller) {
	// Call superconstructor first (AutomationModule)
	XMLDevice.super_.call(this, id, controller);
}

inherits(XMLDevice, AutomationModule);

_module = XMLDevice;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

XMLDevice.prototype.init = function (config) {
	XMLDevice.super_.prototype.init.call(this, config);

	var self = this;

	this.vDev = self.controller.devices.create({
			deviceId : "XMLDevice_" + this.id,
			defaults : {
				deviceType : "sensorMultilevel",
				metrics : {
					probeTitle : this.config.probeTitle
				}
			},
			overlay : {
				metrics : {
					scaleTitle : this.config.scaleTitle,
					title : this.config.deviceName
				}
			},
			moduleId : this.id
		});

	this.timer = setInterval(function () {
			self.fetchXMLElement(self);
		}, self.config.polling * 60 * 1000);
	self.fetchXMLElement(self);
};

XMLDevice.prototype.stop = function () {
	XMLDevice.super_.prototype.stop.call(this);

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

XMLDevice.prototype.fetchXMLElement = function (instance) {
	var self = instance,
	moduleName = "XMLDevice",
	langFile = self.controller.loadModuleLang(moduleName),
	isNumerical = self.config.isNumerical,
	isFloat = self.config.isFloat,
	XPath = self.config.xpath + "text()";
	if (self.config.debug){
		console.log("Xpath: ", self.config.xpath);
		console.log("Url: ", self.config.url);
		console.log("Float: ", isFloat);
		console.log("Numerical: ", isNumerical);
		console.log("Debug: ", self.config.debug);
	}

	http.request({
		url : self.config.url,
		async : true,
		success : function (res) {
			try {
				var doc1 = res.data;
				if (isNumerical) {
					deviceType = "sensorMultilevel";
					if (isFloat) {
						level = parseFloat(doc1.findOne(XPath));
					} else {
						level = parseInt(doc1.findOne(XPath));
					}
				} else {
					deviceType = "text";
					level = doc1.findOne(XPath);
				}
				self.vDev.set("metrics:level", level);
			} catch (e) {
				if (self.config.debug) {
					self.controller.addNotification("error", langFile.err_parse, "module", moduleName);
					console.log ("Xpath: ", self.config.xpath);
				}
			}
		},
		error : function () {
			if (self.config.debug) {
				self.controller.addNotification("error", langFile.err_fetch, "module", moduleName);
				console.log ("URL: ", self.config.url);
			}
		}
	});
};
