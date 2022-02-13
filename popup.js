chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "getSource") {
    
    message.innerText = request.source;    
  };
});
// chrome.commands.onCommand.addListener((command) => {
//   if (command === 'hello') {
//       console.log("Hello there!");
//   } else {
//       console.log("Date: " + (new Date).toDateString());
//   }
// });

// chrome.commands.onCommand.addListener(function(request, sender) {
//   if(command === "getSource") {
//     message.innerText = request.source;     // Do your stuff
//   }
// });



function onWindowLoad() {
  var message = document.querySelector("#message");
  var messagedisplay = document.querySelector("#messagedisplay");

  chrome.tabs.executeScript(
    null,
    {
      file: "getPagesSource.js",
    },
    function () {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText =
          "There was an error injecting script : \n" +
          chrome.runtime.lastError.message;
      }
      // find bad word
      const findcomment = message.innerText;

      const messagefindfirst = findcomment.indexOf(
        '<span data-lexical-text="true"',
        "1"
      );

      message.innerText = message.innerText.substring(
        messagefindfirst + 31,
        messagefindfirst + 300
      );
      const lastcomment = message.innerText;
      const messagefindlast = lastcomment.indexOf("</span>", "1");
      message.innerText = message.innerText.substring(0, messagefindlast);
      const badwords = [
        "ควย",
        "เหี้ย",
        "กาก",
        "เย็ด",
        "โง่",
        "เวรกรรม",
        "ระเบิดตูด",
        "สายเหลือง",
        "เอ๋อ",
        "ปัญญาอ่อน",
        "ขยะ",
        "เฮงซวย",
        "อีดอก",
        "กระหรี่",
        "ไอหน้าโง่",
        "ไอสัส",
        "สัตว์นรก",
        "หี",
        "เสือก",
        "กระเทยควาย"
      ];
      const simple = message.innerText;
      for (let i = 0; i < badwords.length; i++) {
        const simpleloop = simple;
        const findbadword = simpleloop.indexOf(badwords[i]);

        if (findbadword > -1) {
          message.innerText = 1;
          break;
        } else {
          message.innerText = -1;
        }
      }
      console.log("I am working");
      if (message.innerText == 1) {
        message.innerText = "comment ของคุณอาจทำให้ส่งผลทางจิตใจของผู้ที่มาเห็น";
        messagedisplay.innerText = message.innerText;
      } else if (message.innerText == -1) {
        message.innerText = "สุดยอดไปเลย";
        messagedisplay.innerText = message.innerText;
        
      }
    }
  );
}


window.onload = onWindowLoad;
