(function () {
  var services = 0
    , okServices = 0
    , $iconSuccess = document.getElementsByClassName('js-success')
    , $iconDanger = document.getElementsByClassName('js-danger')
    , $iconLoading = document.getElementsByClassName('js-loading')

  var statuses = ['github']

  $iconSuccess[0].style.display = 'none'
  $iconDanger[0].style.display = 'none'

  window.statuses = statuses
  Array.prototype.forEach.call(statuses, function (status) {
    var request = new XMLHttpRequest()
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          okServices++
        }
        services++
        if(services === statuses.length) {
          showStats()
        }
      }
    }

    request.open('GET', '/status/' + status, true)
    request.send()
  })

  function showStats() {
    console.log(okServices)
    console.log(services)
    console.log(statuses.length)
    var $okServices = document.getElementsByClassName('js-ok-services')
      , $totalServices = document.getElementsByClassName('js-total-services')

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
