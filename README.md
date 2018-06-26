# box-turtle
### web wallet in a box - Dont expose this to the internet or you'll lose everything. 

![image](https://user-images.githubusercontent.com/34389545/41516136-7ff3acf4-72a2-11e8-8241-7afb6daa9c12.png)
--

Start up walletd:

`./walletd -w YOURWALLET.wallet -p YOURPASSWORD --rpc-password test --daemon-address public.turtlenode.io --enable-cors "*"`

Alternatively, you can use --daemon-address 127.0.0.1 to use a local TurtleCoind you've got open.

If you want to change the RPC password, set it in the config.js file.

Make sure you are using a version of walletd that supports the --enable-cors arg, launch walletd with --help to verify.

- [ ] TODO: Add last 10 transactions
- [ ] TODO: Payment ID's
- [ ] TODO: Get users address
- [ ] TODO: Move HOST and PORT to a hidden DIV exposed by clicking the Turtle or a hamburger or something.
