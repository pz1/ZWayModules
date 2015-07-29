/*** UDPSendStatus Z-Way HA module *******************************************

Version: 0.0.1
(c) 2015
-----------------------------------------------------------------------------
Author: Sergeui Poltorak provided global initial module template.
Version 0.0.1: Pieter Zanstra; Some code fixes to pass Lint, Direct use of socket
send instead of via system call using NetCat. 
 
Description: Originally developed to update OpenRemote In Memory Virtual Sensors 
 ******************************************************************************/

// ----------------------------------------------------------------------------
// --- Class definition, inheritance and setup
// ----------------------------------------------------------------------------
function UDPSendStatus(id, controller) {
	// Call superconstructor first (AutomationModule)
	UDPSendStatus.super_.call(this, id, controller);
}
var self = this;
this.zways = [];
this.bindings = [];
//this.registerCC =????

inherits(UDPSendStatus, AutomationModule);

_module = UDPSendStatus;

// ----------------------------------------------------------------------------
// --- Module instance initialized
// ----------------------------------------------------------------------------
UDPSendStatus.prototype.init = function (config) {
	UDPSendStatus.super_.prototype.init.call(this, config);

	var sock = new sockets.udp();
	sock.connect(self.config.IP_Address, parseInt(self.config.port));
};

this.registerZway = function (zwayName) {
	var zway = global.ZWave && global.ZWave[zwayName].zway;
	if (!zway) {
		return;
	}
	zways.push({
		zway : zway,
		func : zway.bind(function (type, nodeId, instId, CCId) {
			// if CommandClass is ok for you, attach binding
			var path = "level";

			// here zway is local variable !
			self.bindings.push({
				zway : zway,
				nodeId : nodeId,
				instId : instId,
				CCId : CCId,
				path : path,
				func : zway.devices[nodeId].instances[instId].commandClasses[CCId].data[path].bind(function () {
					var status = (this.value) ? "on" : "off";
					sock.send("ZWay_2," + status);
				})
			}, 0x10 | 0x20); // CommandClassAdded, CommandClassDeleted
		})
	});

	this.controller.on("ZWave.register", this.registerZway);

	// unregister in stop()

	this.controller.off("ZWave.register", this.registerZway);

	this.zways.forEach(function (el) {
		if (el.zway) {
			el.zway.unbind(el.func);
		}
	});
	this.zways = [];

	this.bindings.forEach(function (el) {
		if (el.zway && el.zway.devices[el.nodeId] && el.zway.devices[el.nodeId].instances[el.instId] && el.zway.devices[el.nodeId].instances[el.instId].commandClasses[el.CCId]) {
			el.zway.devices[el.nodeId].instances[el.instId].commandClasses[el.CCId].data[el.path].unbind(el.func);
		}
	});
	this.bindings = [];
};

// ----------------------------------------------------------------------------
// --- Module methods
// ----------------------------------------------------------------------------
