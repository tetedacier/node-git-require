# git dependency loader
This module provide the ability to require a commonjs module at a given version in the repository history. This may be usefull to monitor performance enhancement during a refactor or avoiding the use of submodule pointing at other branch of the same repository.

`git bisect` command may have provided the same kind of feature, but I wanted an integrated way to do it.

This module must be installed as devDependencies since deploying using git is not a recommanded way of deploying apps.

Moreover this module needs git to be installed, but there's a a lot of chance this may be the case, since it's one of the npm requirement to enable usage of git dependencies.

# Roadmap
See [the roadmap document](./ROADMAP) to see all the things which needs to be done to consider this module as anything else but a proof of concept.

# Warning
One of the strongest limitation is that module loaded at a current version should not require other files from its related tree. Those files may not exist at the current point of history of the working folders, exports of the required stuff may have differents signature.

Same is true for the package dependencies.

All this limitation has been clearly identifiedn planned in the ROADMAP document and may be addressed in future versions.
