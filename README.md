# Maneging Home work and Notifying Bot for Discord

## Description

## Usage
Please create a .clasp.json file in the following format:

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

