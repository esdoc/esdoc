---
layout: "default"
isPage: true
---

# API
If you want to customize output, you can choose following way.

- Includes style sheet and script to output.
  - To see ``styles`` and ``scripts`` in [Config](config.html)
  - And you can use ``dump.json`` in ESDoc output directory.
- Uses ESDoc API and implements your publisher.

## Publisher
```javascript
import ESDoc from 'esdoc';

function publisher(results, config) {
  console.log(results);
}

ESDoc.generate(config, publisher);
```

## Internal Data
TODO: describe internal data.

## Custom Tag
TODO: describe custom tag.

