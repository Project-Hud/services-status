var request = require('request')
  , Widget = new require('hud-widget')
  , widget = new Widget()
  , services = JSON.parse(process.env.SERVICES)

widget.get('/', function (req, res) {
  res.render('index',
    { services: process.env.SERVICES
    , serviceCount: Object.keys(services).length
    , timer: process.env.TIMER || 30000
    })
})

widget.get('/status/:serviceName', widget.cache(5000), function (req, res) {
  var serviceName = req.params.serviceName

  if (!services[serviceName]) return res.send(404)

  request(
    { url: services[serviceName]
    , timeout: 20000 // 20 Seconds
    }, function (error, response) {
      var resCode = 200
      if (error || response.statusCode !== 200) resCode = 500

      return res.send(resCode)
    })

})
