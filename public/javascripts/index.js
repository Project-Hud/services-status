$(document).ready(function () {
  var $moduleBody = $('.module__body')
    , statuses = Object.keys(JSON.parse($moduleBody.attr('data-services')))
    , successClass = 'success'
    , timeout = $moduleBody.attr('data-timer')

  $.each(statuses, checkStatus)

  setInterval(function () {
    $.each(statuses, checkStatus)
  }, timeout)

  function checkStatus(i, status) {
    var $serviceEl = $('.js-service[data-service=' + status + ']')
      , $loading = $serviceEl.find('.js-loading').show()

    $.ajax(
      { url: '/status/' + status
      , success: function () {
          $loading.hide()
          $serviceEl.addClass(successClass)
        }
      , error: function () {
          $loading.hide()
          $serviceEl.removeClass(successClass)
        }
      })
  }
})
