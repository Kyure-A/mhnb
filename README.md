# Maneging Homework and Notifying Bot for Discord

## Description
This Discord Bot is designed to manage homework assignments on the class Discord server.

## Demo

### /create

### /list

### /delete
Under construction

## Requirement
- Node.js
- yarn 
- Typescript
- Clasp (Command Line Apps Script Projects)
- Glitch Application

## Usage
Enter your .clasp.json in /gas in the following format:

``` json
{
    "scriptId": "INSERT YOUR SCRIPT ID",
    "rootDir": "./dist/"
}
```

## Notes for push
We need to push /glitch to Glitch's Git repo, so we import /glitch as a subtree. Therefore, when you push commits, you need to push them to Glitch in addition to the usual GitHub push.

``` shell
git push origin master
git subtree push --prefix=glitch glitch master
```

The *.js file on the Glitch side is deleted at this time, so execute the following on the Glitch console.

``` shell
tsc

refresh
```
After this, execute the following commands on the PC side (do not mind that useless commits are generated to prevent conflicts)

``` shell
git subtree pull --prefix=glitch --squash glitch master

```
