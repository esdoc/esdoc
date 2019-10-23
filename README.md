# ESDoc

Fork of ESDoc with up-to-date dependencies

# Quick Start

```sh
# Move to a your project directory.
cd your-project/

# Install ESDoc and standard plugin.
npm install --save-dev @sebastianwessel/esdoc @sebastianwessel/esdoc-standard-plugin

# Create a configuration file.
echo '{
  "source": "./src",
  "destination": "./docs",
  "plugins": [{"name": "esdoc-standard-plugin"}]
}' > .esdoc.json

# Run ESDoc.
./node_modules/.bin/esdoc

# View a documentation
open ./docs/index.html
```

# Document

please visit [esdoc.org](https://esdoc.org) to see more documentation.

# License

MIT
