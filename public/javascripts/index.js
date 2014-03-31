$(document).ready(function () {
  var $moduleBody = $('.module__body')
    , statuses = Object.keys(JSON.parse($moduleBody.attr('data-services')))
    , successClass = 'success'
    , failureClass = 'danger'
    , timeout = $moduleBody.attr('data-timer')

  $.each(statuses, checkStatus)

  setInterval(function () {
    $.each(statuses, checkStatus)
  }, timeout)

  function toggleLoading($serviceEl, hide) {
    var $status = $serviceEl.find('.js-status')
      , $loading = $serviceEl.find('.js-loading')

    if (hide) {
      $loading.hide()
      $status.show()
    } else {
      $status.hide()
      $loading.show()
    }
  }

  function checkStatus(i, status) {
    var $serviceEl = $('.js-service[data-service=' + status + ']')
    toggleLoading($serviceEl, false)
    $.ajax(
      { url: '/status/' + status
      , success: function () {
          toggleLoading($serviceEl, true)
          $serviceEl.removeClass(failureClass).addClass(successClass)
        }
      , error: function () {
          toggleLoading($serviceEl, true)
          $serviceEl.removeClass(successClass).addClass(failureClass)
        }
      })
  }
})
