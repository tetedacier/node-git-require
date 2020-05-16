
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# git dependency loader
This module provide the ability to require a commonjs module at a given version in the repository history.

This may be usefull to monitor performance enhancement during a refactor or avoiding the use of submodule pointing at other branch of the same repository.

`git bisect` command may have provided the same kind of feature, but I wanted an easy way to do it.

## Usage
This module must be installed as devDependencies since deploying using git is not a recommanded way of deploying apps. Which means you shoudld install it using `npm install --save-dev git-require` and use it as

```javascript
require('git-require')
const previousVersionOfModuleA = './A#previous-tag.git'
const currentVersionOfModuleA = './A'

// ... do your stuff

```

You can also run the same using `node -r git-require perf.js` where `perf.js` looks like

```javascript
const previousVersionOfModuleA = './A#previous-tag.git'
const currentVersionOfModuleA = './A'

// ... do your stuff

```


Moreover this module needs git to be installed, but there's a a lot of chance this may be the case, since it's one of the npm requirement to enable usage of git dependencies.

## Tooling and commit on this project
This package makes use of the `commitizen` and `husky` packages, see [how to install it on you project and how to use it](https://github.com/commitizen/cz-cli).

## Roadmap
See [the roadmap document](./ROADMAP) to see all the things which needs to be done to consider this module as anything else but a proof of concept.

## Warnings
One of the strongest limitation of this module is that when loaded scripts at a given version could require other files from its related tree.

Those files may not exist at the current point of history of the working folder, exports of the required stuff may have differents signature.

Same is true for the package dependencies.

All those limitation has been clearly identified, planned in the [roadmap document](./ROADMAP.md) and may be addressed or not in future versions.
