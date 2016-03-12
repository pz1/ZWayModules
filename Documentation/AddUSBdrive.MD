##Add USB drive storage
This recipe assumes the USB stick will be permanently attached to RaspberryPi as the *only* memory stick. If you want to do it differently, have a look into the links to my sources provided below.    
####Format USB drive [(Reference)](http://thepihut.com/blogs/raspberry-pi-tutorials/17699796-formatting-and-mounting-a-usb-drive-from-a-terminal-window)    
First determine the *id* of your device by (removing and re)-connecting the USB drive. Next give command     
** ls -l /dev/sd* **    
It is named something like *sda, sdb*, etc. For the further description I use **sda**    
If you have not yet done so **partition** this USB stick

**sudo fdisk /dev/sda**    

When prompted for a command do the following    

**d** (= delete existing partion)    
**n** (= create new partition. On all questions choose the default, so just ENTER)    
**w** (= write new partiton and exit)

Now, **create a filesystem** using:

**sudo mkfs -t vfat -I /dev/sda1**    

*The vfat format makes it possible to also read this USB Drive on a windows PC*

####Test added the USB drive [(Reference)](http://elinux.org/RPi_Adding_USB_Drives)

create a mounting point for your USB drive    

**sudo mkdir /mnt/usbstick**    

You can now manually mount the the USB drive

**sudo mount /dev/sda1 /mnt/usbstick -o umask=000**

####Let log files be written to USB
To assure that the drive is automatically available after every reboot, add the last line to /etc/fstab

**sudo nano /etc/fstab**    
```
proc            /proc           proc    defaults          0       0
/dev/mmcblk0p1  /boot           vfat    defaults          0       2
/dev/mmcblk0p2  /               ext4    defaults,noatime  0       1
# a swapfile is not a swap partition, no line here
#   use  dphys-swapfile swap[on|off]  for that
/dev/sda1	/var/log	vfat	rw,defaults       0       0
```
####Remove USB drive
To remove the USB drive you first stop the Raspberry Pi. 
(I don't what the consequences for the log files are, if you stop the USB drive with  
**sudo umount /dev/sda1**