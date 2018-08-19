# box-turtle
### web wallet in a box 

Note: Don't port forward your wallet, or you will lose everything. If you dont know what port forwarding is, you dont have to worry.

![image](https://user-images.githubusercontent.com/34389545/41516136-7ff3acf4-72a2-11e8-8241-7afb6daa9c12.png)
--

You can see a demo of what your wallet will look like [Here](https://box-turtle.turtle-coin.com/)

If you have never made a TRTL wallet, download the latest release of [TurtleCoin](http://latest.turtlecoin.lol) and move the `turtle-service` file to the same folder as your box turtle. Then, you can generate a new wallet by copy and pasting these commands:

Note: If you need help with any of these steps, head on down to the [Official TurtleCoin discord server](http://chat.turtlecoin.lol)! They are very friendly and will gladly help you.

### Windows:
On Windows, all you have to do is run the start.bat file!

### Linux/Mac:
On Linux/Mac, all you have to do is run the `start.sh` file!

## TL;DR
This setup guide tells you how to go from zero to running a full TurtleCoin wallet in no time!

### Additional Information

Alternatively, you can use `--daemon-address 127.0.0.1` to use a local TurtleCoind you've got open.

If you want to change the RPC password, set it in the config.js file and in the `--rpc-password` 

Make sure you are using a version of turtle-service that supports the `--enable-cors` arg, launch walletd with `--help` to verify.