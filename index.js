var debug   = require('debug')('npm-flat-graph')
var stats   = require('npm-stats')()
var map     = require('map-async')
var flatten = require('flatten')
var semver  = require('semver')
var uniq    = require('uniq')

module.exports = getGraph

function getGraph(modules, done) {
  var results = {}

  modules = Array.isArray(modules)
    ? modules
    :[modules]

  grab(modules, function(err) {
    done(err, !err && results)
  })

  function grab(modules, ready) {
    map(modules, function(name, i, next) {
      if (results[name]) return next()

      debug('getting dependencies for %s', name)
      results[name] = true

      stats.module(name).info(function(err, pkg) {
        if (err) return next(err)

        var versions = Object.keys(pkg.versions)
        var latest = pkg.versions[
          pkg['dist-tags'].latest
        ] || semver.maxSatisfying(versions, '*')

        var dependencies = Object.keys(
          latest.dependencies || {}
        )

        debug('found %s dependencies for %s', dependencies.length, name)
        results[name] = dependencies
        next(null, dependencies)
      })
    }, function(err, deps) {
      if (err) return ready(err)

      deps = flatten(deps)
      deps = deps.filter(Boolean)
      uniq(deps)

      return deps.length
        ? grab(deps, ready)
        : ready()
    })
  }
}
