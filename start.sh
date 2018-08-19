#!/bin/bash
node=public.turtlenode.io

clear
echo ""
echo ""
echo -n "Enter Wallet Name: "
read walletname
echo -n "Enter Wallet Password: "
read walletpassword


create_new_wallet () {
  ./scripts/turtle-service -g -w ./scripts/$walletname -p $walletpassword --rpc-password test --daemon-address $node --enable-cors "*"
}

start_turtle_service () {
  ./scripts/turtle-service -w ./scripts/$walletname -p $walletpassword --rpc-password test --daemon-address $node --enable-cors "*" &
}

start_box_turtle () {
  xdg-open ./scripts/index.html
}

if [ -e "./scripts/${walletname}" ]
then
  start_turtle_service
  start_box_turtle
else
  create_new_wallet
  start_turtle_service
  start_box_turtle
fi;
