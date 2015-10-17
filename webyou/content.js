chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "new_tab" ) {



      console.log(curr_domain);
      // This line is new!
      //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);