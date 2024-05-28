---
layout: post
title: "Starting out in the world of IoT"
description: "What information I would have liked to have known before I started building my first IoT sensor and software"
category: Development 
author: phil_hardwick
tags: [IoT, Arduino, Node Red]
comments: true
share: true
---

IoT was a very daunting place for me when I started. After building an [IoT scale](http://www.instructables.com/id/IoT-Scale/), I'm now slightly more knowledgeable. It's been one of the most interesting bits of learning I've done for a while because you really get to understand how things work. 

## Arduinos
Lets start with the basics. I was using an [Arduino](https://www.arduino.cc/) board with an [Intel Grove Commercial kit](https://software.intel.com/en-us/iot/hardware/dev-kit). Arduinos are simple boards. They can be programmed in C and C++ with a very easy to use [online code editor](https://create.arduino.cc/editor) which compiles your sketch (a file with your custom code) and flashes your Arduino once compiled. Flashing is the process of writing your compiled code to the Arduino's memory. Flashing overwrites the last flashed binary i.e. you can only have one piece of software on the Arduino. [Grove](http://wiki.seeed.cc/Grove_System/) is a plug and play system of sensors which can be attached to a base shield. Intel supports these sensors out of the box. These sensors communicate with the Arduino via digital and analog pins. 

## Usage with Intel Platforms
The Online Arduino Platform and editor now has [support for Intel Platforms](https://create.arduino.cc/getting-started/intel-platforms) (e.g. an [Intel NUC](https://www.intel.com/content/www/us/en/products/boards-kits/nuc.html) or [Intel Up Squared](https://software.intel.com/en-us/iot/hardware/up-squared-grove-dev-kit)). This allows you to write and upload code to your Arduino without plugging it in to your computer i.e. through "the cloud". It even allows you to see what's running and, shock, allows you to run multiple sketches at one time. How does it do this black magic? Your code is actually running on the Intel platform your Arduino is plugged into, not on the Arduino itself. The Intel Platform flashes the Arduino with [Firmata](https://www.arduino.cc/en/Reference/Firmata) when it starts up (hence why Intel recommends you plug your Arduino into the Platform before it boots). Firmata is a protocol for communicating with the IO on the Arduino and so the multiple sketches running on the Platform actually just communicate with Arduino through the Firmata protocol. Flashing the Arduino with Firmata essentially makes it a Firmata server and your Intel Platform is a Firmata client.

Firmata allows high level IoT libraries such as [Johnny Five](http://johnny-five.io/) and the [Node Red](https://nodered.org/) nodes to execute on a computer but interact with a connected Arduino. 

The drawback of this is that the Firmata protocol has not implemented everything. It has support for a lot of whats needed - digital and analog reading and writing, serial communication, [I2C](https://en.wikipedia.org/wiki/I%C2%B2C) (which LCD screens use) etc. but some protocols aren't yet implemented - e.g. [SPI](https://en.wikipedia.org/wiki/Serial_Peripheral_Interface_Bus). This means you can't use the Intel Platform to run code for a [HX711](https://cdn.sparkfun.com/datasheets/Sensors/ForceFlex/hx711_english.pdf) (an analog to digital converter and amplifier) on a connected Arduino. In order to run something like the HX711 with an Intel Platform, the HX711 code has to run directly on the Arduino, avoid being flashed with Firmata (this requires either disabling the imraa service on the Intel Computer or plugging in the Arduino after the Intel machine has booted) and then using the Intel Platform as a simple gateway to the internet (rather than it running the Arduino sketches). This is because the Arduino can either run Firmata or it can run your compiled code from the Arduino web editor, not both. Firmata is required to use [Grove sensor plugins](https://github.com/intel-iot-devkit/node-red-contrib-upm) or Johnny Five, so be aware you can't use a mix of custom code and these high level libraries. This means you either only use sensors which are compatible with Firmata and therefore programmable in Node Red and Johnny Five or you get your hands dirty and write some c++.

## Debugging Techniques
While I was in the process of figuring out why the load cell of my IoT scale wasn't "just working", I learnt some things about physical debugging with a multimeter. This may seem obvious to some people but I'll spell it out here to be explicit and because it's interesting. Sensors are usually just changing electricity. They're actually brilliantly simple and clever. For example a potentiometer (essentially a knob) takes in some voltage and outputs some voltage. How much voltage is output is down to the how much the potentiometer is turned - turning the potentiometer is just increasing the resistance in the circuit. Code that interacts with the pot is simply measuring how much voltage is returned. Amazing. This equates to:

    reading = analogRead(A0);
    
`analogRead(pin)` is an Arduino function which reads from an analog pin and returns a number from 0-255. `A0` is an Arduino constant which corresponds to the 0th analog pin. As another example a load cell takes voltage in and outputs a very small amount of voltage based on how much the load cell is bent or compressed by using a [Wheatstone Bridge](https://en.wikipedia.org/wiki/Wheatstone_bridge) pattern of resistors. Genius in its simplicity. The millivolts of output are amplified (by something like a HX711) and fed back into the Arduino. 

All this means is that if you want to know if it's physically working, you can measure voltages, resistance and continuity at different points in the circuit. But remember: measure voltage while the Arduino and sensor are connected to power, and measure continuity and resistance when it's disconnected. Continuity and resistance checking injects an amount of voltage into the system which could overload the board or sensor.

Another interesting debugging technique is to [cat](http://www.man7.org/linux/man-pages/man1/cat.1.html) the output from the device if it writes to a serial port with `Serial.println("something");`. On a Mac, devices are attached to a file in `/dev/` on the filesystem (my Arduino was attached as `/dev/tty.usbmodem1421`) and you can see what's coming over by catting it: `cat /dev/tty.usbmodem1421`.

## Using Node Red
Connected flows of data can easily be created by using [Node Red](https://nodered.org/), a graphical integrator that allows nodes, which input data, output data or do both, to be linked together. To communicate with the Arduino I used the serial node which takes text from the usb communication. This can then be wired to an [MQTT](https://mqtt.org/) broker, transformed by functions or even trigger a transaction on a [Hyperledger Composer](https://hyperledger.github.io/composer/latest/) network. The Intel Gateway comes with Node Red installed to manage the Grove sensors so this can be configured to read from the packaged sensors and write to new endpoints.

## Conclusion
Experimenting with IoT has been a steep learning curve but what I've learnt has really intrigued me. Firstly, how clever some of the low level hardware we use everyday is: buttons, potentiometers, the underlying protocols for how they communicate. Secondly I've been amazed at the reliability of the Arduino, it's worked and booted flawlessly every time. I'd recommend exploring making some IoT sensors to anyone, hopefully this post will demystify some things and make the learning curve less steep.

## Further reading
* [Intel IoT Gateway Documentation](https://software.intel.com/en-us/iot/hardware/gateways/documentation)
* [A thorough walkthrough using the Intel Developer Kit with Azure](https://github.com/dxcamps/MicrosoftIntelIoTCamp/blob/master/HOLs/readme.md)
* [Johnny Five](http://johnny-five.io/)
* [MRAA the low level library used to interact with in-outs on boards](https://github.com/intel-iot-devkit/mraa/)
* [UPM, the library that uses MRAA, to give nicer high level APIs in multiple languages](https://github.com/intel-iot-devkit/upm)
