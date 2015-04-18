---
layout: "default"
isPage: true
---

# Customize
if you want to customize output, can choose following way.

- includes style sheet and script to output.
  - see ``styles`` and ``scripts`` in [Config](config.html)
- uses ESDoc API and implements your publisher.

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

