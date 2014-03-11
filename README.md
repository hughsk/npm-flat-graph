# npm-flat-graph [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/npm-flat-graph&title=npm-flat-graph&description=hughsk/npm-flat-graph%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Given a list of modules, recursively retrieve their dependency graph and generate a flat list of each module's dependencies.

Useful if you're only concerned with the most recent versions of a dependency
tree, generally for visualisation/analysis.

## Usage ##

[![npm-flat-graph](https://nodei.co/npm/npm-flat-graph.png?mini=true)](https://nodei.co/npm/npm-flat-graph)

### `getGraph(modules, done)`

This function takes an array of `modules` by name, calling `done(err, results)`
when complete, supplying you with an index formatted like so:

``` javascript
{
  'envify': [ 'xtend', 'through', 'esprima-fb', 'jstransform' ],
  'esprima-fb': [],
  'jstransform': [ 'base62', 'esprima-fb', 'source-map' ],
  'through': [],
  'xtend': [ 'object-keys' ],
  'base62': [],
  'object-keys': [],
  'source-map': [ 'amdefine' ],
  'amdefine': []
}
```

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/npm-flat-graph/blob/master/LICENSE.md) for details.
