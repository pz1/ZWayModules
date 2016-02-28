## Introduction
Home automation is not just a toy, but a [mission critical](https://en.wikipedia.org/wiki/Mission_critical) application. So proper backup and restore procedures are very important. You can create different levels of protection, ranging from just saving files, to keeping a working copy on an SD card or even a cloned complete working RaspberryPi installation. Be aware that it is best to do backup/restore with the same ZWay software versions.

## Backup
Routinely backup the following:
- With the Expert User Interface **Network/Control/Create Backup**
- With SmartHome, click tools icon in top right corner **Management/Backup**.   
- Save all third party Apps(/opt/z-way-server/automation/userModules) on a solid storage medium. Even though they may get recovered automatically in the future, you still may later not be able to access a specific version of your favourite module.    

**Nota Bene:** After you have included/excluded Z-Wave devices, do make a backup with Expert UI, so you can make a complete restore if your system controller(RaZberry,UZB1) is corrupted/dead.

## Restore
The prerequisite for a restore is that your Z-Wave controller is undamaged and still has all devices included. If not, or if you want to run your installation on different hardware, do follow the Clone procedure.    
- In most cases it suffices if you do the restore via the Smart Home user interface. Even if your Expert UI looks terribly mixed-up. Click tools icon in top right corner **Management/Restore**.     
- If you are unsuccessfull with the first step, reboot Raspberry Pi, and after some 5 minutes go to the Expert User Interface and see if you have lost any Z-Wave device settings. If so do a limited restore with **Network/Control/Restore** (don't tick the second check box)   
![](https://github.com/pz1/ZWayModules/blob/master/Restorelimited.PNG)   
- If you do encounter problems with third party Apps, do copy your backed-up userModules to /opt/z-way-server/automation/userModules. Restart Z-Way with WebIF (http://Raspberrypi_IP:8084).    

## Clone   
The following steps describe how to rebuild from existing backup files a functional copy for a (dis)similar system. The procedure was tested on backup sources from a _RaspberryPi B with RaZberry_ add-on, to a target _RaspberryPi 2 with UZB1_ stick.    
- Make sure that a Z-Wave controller is connected to the Pi.    
- If you have not yet done so, [prepare a SD card](https://github.com/pz1/ZWayModules/wiki/Prepare-RaspberryPi), insert it and fire up the raspberry pi.
- Copy your backed-up userModules to /opt/z-way-server/automation/userModules.    
- Login to SmartHome, and via the tools icon in the top right corner of the screen select Apps. Choose the Active TAB and select the Z-Wave module. If you do use the RaZberry add on, leave the port on the predefined */dev/ttyAMA0*, if you have UZB1 to set it to */dev/ttyACM0* 
- Because in this procedure you have to copy your devices to a new controller, you **must** do a full restore with the Expert User Interface. So erform a **Network/Control/Restore** and **do tick both** checkboxes.    
![](https://github.com/pz1/ZWayModules/blob/master/RestoreFull.PNG)   

- If you do use SmartHome, click tools icon in top right corner **Management/Restore**. Do tick the checkbox there.    