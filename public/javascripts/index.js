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
      , $loading = $serviceEl.find('.js-loading').fadeIn()

    $.ajax(
      { url: '/status/' + status
      , timeout: 10000
      , success: function () {
          $loading.fadeOut()
          $serviceEl.addClass(successClass)
        }
      , error: function () {
          $loading.fadeOut()
          $serviceEl.removeClass(successClass)
        }
      })
  }
})
