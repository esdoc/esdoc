#!/bin/bash

mocha_option="-t 5000 --require ./node_modules/babel/register.js --recursive ./test/src -R spec"

if [ "$TRAVIS" == "1" ]
then
    ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- $mocha_option && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
elif [ "$1" == "coverage" ]
then
    ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha  -- $mocha_option
else
    ./node_modules/.bin/mocha $mocha_option
fi
