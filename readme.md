# Butthead

Attempt to create a simple js transpiler for compilation and evaluation.

## Language Features

Currently

* File ends with _.bh_ rather than _.js_
* No variable can be reassigned- all variables are constants
* Constants should be arrays or functions, unless note keeping
* Declare constants that are not functions or arrays by `note:`
* Declare lines of code that do not assign constants by starting with `bh:`
* Logical operators `IS, ISNOT, OR, AND` supported
* FILTER has implicit parameters `d, i`
* MAP has implicit parameters `d, i`
* REDUCE has implicit parameters `acc, d, i`
* SORT has implicit parameters `a, b`
* Declare arrow functions with `->`
* Declare continuation of array functions with `|>`
* Log to console with `heybaby`
* Lines end in `!`

## To run

```
node butthead.js -c -e -f=example.bh -o=output.js
```

### Supported params

* _-c_ (Compile)
* _-e_ (Evaluate)
* _-f_ (Set file name to read) __REQUIRED__
* _-o_ (Set output file to write) For use in comp mode

_Note: You can compile and evaluate at the same time if so desired_
