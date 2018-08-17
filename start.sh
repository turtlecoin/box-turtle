#!/usr/bin/env bash

rpc="test"
read -p 'Enter Wallet Name: ' user
read -p 'Enter Wallet Pass: ' pass

if [[ -e "scripts/${user}" ]];then
  echo "file exists"
  ./scripts/turtle-service.exe -w ./scripts/${user} -p "${pass}" --rpc-password test --daemon-address public.turtlenode.io --enable-cors '*'
  xdg-open ./scripts/index.html
else
  echo "file doesn't exist"
  ./scripts/turtle-service.exe -g -w ./scripts/${user} -p "${pass}" --rpc-password test --daemon-address public.turtlenode.io --enable-cors '*'
  sleep 1
  ./scripts/turtle-service.exe -w ./scripts/${user} -p "${pass}" --rpc-password test --daemon-address public.turtlenode.io --enable-cors '*'
  xdg-open ./scripts/index.html
fi
