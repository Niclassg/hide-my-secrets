# hide-my-secrets README

A VSCode extension for hiding secrets in the editor

## Features

Hide you secrets in vscode. Useful if recording or streaming. You can define multiple regexes you want to match on.

## Extension Settings

This extension contributes the following settings:

* `hide-my-secrets.words`: Keywords or regex to match when parsing the active document

* `hide-my-secrets.hideSecrets`: Whether or not to hide secrets

## Known Issues

* A line immediately after a hidden secret will also be hidden if starting to write in it until retoggling

## Release Notes

### 0.0.1

Initial release of hide-my-secrets
