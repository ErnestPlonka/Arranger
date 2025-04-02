console.log("unimported");

ai_prompt_value.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  
        send.click();
    }
});

function askNotificationPermission() {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission().then((permission) => {
      notificationBtn.style.display = permission === "granted" ? "none" : "block";
    });
}

askNotificationPermission();



import {
    getGenerativeModel,
    scrollToDocumentBottom,
    updateUI,
} from "../utils/api.js";
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";
import { marked } from "https://esm.run/marked";
var send = document.querySelector("#send");
console.log("imported");
//Below comes your API key 
const API_KEY = "123";
const genAI = new GoogleGenerativeAI(API_KEY);
console.log("created");
async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    console.log("started");
    var prompt = ai_prompt_value.value;
    if(prompt == ""){
        document.querySelector(".ai_output").innerText = "input cannot be blank";
    }
    else{
        document.querySelector(".ai_output").innerText = "awaiting the AI response...";
        var prompt = ai_prompt_value.value;
        console.log("sent");
        try{
            const result = await model.generateContent(prompt);
            const response = await result.response;
            
            const img = "../favicon.ico";
            const notification = new Notification("Arranger", { body: "Our system has come up with a prompt, feel free to check it out!", icon: img });
            const text = response.text();
            document.querySelector(".ai_output").innerText = text;
        }
        catch(error){
            document.querySelector(".ai_output").innerText = error;
        }
    }
}

send.addEventListener("click", run);

