/*** Tado Z-Way HA module *******************************************

Version: 0.0.1
(c) Christian Ashby, 2016
-----------------------------------------------------------------------------
Author: Christian Ashby's device mapping for Tado heating controllers
Derived from JSONDevice which was created from the
XMLDevice module by Serguei Poltorak <ps@z-wave.me>
Description:
This module creates a sensorMultilevel or a sensorBinary widget

 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------

function TadoDevice(id, controller) {
    "use strict";
    // Call superconstructor first (AutomationModule)
    TadoDevice.super_.call(this, id, controller);
}

inherits(TadoDevice, AutomationModule);

_module = TadoDevice;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------

TadoDevice.prototype.init = function (config) {
    TadoDevice.super_.prototype.init.call(this, config);

    var self = this;

    this.vDev = self.controller.devices.create({
        deviceId: "TadoDevice_" + this.id,
        defaults: {
            deviceType: "sensorMultilevel",
            metrics: {
                probeTitle: this.config.probeTitle
            }
        },
        overlay: {
            metrics: {
                scaleTitle: this.config.scaleTitle,
                title: this.config.deviceName
            }
        },
        moduleId: this.id
    });

    this.timer = setInterval(function () {
        self.fetchJSONElement(self);
    }, self.config.polling * 60 * 1000);
    self.fetchJSONElement(self);
};

TadoDevice.prototype.stop = function () {
    TadoDevice.super_.prototype.stop.call(this);

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

TadoDevice.prototype.fetchJSONElement = function (instance) {
    var self = instance,
        moduleName = "TadoDevice",
        langFile = self.controller.loadModuleLang(moduleName),
        isNumerical = self.config.isNumerical,
        isFloat = self.config.isFloat,
        jsonPath = self.config.jsonPath + "text()";
    if (self.config.debug) {
        console.log("jsonPath: ", self.config.jsonPath);
        console.log("Url: ", self.config.url);
        console.log("Float: ", isFloat);
        console.log("Numerical: ", isNumerical);
        console.log("Debug: ", self.config.debug);
    }

    http.request({
        url: self.config.url,
        async: true,
        contentType: "text/json",
        success: function (res) {
            try {
                var json = JSON.parse(res.data);
                if (self.config.debug) {
                    for (i in json) {
                        console.log("key: ", i);
                    }
                }
                if (isNumerical) {
                    deviceType = "sensorMultilevel";
                    if (isFloat) {
                        level = parseFloat(eval("json." + self.config.jsonPath));
                    } else {
                        level = parseInt(eval("json." + self.config.jsonPath));
                    }
                } else {
                    deviceType = "text";
                    level = eval("json." + self.config.jsonPath);
                }
                self.vDev.set("metrics:level", level);
            } catch (e) {
                if (self.config.debug) {
                    self.controller.addNotification("error", langFile.err_parse, "module", moduleName);
                    console.log("jsonPath: ", self.config.jsonPath);
                }
            }
        },
        error: function () {
            if (self.config.debug) {
                self.controller.addNotification("error", langFile.err_fetch, "module", moduleName);
                console.log("URL: ", self.config.url);
            }
        }
    });
};
