@echo off
SET rpc="test"

set /P user=Enter Wallet name: 
set /P pass=Enter Wallet Pass: 

if exist scripts\%user% (
    echo file exists
    start cmd.exe /k "scripts\turtle-service.exe" -w scripts\%user% -p %pass% --rpc-password test --daemon-address public.turtlenode.io
    start "" index.html
) else (
    echo file doesn't exist
	start cmd.exe /k "scripts\turtle-service.exe" -g -w scripts\%user% -p %pass% --rpc-password test --daemon-address public.turtlenode.io
	ping -n 3 127.0.0.1 > nul
	start cmd.exe /k "scripts\turtle-service.exe" -w scripts\%user% -p %pass% --rpc-password test --daemon-address public.turtlenode.io
    start "" index.html
)