#!/usr/bin/env bash

rpc="test"
node="public.turtlenode.io"

trap "killall -TERM turtle-service  > /dev/null 2>&1; echo bye;exit 0" SIGINT SIGTERM

# stop existing turtle-service process, if any
killall -TERM turtle-service > /dev/null 2>&1
sleep 1

read -p "Enter Wallet Name: " user
echo -n "Enter Wallet Password: " 
read -s pass

if [[ -e "scripts/${user}" ]];then
  ./scripts/turtle-service \
      -w ./scripts/${user} \
      -p "${pass}" \
      --rpc-password test \
      --daemon-address ${node} \
      --enable-cors '*' --daemon
else
  ./scripts/turtle-service -g -w ./scripts/${user} -p "${pass}" --rpc-password test --daemon-address ${node} --enable-cors '*'
  sleep 1
  ./scripts/turtle-service \
      -w ./scripts/${user} \
      -p "${pass}" \
      --rpc-password test \
      --daemon-address ${node} \
      --enable-cors '*' --daemon
fi

sleep 5

# don't run the browser if turtle-service is failed to start (wrong pass, etc)
SVC=$(ps ax|grep turtle-service|grep -v grep)
if [[ ! -z "$SVC" ]];then
  echo "turtle-service is running as daemon, hit ctrl+c to stop"
  xdg-open ./scripts/index.html
  while true
  do
      sleep 2
  done
fi
