var curr_domain = "";
var curr_domain_old = "";

function parse_response(response){
  console.log("Response recieved")
  class_list = response.split(':');
  for(var i = 0; i < class_list.length; i++){
     console.log(class_list[i]);
  }
 
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}


function checkIdleTime(newState) {
  console.log("Checking idle behavior " + newState);
  if ((newState == "idle" || newState == "locked") &&
      localStorage["paused"] == "false") {
    pause();
  } else if (newState == "active") {
    resume();
  }
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
  	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var data_url = tabs[0].url;
    curr_domain=extractDomain(data_url)
    if(curr_domain!=curr_domain_old) {
       console.log("OnUpdated Request fired........." + curr_domain)
        $.post('http://127.0.0.1:5000/get_url', {'current_domain':curr_domain}, 
            function(resp){
              // console.log(resp)
              parse_response(resp)
              // parse_response(resp);
              /* Parse the response "class:class:class" */
              /* Add to storage*/ 
        });
      	curr_domain=curr_domain_old;
      }
  });

  }
});

chrome.tabs.onActivated.addListener( function (info) {
  chrome.tabs.get(info.tabId, function(tab){
      var curr_url = tab.url;
      curr_domain=extractDomain(curr_url)
      if(curr_domain!=curr_domain_old) {
        console.log("OnActivated Request fired.........")
        $.post('http://127.0.0.1:5000/get_url', {'current_domain':curr_domain}, 
            function(resp){
              // console.log(resp)
             parse_response(resp)
        });
        curr_domain=curr_domain_old;
      }
  });
});


chrome.idle.queryState(60, checkIdleTime);




