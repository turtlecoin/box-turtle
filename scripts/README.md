# box-turtle
### web wallet in a box 


Note: Don't port forward your wallet, or you will lose everything. If you dont know what port forwarding is, you dont have to worry.

![image](https://user-images.githubusercontent.com/34389545/41516136-7ff3acf4-72a2-11e8-8241-7afb6daa9c12.png)
--

You can see a demo of what your wallet will look like [Here](https://box-turtle.turtle-coin.com/)

If you have never made a TRTL wallet, download the latest release of [TurtleCoin](http://latest.turtlecoin.lol) and move the `walletd` file to the same folder as your box turtle. Then, you can generate a new wallet by copy and pasting these commands:


Note: If you need help with any of these steps, head on down to the [Official TurtleCoin discord server](http://chat.turtlecoin.lol)! They are very friendly and will gladly help you.

Linux/Mac:
`./walletd -g -w YOURWALLET.wallet -p YOURPASSWORD --rpc-password test --daemon-address public.turtlenode.io --enable-cors "*"`


Windows:
`walletd.exe -g -w YOURWALLET.wallet -p YOURPASSWORD --rpc-password test --daemon-address public.turtlenode.io --enable-cors "*"`


Note: Make sure to change `YOURWALLET.wallet` and `YOURPASSWORD` to a name and password you will remember.


Using the wallet name and password from above, Start up walletd:


Linux/Mac:
`./walletd -w YOURWALLET.wallet -p YOURPASSWORD --rpc-password test --daemon-address public.turtlenode.io --enable-cors "*"`


Windows:
`walletd.exe -w YOURWALLET.wallet -p YOURPASSWORD --rpc-password test --daemon-address public.turtlenode.io --enable-cors "*"`


Then, all you have to do, is double click the `index.html` file, and you should be all set!


Note: If you ever shutdown the terminal process, the wallet will stop working. You can start it back up by entering the second command, replacing the `YOURWALLET` and `YOURPASSWORD` with your wallet name and password.



## TL;DR
This setup guide tells you how to go from zero to running a full TurtleCoin wallet in no time!


### Additional Information


Alternatively, you can use `--daemon-address 127.0.0.1` to use a local TurtleCoind you've got open.


If you want to change the RPC password, set it in the config.js file and in the `--rpc-password` 


Make sure you are using a version of walletd that supports the `--enable-cors` arg, launch walletd with `--help` to verify.


