chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          if(details.method == "GET") {
            console.log('url: ' + details.url);
            var decodedUrl = decodeURIComponent(details.url);
            return {cancel: scriptTagCheck(decodedUrl)};           
          }
          else if(details.method == "POST") {
              console.log('input: ' + details.requestBody.formData.postp);
              var formInput = details.requestBody.formData.postp[0];
              return {cancel: scriptTagCheck(formInput)};
          }
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestBody"]);

function scriptTagCheck (str) {
    return str.indexOf("<script>") != -1;
}