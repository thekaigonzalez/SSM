# The SSM Interpreter

```
hello world 1 2

hello world 2 3
``` 

Would return a syntax tree of 

```js
[
  {
    type: 'FUNCTION_CALL',
    func_name: 'hello',
    arg: [ 'world', '1', '2' ]
  },
  {
    type: 'FUNCTION_CALL',
    func_name: 'hello',
    arg: [ 'world', '2', '3' ]
  }
]
```