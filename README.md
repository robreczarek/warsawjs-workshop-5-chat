# warsawjs-workshop-5-chat
This project entailed building out a command line based chat app in Node.js and LevelDB

## How to install?
In order to install the app, you must first grab the code from the repository. Make sure you start out Once you switch to 
```bash
$ cd ~/
$ git clone https://github.com/robreczarek/warsawjs-workshop-5-chat.git && cd warsawjs-workshop-5-chat
$ yarn install
```

## How to start?
Make sure you are in the folder where the code was downloaded to before proceeding.
```
Server:
npm start

Client:
npm run client
```

## Available commands
```
/login user pass

/logout

/register user pass

/unregister user pass
```

## Requirements
Tested using the following versions of node and npm packages.
```
node: v7.6.0
bcrypt: 1.0.2,
js-yaml: 3.8.3,
level: 1.6.0,
socket.io: 1.7.3,
socket.io-client: 1.7.3,
then-levelup: 1.0.2
```


## How to test?
Just fire off the following command:
```
npm test
```

## Credits
Built this app with the guidance of Robert Kawecki [https://github.com/rkaw92](https://github.com/rkaw92) during the 5th Warsaw JS workshop.