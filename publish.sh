
rm -rf dist || true
npm run build
mkdir dist
cp index.js dist/index.js
cp README.md dist/README.md
cp -r internals dist/
cp package.json dist/package.json
rm -rf dist/internals/*.ts
npm publish
git tag $(cat package.json | grep version | sed -r 's/.*"version": "(.*)".*/v\1/')
