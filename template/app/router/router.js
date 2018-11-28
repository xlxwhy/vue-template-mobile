

module.exports = function (router) {


  router.get('/', function (req, res, next) {
    res.redirect('/mobile/template/index.html');
  });
  router.get('/template', function (req, res, next) {
    res.redirect('/mobile/template/index.html');
  });



};




