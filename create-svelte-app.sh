#!/bin/bash

echo This will create a new Svelte app in this directory.;
echo "";
echo What is the name of your app?;
read appName
PS3="Would you like to use Svelte or Sveltekit for $appName? ";
select choice in Svelte Sveltekit
do
  case $choice in
    "Svelte")
      rm readme.md
      npm create vite@latest $appName -- --template svelte
      break;;
    "Sveltekit")
      rm readme.md
      npm create svelte@latest $appName
      break;;
    *)
      echo invalid input;
  esac
done

cp -r $appName/* .
rm -rf $appName
npm install