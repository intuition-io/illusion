# [Illusion][release]

[![](https://badge.fury.io/js/an-illusion.png)](https://www.npmjs.org/package/an-illusion)
[![Dependency Status](https://gemnasium.com/intuition-io/illusion.svg)](https://gemnasium.com/intuition-io/illusion)
[![Build Status](https://api.shippable.com/projects/54147f21f82ab7ebd69ca4cb/badge?branchName=master)](https://app.shippable.com/projects/54147f21f82ab7ebd69ca4cb/builds/latest)
[![Coverage Status](https://coveralls.io/repos/intuition-io/illusion/badge.png)](https://coveralls.io/r/intuition-io/illusion)

> Fake it until you make it

`illusion` is a little tool that emulates [Telepathy][telepathy] RESTful API
for developing clients and integration tests.

It also provides a convenient documentation of available backend endpoints.


## Quickstart

```
# Install globally the command line utility
npm install -g an-illusion

# And check everything worked fine
illusion -h
illusion fakeit -h
illusion doc -h
```

You can either consult the API with `illusion doc` or fire up a fake server :

```
$ illusion fakeit --datapoints 3,6,100 --metric portfolio:cash,daily_perf:returns --id someone
[18:45:42] illusion version 0.1.0
[18:45:42] Emulating Telepathy server on port 3333
```

From there most of [telepathy][telepathy] endpoints are available

```
$ curl localhost:3333/v0/health
{ 
  "states": {
    "celery workers": "not implemented",
    "telepathy": true
  },
  "versions": {
    "celery": "3.1.14",
    "insights": "0.3.2",
    "intuition": "0.4.3",
    "telepathy": "0.0.8"
  }
}
```


---


## Conventions

The project follows some wide-accepted guidelines

* [Semantic Versioning known as SemVer][semver]
* [Git commit messages][commit]
* [A changelog][changelog] hosted on [Trello][trello]

## Authors

| Selfie               | Name            | Twitter                     |
|----------------------|-----------------|-----------------------------|
| <img src="https://avatars.githubusercontent.com/u/1517057" alt="text" width="40px"/> | Xavier Bruhiere | [@XavierBruhiere][xbtwitter] |


## License

Copyright 2014 Xavier Bruhiere.
`illusion` is available under the [MIT Licence][mit].


[mit]: http://opensource.org/licenses/MIT
[release]: https://github.com/intuition-io/illusion/releases/latest
[semver]: http://semver.org
[commit]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
[changelog]: http://keepachangelog.com/
[trello]: https://trello.com/c/LcPx6Z8X/74-changelog-illusion
[telepathy]: https://github.com/intuition-io/telepathy
[xbtwitter]: https://twitter.com/XavierBruhiere
