// 2014 XDN Developers
// 2018 TurtleCoin Developers

/* Format to two decimal places */
function fromAtomic(num)
{
    return (num / 100).toFixed(2);
}

function toAtomic(num)
{
    return Math.round(num * 100);
}

function callRpc(method, params, callback)
{
    var url = "http://" + $("#rpcHost").val() + ":" + $("#rpcPort").val() + "/json_rpc";

    var request =
    {
        "params" : params,
        "jsonrpc" : "2.0",
        "id" : "test",
        "method" : method,
        "password" : config.rpcPassword
    };

    console.log('Sending RPC request to ' + url + ' with parameters: ' + JSON.stringify(params))
    
    console.log('Sending RPC request to ' + url + ' with parameters: ' + JSON.stringify(params))
    
    var resultNode = document.getElementById("rpc-result");
    /* Clear any previous errors */
    resultNode.innerHTML = "";

        $.ajax(
    {
        url: url,
        type: "POST",
        cache: false,
        data: JSON.stringify(request),

        success: function(result)
        {
            callback({success: true, result: result});
        },

        error: function(jqXHR, textStatus, errorThrown)
        {
            console.log('Failed to contact walletd: jqXHR = ' + jqXHR + 
                        ', textStatus = ' + textStatus + ', errorThrown = ' +
                        errorThrown)

            if (errorThrown != "")
            {
                resultNode.innerHTML = "Failed to contact walletd: " + errorThrown;
            }
            else
            {
                resultNode.innerHTML = "Failed to contact walletd: Is walletd open, with the cors header enabled?";
            }

            callback({success: false, result: errorThrown});
        },

        dataType: "json"
    });
}

function sendTransaction(address, amount, fee)
{
    var params =
    {
        "transfers" : [{address: address, amount: toAtomic(amount)}],
        "fee" : toAtomic(fee),
        "anonymity" : config.mixin
		//"paymentId" : paymentId
    };

    var returnValue = callRpc("sendTransaction", params, function(returnValue)
    {
        if (returnValue.success)
        {
            var resultNode = document.getElementById("rpc-result");

            /* See if the RPC succeeded */
            if (returnValue.result.hasOwnProperty("error"))
            {
                resultNode.innerHTML = "Failed to send transaction, error: "
                                     + returnValue.result.error.message;
            }
            else
            {
                resultNode.innerHTML = "Success sending transaction, transaction hash: "
                                     + returnValue.result.result.transactionHash;
            }
        }
    });
}

function getBalance()
{
    var returnValue = callRpc("getBalance", {}, function(returnValue)
    {
        if (returnValue.success)
        {
            var resultNode = document.getElementById("rpc-result");

            if (returnValue.result.hasOwnProperty("error"))
            {
                resultNode.innerHTML = "Failed to get balance, error: "
                                     + returnValue.result.error.message;
            }
            else
            {
                /* eep! */
                var json = returnValue.result.result;

                resultNode.innerHTML = "Locked: "
                                     + fromAtomic(json.lockedAmount)
                                     + " TRTL"
                                     + "</br>Unlocked: "
                                     + fromAtomic(json.availableBalance)
                                     + " TRTL";
            }
        }
    });
}

function getAddresses()
{
    var returnValue = callRpc("getAddresses", {}, function(returnValue)
    {
        if (returnValue.success)
        {
            var resultNode = document.getElementById("rpc-result");

            if (returnValue.result.hasOwnProperty("error"))
            {
                resultNode.innerHTML = "Failed to get address, error: "
                                     + returnValue.result.error.message;
            }
            else
            {
                /* eep! */
                var json = returnValue.result.result;

                resultNode.innerHTML = "Address " + json.addresses;
            }
        }
    });
}


$(document).ready(function()
{
    document.getElementById('rpcHost').value = config.host;
    document.getElementById('rpcPort').value = config.port;

    var resultNode = document.getElementById("rpc-result");

    $('#getBalance').click(function()
    {
        console.log('getBalance() clicked...')
        getBalance();
    });

    $('#sendTransaction').click(function()
    {
        console.log('sendTransaction() clicked...')
        resultNode.innerHTML = "";

        var address = $("#address").val();
        var amount = $("#amount").val();
        var fee = $("#fee").val();
		//var paymentId = $("paymentId").val();

        if (address.length != config.addressLength || !address.startsWith("TRTL"))
        {
            resultNode.innerHTML = "Address is incorrect length! Should be "
                                 + config.addressLength + " characters and start with TRTL.";
            return;
        }

        if (amount < config.minAmount)
        {
            resultNode.innerHTML = "Amount is too small! Must be at least "
                                 + config.minAmount + " TRTL.";
            return;
        }

        if (fee < config.minFee)
        {
            resultNode.innerHTML = "Fee is too small! Must be at least "
                                 + config.minFee + " TRTL.";
            return;
        }

        sendTransaction(address, amount, fee); // , paymentId);
    });
	$('#getAddresses').click(function()
    {
        console.log('getAddresses() clicked...')
        getAddresses();
    });
});
