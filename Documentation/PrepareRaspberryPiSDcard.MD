####Objective
To prepare a basic SD card image tailored to your needs. This image should be stored safely, to enable rapid rebuilds of your system.    
   
If you do not intend to use keyboard and screen with your raspberryPi, download **Rasbian-jessie-lite** from [raspberrypi.org](https://www.raspberrypi.org/downloads/raspbian/), otherwise take the full version.
Write image to SD card with [Win32diskimager](https://sourceforge.net/projects/win32diskimager/) or similar
Insert SDcard in Raspberry (and if not yet done so Zwave>me RaZberry or UZB1) while disconnected. 
Apply power, and wait two minutes or so to let the system start.    
*note: The lite version does not have a GUI, and hence has a considerable smaller image. It does boot in command line mode.    
Apart from the GUI it also lacks at least *node.js, and node-red*

Login to your RaspberryPi with [Putty](http://www.putty.org/) or similar secure client. Give the following two commands:   

**sudo apt-get update**   
**sudo apt-get dist-upgrade**   

Do a basic configuration with:   
**sudo raspi-config**   
There:
- Do Expand File system
- Change User Password (choose safe password!)
- Internationalisation
     - Set your TimeZone   

Optional if you have more than one Raspberrypi do a rename:
- Advanced
     - Hostname   
   
**Finish** this configurator, and do NOT YET **reboot**.

####Reduce unnecesary write actions on SDCard (Optional)
######Disable swapping   
   
**sudo dphys-swapfile swapoff**    
**sudo dphys-swapfile uninstall**    
**sudo update-rc.d dphys-swapfile remove**    
[from this article](http://www.ideaheap.com/2013/07/stopping-sd-card-corruption-on-a-raspberry-pi/)

######Write log files to USB-stick (NEVER REMOVE THIS STICK WHILE RASPBERRY PI IS RUNNING)
Because I want logs after crashes, I decided against writing to 'ramdisk'. There also seems no need to map \var\run to ramdisk in fstab. If you do a **df -h** on a bare rasbian-jessie install there seems to be a symbolic link to memory already for it en some other spaces.    
This recipe assumes the USB stick will be permanently attached to RaspberryPi as the *only* memory stick.
  
First determine the *id* of your device by (removing and re)-connecting the USB drive. Next give command     
**ls -l /dev/sd***    
You may find something like *sda, sdb*, etc. For the further description I do use **sda**    
It seems best to **re-format** the USB-stick

**sudo fdisk /dev/sda**    

When prompted for a command do the following    

**d** (= delete existing partion)    
**n** (= create new partition. On all questions choose the default, so just ENTER)    
**w** (= write new partiton and exit)

Now, **create a filesystem** using:

**sudo mkfs -t vfat -I /dev/sda1**    

*The vfat format makes it possible to also read this USB Drive on a windows PC*    

 **sudo nano /etc/fstab**    

 Add the last line to this file, so the USB-stick is automatically mounted at start-up. Make the **/boot** partition *read_only*, and add the noatime flag to it 
```
proc            /proc           proc    defaults          0       0
/dev/mmcblk0p1  /boot           vfat    ro,noatime        0       2
/dev/mmcblk0p2  /               ext4    defaults,noatime  0       1
/dev/sda1	    /var/log	    vfat	rw,defaults       0       0
``` 
  
#### Install drivers for UPS Pico (Optional)      
UPS Pico is a power backup system that dependent on the used battery can cope with power outages of a few minutes to a couple of hours.    
[UPS Pico site](http://www.pimodules.com/). The [Simple installation guide](http://www.pimodules.com/_pdf/Simple_Setting_Guide_for_the_UPS_PIco.pdf) is the least confusing, and is sufficiant in most cases.    
\<to be completed\>     
#### Install WiringPi (Optional)
I do use this module for controlling some device via the GPIO    
[WiringPi site](http://wiringpi.com/)       
\<to be completed\>     
#### Install OpenRemote (Optional)    
I do use [OpenRemote](http://www.openremote.org/x/nwFWAQ) as visualisation and integration platform for two ZWay satellites. At present it runs on a NAS    
This installation is probably only usefull to do on a RaspberryPi 2    
\<to be completed\>    
*** 
#### Finalise installation   
Install a stable Zway version, followed by a restart of the raspberrypi.  
**wget -q -O - razberry.z-wave.me/install/v2.2.1 | sudo bash**   
**sudo reboot**

Recommendation: Now make a copy of your SDcard to serve as a base image for future rebuilds. Issue commands:    
**sudo service z-way-server stop**     
**sudo shutdown -h now**    
And wait 3 minutes before disconnecting the power.
***
**With W32diskimager copy this basic image to permanent safe storage**
***

