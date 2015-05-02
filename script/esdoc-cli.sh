#!/usr/bin/env bash
self="$(pwd)/$0"
self_dir=$(dirname $self)
root="$self_dir/../"
esdoc="$root/src/ESDocCLI.js"
babel="$root/node_modules/.bin/babel-node"

$babel $esdoc $@
