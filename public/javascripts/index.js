(function () {
  var statuses = document.getElementsByClassName('status')
  window.statuses = statuses
  Array.prototype.forEach.call(statuses, function (status) {
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var response = JSON.parse(request.responseText)
          status.innerHTML = response.status
        }
      }
    }

    request.open('GET', '/status/' + status.getAttribute('data-service'), true)
    request.send()
  })
})()
