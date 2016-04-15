#### Objective
To prepare a basic SD card image tailored to your needs. This image should be stored safely, to enable rapid rebuilds of your system.    

For the initial setup
   
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
   
**Finish** this configurator, but do NOT YET **reboot**. First install any of the options:    
A <a href="#disableSwap">Remove Swapfile</a>.    
B <a href="#logToUsb">Write log files to USB-stick</a>.    
C <a href="#UpsPico">Install UPS Pico</a>.    
D <a href="#wiringPi">WiringPi</a>.    
E <a href="#OpenRemote">OpenRemote</a>.    
<a href="#Finalise">Finalise</a>.    
***
#### Reduce unnecesary write actions on SDCard (Optional)
###### <a name="disableSwap"></a>Disable swapping


**sudo dphys-swapfile swapoff**    
**sudo dphys-swapfile uninstall**    
**sudo update-rc.d dphys-swapfile remove**    
[See background info](http://www.ideaheap.com/2013/07/stopping-sd-card-corruption-on-a-raspberry-pi/)
***
<a name="logToUsb"></a>    
###### Write log files to USB-stick (NEVER REMOVE THIS STICK WHILE RASPBERRY PI IS RUNNING)

Because I want logs after crashes, I decided against writing to 'ramdisk'. There also seems no need to map \var\run to ramdisk in fstab. If you do a **df -h** on a bare rasbian-jessie install there seems to be a symbolic link to ramdisk already for \var\run and some other spaces.    
This recipe assumes the USB stick will be permanently attached to RaspberryPi as the *only* memory stick.
  
First determine the *id* of your device by (removing and re)-connecting the USB drive, and give command:     
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

 Add the last line to this file, so the USB-stick is automatically mounted at start-up. Make the **/boot** partition *read_only*, and add the noatime flag to it.    
  **WARNING** Once you have rebooted, you may no longer be able to change some settings with *raspi-config*. For example in UPS Pico setup! 
```
proc            /proc           proc    defaults          0       0
/dev/mmcblk0p1  /boot           vfat    ro,noatime        0       2
/dev/mmcblk0p2  /               ext4    defaults,noatime  0       1
/dev/sda1       /var/log        vfat    rw,defaults       0       0
``` 
We should make this usage of the USB stick a little more robust by not referring to it's path (/dev/sda1), but by using it's unique ID. Then it no longer matters in which USB socket you plug that device. Get the ID as follows:    

**ls -laF /dev/disk/by-uuid/**    

You will find something like this **4AF7-9955 -> ../../sda1**  on the screen. Do use that as follows in the last line of fstab
```
proc            /proc           proc    defaults          0       0
/dev/mmcblk0p1  /boot           vfat    ro,noatime        0       2
/dev/mmcblk0p2  /               ext4    defaults,noatime  0       1
UUID=4AF7-9955  /var/log	    vfat	rw,defaults       0       0
``` 

After completion of this installation the file system looked like this.    
```
pi@rasppi2:~ $ df -hT
Filesystem     Type      Size  Used Avail Use% Mounted on
/dev/root      ext4      7.3G  970M  6.0G  14% /
devtmpfs       devtmpfs  459M     0  459M   0% /dev
tmpfs          tmpfs     463M     0  463M   0% /dev/shm
tmpfs          tmpfs     463M  6.2M  457M   2% /run
tmpfs          tmpfs     5.0M  4.0K  5.0M   1% /run/lock
tmpfs          tmpfs     463M     0  463M   0% /sys/fs/cgroup
/dev/mmcblk0p1 vfat       60M   20M   41M  34% /boot
/dev/sda1      vfat       15G   12M   15G   1% /var/log
```
 All tmpfs settings were already done in the rasbian-jessie-lite distro! Note: In the above listing, swap file has not yet been disabled.    
***
<a name="UpsPico"></a>    
#### Install drivers for UPS Pico HV1.1 on Raspberry Pi 2(Optional)  
*work in progress, to be completed*    
*Prerequisite* Make sure you have a stable 3A power supply for your Raspberry Pi. At start-up with Pico UPS installed, current may exceed 2A ! Also make sure no other applications (e.g. via wiringPi) use GPIO_22 and GPIO_27.        
UPS Pico is a power backup system that dependent on the used battery can cope with power outages of a few minutes to a couple of hours.    
[UPS Pico site](http://www.pimodules.com/). The [Simple installation guide](http://www.pimodules.com/_pdf/Simple_Setting_Guide_for_the_UPS_PIco.pdf) is the least confusing, and is sufficient in most cases.    
Follow the simple manual from page 7. The commands are written down below, because at the moment you can't copy them from the manual:    
**sudo raspi-config**    
```
Advanced Options    
  A7 ARM I2C interface enable    
      I2C interface kernel module loaded by default    
  A8 Serial enable    
```	
**sudo apt-get install python-rpi.gpio**    
**sudo apt-get install python-smbus**    
**sudo apt-get install i2c-tools**    
**sudo nano /etc/modules**    
*If not yet specified add the following line(s):*    
```
i2c-bcm2708
i2c-dev
```
**sudo reboot**    
**sudo i2cdetect -y 1**        
**sudo wget http://www.pimodules.com/_zip/UPS_Pico_Supporting_Files.zip**  (Manual still has wrong URL)    
**unzip UPS_Pico_Supporting_Files.zip**    
**sudo python /home/pi/picofssd.py** (no LEDS flashing yet. Did not yet get past this because of GPIO conflict with wiringPi ?)    
**sudo python /home/pi/picofssd.py &**
**sudo nano /etc/rc.local**    
*Copy following text just before* ***exit 0***
```
#Run UPS Pico FSSD script and load the included emulated RTC
sudo python /home/pi/picofssd.py &

echo ds1307 0x68 > /sys/class/i2c-adapter/i2c-1/new_device
( sleep 4; hwclock -s ) &
```    

*work in progress, to be completed* 


If you want to remove the UPS Pico from your Raspberry Pi, shut it down properly    
**sudo shutdown -h now**    
remove the external power source from it. Next    
**push the **UPSR** button (second button from the left) for about 1 second**
Carefully pull the device from the Raspberry Pi       
***
<a name="wiringPi"></a>    
#### Install WiringPi (Optional; Jessie full version has it by default)
For controlling devices via the GPIO, the wiringPi modules has proven to be useful (at least for me).    
Via a web browser find the link to the [latest build of wiringPi](http://wiringpi.com/download-and-install/) (scroll down to: Plan B). Download it to your PC, and copy from there to the Raspberry Pi. (A direct wget seemed more logical, but I could not get it to work, like many other users)
   
On your Raspberry Pi extract and install wiringPi. (The identifier b0a60c3 is part of the downloaded file name)     
```
tar xfz wiringPi-b0a60c3.tar.gz
cd wiringPi-b0a60c3
./build
```       
To check the installation, try the following two commands:    
```
gpio -v
gpio readall
```
***
<a name="OpenRemote"></a>    
#### Install OpenRemote (Optional)    
I do use [OpenRemote](http://www.openremote.org/x/nwFWAQ) as visualisation and integration platform for two ZWay satellites. At present it runs on a NAS    
This installation is probably only usefull to do on a RaspberryPi 2    
ToDo    
*** 
<a name="Finalise"></a>    
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

