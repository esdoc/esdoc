---
layout: "default"
isPage: true
---

# Customize
If you want to customize output, can choose following way.

- Includes style sheet and script to output.
  - To see ``styles`` and ``scripts`` in [Config](config.html)
  - And can use ``dump.json`` in ESDoc output directory.
- Uses ESDoc API and implements your publisher.

# API
```javascript
import ESDoc from 'esdoc';

function publisher(results, config) {
  console.log(results);
}

ESDoc.generate(config, publisher);
```

# Internal Data Structure
TODO: explain data.

# Custom Tag
TODO: explain custom tag.

