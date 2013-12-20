
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.methodOverride())
app.use(app.router)
app.use(express.static(path.join(__dirname, 'public')))

var services = JSON.parse(process.env.SERVICES)

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

app.get('/', function (req, res) {
  res.render('index', { services: process.env.SERVICES, serviceCount: Object.keys(services).length })
})

app.get('/status/:serviceName', function (req, res) {
  var serviceName = req.params.serviceName

  if (!services[serviceName]) return res.send(404)

  req.pipe(request(services[serviceName])).pipe(res)
})

/*app.get('/status/github', function (req, res) {
  req.pipe(request('https://status.github.com/api/status.json')).pipe(res)
})*/

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'))
})
