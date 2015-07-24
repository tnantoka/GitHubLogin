# GitHubLogin

Sign in with GitHub on Electron.

## Development

```
$ npm install electron-prebuilt -g
$ npm install
$ bower install

# options.js 
module.exports = {
  clientId: 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
};

$ electron .
```

## Package

```
$ npm install electron-packager -g
$ electron-packager . GitHubLogin --platform=darwin --arch=x64 --version=0.30.0 --overwrite
$ open GitHubLogin-darwin-x64/GitHubLogin.app/
```


