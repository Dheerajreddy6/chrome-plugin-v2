(function() {
    $.ajax({
        url: "https://bots.botplatform.io/vault/mapping/"+window.location.hostname,
        method: "GET",
        success: function(data){
            if(data.success){
                var body = $('body');

                // Don't show at login
                if(data.data.botId==="bot_1494260176641"){
                    if(window.location.toString().indexOf("/B2C_CustomLogin.aspx") !== -1 || window.location.toString().toLowerCase().indexOf("logout") !== -1 ){
                        return;
                    }
                    var loginId = parseInt($($('#welcomeMenuBox a')[0]).text());
                    var loginName = $('.profile_name').text();

                    if(document.referrer.toString().indexOf("/B2C_CustomLogin.aspx") !== -1){
                        body.append($('<script />').attr('src','https://chat.botplatform.io/plugin-v2.js?bot='+data.data.botId+"&userId="+loginId+"&name="+loginName+"&init=true&open=false&clear=true"+(data.data.botId==="bot_1494260176641"?"&view=compact":"")).attr("type","text/javascript"));
                        return;
                    }

                    var open = false;
                    var search = location.search.substring(1);
                    if(search){
                        var params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
                        open = !!(params && params.bot_event);
                    }
                    body.append($('<script />').attr('src','https://chat.botplatform.io/plugin-v2.js?bot='+data.data.botId+"&userId="+loginId+"&name="+loginName+"&init=true&open="+open+""+(data.data.botId==="bot_1494260176641"?"&view=compact":"")).attr("type","text/javascript"));
                    return;
                }
                

                $('<script>window.ymConfig = { bot: '+data.data.botId+' };  (function () {var w=window,ic=w.YellowMessenger;if("function"===typeof ic)ic("reattach_activator"),ic("update",ymConfig);else{var d=document,i=function(){i.c(arguments)};function l(){var e=d.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://app.yellowmessenger.com/widget/main.js";var t=d.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}i.q=[],i.c=function(e){i.q.push(e)},w.YellowMessenger=i,w.attachEvent?w.attachEvent("onload",l):w.addEventListener("load",l,!1)}})();</' + 'script>').appendTo(document.body);

            }
        }
    });
})();