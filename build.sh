#!/bin/bash

npm run build
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/Kids-In-Taiwan/Frontend.git master:prod
cd -