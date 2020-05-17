
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# git dependency loader
This module provide the ability to require a commonjs module at a given version in the repository history.

This may be usefull to monitor performance enhancement during a refactor or avoiding the use of submodule pointing at other branch of the same repository.

[`git bisect`](https://git-scm.com/docs/git-bisect) command can provide the same kind of feature, but I wanted to play with git and module override.

## Usage
This module **must** be installed as a devDependencies since it **won't** and **should'nt** be of any use on production servers. Which means you should install it using `npm install --save-dev git-require` and use it in `ci` or `local` environment like this

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

Moreover this module needs git to be installed in the environment you will on which you will use it, but there's a a lot of chance this may be the case, since it seems to be one of the npm requirement to enable some of its feature like [git dependencies](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies).
(note for myself, I may have use the [npm's internal git lib](https://github.com/npm/cli/blob/latest/lib/utils/git.js) instead of writing [my own](./src/gitFs.js) ...)

## Tooling and commit on this project
This package makes use of the `commitizen` and `husky` packages, see [how to install it on you project and how to use it](https://github.com/commitizen/cz-cli).

## Roadmap
All the roadmap for this project is handled using github features like [the github's projects page](https://github.com/tetedacier/node-git-require/projects), milestone, issues ... to be honest I'm still wondering what will be the most efficient way of handling it.

## Warnings
One of the strongest limitation of this module is that when a scripts is loaded at a given version, it could require other modules which exists in your project at this specific revision.

Those modules may not exist at the current point of history of the working folder and even if they still exists they may exports a different signature.

Same is true for the dependencies defined in your package files.

All those limitation has been clearly identified, defined in [the project's roadmap](https://github.com/tetedacier/node-git-require/projects) and may be addressed or not in future versions.
