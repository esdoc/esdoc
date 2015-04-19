#!/bin/bash

./script/build.sh

mocha_option="-t 5000 --require ./test/src/espower-loader.js --recursive ./out/test/src -R spec"

if [ "$TRAVIS" == "1" ]
then
    # if node is realy node, send coverage. but if node is io.js, does not send coverage.
    node -v | grep 'v0.12' > /dev/null
    if [ $? -eq 0 ]
    then
        ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha --report lcovonly -- $mocha_option && cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js
    else
        ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha  -- $mocha_option
    fi
elif [ "$1" == "coverage" ]
then
    ./node_modules/.bin/istanbul cover ./node_modules/mocha/bin/_mocha  -- $mocha_option
else
    ./node_modules/.bin/mocha $mocha_option
fi
