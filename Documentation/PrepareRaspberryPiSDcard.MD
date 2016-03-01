####Objective
To prepare a basic SD card image tailored to your needs. This image should be stored safely, to enable rapid rebuilds of your system.    
   
If you do not intend to use keyboard and screen with your raspberryPi, download **Rasbian-jessie-lite** from [raspberrypi.org](https://www.raspberrypi.org/downloads/raspbian/), otherwise take the full version.
Write image to SD card with [Win32diskimager](https://sourceforge.net/projects/win32diskimager/) or similar
Insert SDcard in Raspberry (and if not yet done so Zwave>me RaZberry or UZB1) while disconnected. 
Apply power, and wait two minutes or so to let the system start.    
*note: The lite version does not have a GUI, and hence has a considerable smaller image. It does boot in command line mode*

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
   
**Finish** this configurator, and let it **reboot**. 

Next install a stable Zway version followed by a restart of the raspberrypi.  
**wget -q -O - razberry.z-wave.me/install/v2.2.1 | sudo bash**   
**sudo reboot**   
***   
#### Use ramdisk for log files (Optional)    
To reduce SD card wear, create a ramdisk for some heavily used directories.    
**Nota bene:** after power off the contents of these files are lost.     

**sudo nano /etc/fstab**   
Append following two lines at the bottom of file _fstab_:
```
tmpfs /var/log tmpfs defaults,noatime,nosuid,mode=0755,size=128m 0 0
tmpfs /var/run tmpfs defaults,noatime,nosuid,mode=0755,size=8m 0 0
```
Save with [CTRL]-O, and is successful exit with [CTRL]-X    
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
Restart your Raspberrypi:   
**sudo reboot**

Recommendation: Now make a copy of your SDcard to serve as a base image for future rebuilds. Issue commands:    
**sudo service z-way-server stop**     
**sudo shutdown -h now**    
And wait 3 minutes before disconnecting the power.
***
**With W32diskimager copy this basic image to permanent safe storage**
***

