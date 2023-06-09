# Maneging Homework and Notifying Bot for Discord

## Description
This Discord Bot is designed to manage homework assignments on the class Discord server.

## Demo

### /create
![Demo_create_1](https://github.com/Kyure-A/mhnb/assets/49436968/1cba7588-9619-4298-a4a3-20250896df5e)
![Demo_create_2](https://github.com/Kyure-A/mhnb/assets/49436968/e63ed7a9-9abc-4263-b319-ed431e03b92b)

### /list
![Demo_list](https://github.com/Kyure-A/mhnb/assets/49436968/2e21291f-caec-49d4-8c55-5a81de7a4073)

### /delete
![Demo_delete](https://github.com/Kyure-A/mhnb/assets/49436968/57519d59-e321-4946-b1c1-15e50121d0be)

### /edit
![Demo_edit_1](https://github.com/Kyure-A/mhnb/assets/49436968/86d13054-607a-4c6f-af27-d483b31bb0da)
![Demo_edit_2](https://github.com/Kyure-A/mhnb/assets/49436968/04e1bd58-b9f2-425e-a7a1-5252ec0d9df5)


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
