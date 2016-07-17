# Example

## Minimum
```json
{
  "source": "./src",
  "destination": "./doc"
}
```

## Integrate Test Code Into Documentation
```json
{
  "source": "./src"
  "destination": "./doc",
  "test": {
    "type": "mocha",
    "source": "./test"
  }
}
```

And if use ``@test``, more better integration.

```javascript
/** @test {MyClass} */
describe('MyClass has foo bar feature', ()=>{

  /** @test {MyClass#baz} */
  it('MyClass#baz returns magic value', ()=>{
    assert(true);
  });
});
```

## Integrate Manual Into Documentation
```json
{
  "source": "./src",
  "destination": "./doc",
  "manual": {
    "overview": ["./manual/overview.md"],
    "installation": ["./manual/installation.md"],
    "usage": ["./manual/usage.md"],
    "example": ["./manual/example.md"],
    "faq": ["./manual/faq.md"],
    "changelog": ["./CHANGELOG.md"]
  }
}
```

## Use ES7 With Plugin
```sh
npm install esdoc-es7-plugin
```

```json
{
  "source": "./src",
  "destination": "./doc",
  "plugins": [
    {"name": "esdoc-es7-plugin"}
  ]
}
```

See [ESDoc ES7 Plugin](https://github.com/esdoc/esdoc-es7-plugin) for more information.
