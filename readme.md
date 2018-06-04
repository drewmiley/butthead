# Butthead

Attempt to create a simple js transpiler for compilation and evaluation.

## Language Features

Currently

* File ends with _.bh_ rather than _.js_
* Declare constants with `bh`

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
