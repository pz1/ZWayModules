var sock = new sockets.udp();
sock.connect("192.168.1.33", 9091);
sock.send("Socket quadras started");

this.bindFunc1 = function (zwayName) {
	if (zwayName != "zway") {
		return; // you want to bind to default zway instance
	}

	var devices = global.ZWave[zwayName].zway.devices;

	//from here insert your devices
	devices[4].SwitchBinary.data.level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_2," + status);
	});

	devices[7].SwitchBinary.data.level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_3," + status);
	});

	devices[27].SwitchBinary.data.level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_6," + status);
	});

	devices[26].SwitchBinary.data.level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_7," + status);
	});

	devices[6].SwitchBinary.data.level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_21," + status);
	});

	devices[28].SwitchBinary.data.level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_26," + status);
	});

	devices[32].SensorBinary.data[1].level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_32_0_1," + status);
	});

	devices[19].SensorBinary.data[1].level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_19_0_1," + status);
	});

	devices[35].SensorBinary.data[1].level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_30_0_1," + status);
	});

	devices[31].instances[1].SensorBinary.data[1].level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_15_1_1," + status);
	});

	devices[31].instances[2].SensorBinary.data[1].level.bind(function () {
		var status = (this.value) ? "on" : "off";
		sock.send("ZWay_15_2_1," + status);
	});

	devices[31].instances[3].SensorMultilevel.data[1].val.bind(function () {
		var status =  Math.round(this.value*10)/10;
		sock.send("ZWay_15_3_1," + status);
	});

	devices[31].instances[4].SensorMultilevel.data[1].val.bind(function () {
		var status =  Math.round(this.value*10)/10;
		sock.send("ZWay_15_4_1," + status);
	});

	devices[31].instances[5].SensorMultilevel.data[1].val.bind(function () {
		var status =  Math.round(this.value*10)/10;
		sock.send("ZWay_15_5_1," + status);
	});

	devices[31].instances[6].SensorMultilevel.data[1].val.bind(function () {
		var status =  Math.round(this.value*10)/10;
		sock.send("ZWay_15_6_1," + status);
	});

	devices[6].instances[0].Meter.data[2].val.bind(function () {
		var status = this.value;
		sock.send("ZWay_21_0_2," + status);
	});

	//ThermostatMode
	devices[33].ThermostatMode.data.mode.bind(function () {
		var mode = (this.value);
		var status = devices[33].ThermostatMode.data[mode].modeName.value;
		sock.send("ZWay_33_0_64," + status);
	});


	//Last device before this comment
};

// process all active bindings 
if (global.ZWave) {
  global.ZWave().forEach(this.bindFunc1);
}

// and listen for future ones
global.controller.on("ZWave.register", this.bindFunc1);
