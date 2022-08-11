# hide-my-secrets README

A VSCode extension for hiding secrets in the editor

Link: [Extension](https://marketplace.visualstudio.com/items?itemName=Niclassg.niclassg-hide-my-secrets)

## Features

Hide you secrets in vscode. Useful if recording or streaming. You can define multiple regexes you want to match on.

## Extension Settings

This extension contributes the following settings:

* `hide-my-secrets.words`: Keywords or regex to match when parsing the active document

* `hide-my-secrets.hideSecrets`: Whether or not to hide secrets

## Known Issues

* A line immediately after a hidden secret will also be hidden if starting to write in it until retoggling
* Toggling using the command doesn't work correctly. For some reason updating the configuration doesn't take effect until the active window is reloaded. Using the option in the settings ui or settings.json works as intended.

## Contributions welcome!

## Release Notes

### 0.0.1

Initial release of hide-my-secrets

### 0.0.2

Hiding is now true by default
