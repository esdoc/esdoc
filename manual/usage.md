# Usage

## CLI

```json
{
  "source": "./src",
  "destination": "./doc"
}
```

```
esdoc -c esdoc.json
```

## API
```javascript
import ESDoc from 'esdoc/out/src/ESDoc.js';
import publisher from 'esdoc/out/src/Publisher/publish.js';

const config = {source: './src', destination: './doc'};

ESDoc.generate(config, publisher);
```

