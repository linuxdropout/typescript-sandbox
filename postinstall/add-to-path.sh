#!/bin/bash

executablePath="$(pwd)/.bin"
matchLine=$(echo "$PATH" | grep $executablePath)

if [ -z "$matchLine" ]
then
  echo "Appending PATH=\$PATH:$executablePath to ~/.bashrc"
  echo "export PATH=\$PATH:$executablePath" >> ~/.bashrc
  export PATH="$PATH:$executablePath"
else
  echo "$executablePath is already in PATH, doing nothing"
fi
