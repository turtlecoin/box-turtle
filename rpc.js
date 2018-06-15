// 2014 XDN Developers
// 2018 TurtleCoin Developers
function forceNumber(string) {
  var anum = /(^\d+$)|(^\d+\.\d+$)/
  if (typeof string == 'string' && anum.test(string)) {
    string = Number(string);
  }
  return string;
}
$(function() {
  $.fn.serializeObject = function() {
    var self = this,
      json = {},
      push_counters = {},
      patterns = {
        "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
        "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
        "push": /^$/,
        "fixed": /^\d+$/,
        "named": /^[a-zA-Z0-9_]+$/
      };
    this.build = function(base, key, value) {
      base[key] = forceNumber(value);
      return base;
    };
    this.push_counter = function(key) {
      if (push_counters[key] === undefined) {
        push_counters[key] = 0;
      }
      return push_counters[key]++;
    };
    $.each($(this).serializeArray(), function() {
      if (!patterns.validate.test(this.name)) {
        return;
      }
      var k,
        keys = this.name.match(patterns.key),
        merge = this.value,
        reverse_key = this.name;
      while ((k = keys.pop()) !== undefined) {
        reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');
        if (k.match(patterns.push)) {
          merge = self.build([], self.push_counter(reverse_key), merge);
        } else if (k.match(patterns.fixed)) {
          merge = self.build([], k, merge);
        } else if (k.match(patterns.named)) {
          merge = self.build({}, k, merge);
        }
      }
      json = $.extend(true, json, merge);
    });
    return json;
  };

  function parseNum(num) {
    num = num.toString();
    return num.substr(0, num.length - 8) + '.' + num.substr(-8);
  }

  function numToTurtle(num) {
    return num * 1;
  }

  function handleRequest(method, params) {
    if (method == 'transfer') {
      console.log('EE', params.destinations[0].amount, numToTurtle(params.destinations[0].amount));
      params.destinations[0].amount = numToTurtle(params.destinations[0].amount);
      params.fee = numToTurtle(params.fee);
    }
    return params;
  }

  function handleResult(method, result, $resultNode) {
    if (method == 'getBalance') {
      console.log('R', $resultNode);
      $resultNode.html('</br>Locked: ' + parseNum(result.balance) + ' </br> Unlocked: ' + parseNum(result.unlocked_balance));
    } else if (method == 'transfer') {
      $resultNode.html('</br>Ok');
    } else if (method == 'store') {
      $resultNode.html('</br>Ok');
    }
  }

  function callRpc(method, paramsData, $resultNode) {
    var url = 'http://' + $('#rpcHost').val() + ':' + $('#rpcPort').val() + '/json_rpc';
    var request = {
      "jsonrpc": "2.0",
      "method": method,
      "params": paramsData.params ? handleRequest(method, paramsData.params) : {}
    };
    console.log('RPC CALL', url, method, request);
    $.ajax({
      url: url,
      type: 'POST',
      cache: false,
      data: JSON.stringify(request),
      success: function(result) {
        console.log('RPC RESULT', result);
        handleResult(method, result.result, $resultNode);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('RPC CALL FAILED', textStatus);
        //					alert('Request to ' + url + ' failed');
      },
      dataType: 'json'
    });
  }
  $('.rpc-submit').click(function() {
    var $baseNode = $(this).closest('.rpc-method');
    var $resultNode = $baseNode.find('.rpc-result');
    $resultNode.text('');
    callRpc($(this).data('method'), $baseNode.serializeObject(), $resultNode);
    return false;
  });
});
