var remote = require('remote');
var BrowserWindow = remote.require('browser-window');

var url = remote.require('url');
var querystring = remote.require('querystring');
var request = remote.require('superagent');

var options = require('./options')

function authGitHub() {
    var win = new BrowserWindow({
      width: 800,
      height: 600,
      show: true,
      'node-integration': false
    });

    win.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl, isMainFrame) {
      var query = querystring.parse(url.parse(newUrl).query);
      
      if (query.code || query.error) {
        win.close();
      }

      if (query.code) {
        request
          .post('https://github.com/login/oauth/access_token')
          .send({
            client_id: options.clientId,
            client_secret: options.clientSecret,
            code: query.code
          })
          .set('Accept', 'application/json')
          .end(function(err, res){
            if (err) {
              alert(err);
              return;
            }
            var token = res.body.access_token;
            localStorage.accessToken = token;
            location.reload();
          });
      } else if (error) {
        alert(error);
      }
    });

    win.on('close', function () {
      win = null;
    }, false);

    var u ='https://github.com/login/oauth/authorize?' + 'client_id=' + options.clientId;
    win.loadUrl(u);
}

$(function() {
  var token = localStorage.accessToken;

  if (token) {
    $('.js-sign-in').remove()
    $('.js-sign-out').removeClass('hidden')

    $('.js-sign-out').on('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('accessToken');
      location.reload();
    });

    request
      .get('https://api.github.com/user')
      .set('Accept', 'application/vnd.github.v3+json')
      .set('Authorization', 'token ' + token)
      .set('Cache-Control', 'no-cache')
      .end(function(err, res){
        if (err) {
          alert(err);
          return;
        }
        var user = res.body; 
        $('.js-avatar').prop('src', user.avatar_url + '&s=64').removeClass('hidden');
        $('.js-username').html(user.login).removeClass('hidden');
      });

    return;
  }

  $('.js-sign-in').on('click', function(e) {
    e.preventDefault();
    authGitHub();
  });
});

