(function () {
  var services = 0
    , okServices = 0
    , $iconSuccess = document.getElementsByClassName('js-success')
    , $iconDanger = document.getElementsByClassName('js-danger')
    , $iconLoading = document.getElementsByClassName('js-loading')
    , $okServices = document.getElementsByClassName('js-ok-services')
    , $totalServices = document.getElementsByClassName('js-total-services')

  var statuses = Object.keys(JSON.parse(document.getElementsByClassName('module__body')[0].getAttribute('data-services')))

  $iconSuccess[0].style.display = 'none'
  $iconDanger[0].style.display = 'none'

  window.statuses = statuses
  Array.prototype.forEach.call(statuses, checkStatus)

  setInterval(function () {
    services = okServices = 0
    $okServices[0].innerHTML = okServices
    $iconSuccess[0].style.display = 'none'
    $iconDanger[0].style.display = 'none'

    $iconLoading[0].style.display = 'block'

    Array.prototype.forEach.call(statuses, checkStatus)
  }, 30000)

  function checkStatus(status) {
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          okServices++
          $okServices[0].innerHTML = okServices
        }
        services++
        if(services === statuses.length) {
          showStats()
        }
      }
    }

    request.open('GET', '/status/' + status, true)
    request.send()
  }

  function showStats() {

    $okServices[0].innerHTML = okServices
    $totalServices[0].innerHTML = services

    $iconLoading[0].style.display = 'none'
    if(okServices === services) {
      $iconSuccess[0].style.display = 'block'
    } else {
      $iconDanger[0].style.display = 'block'
    }
  }
})()
