window.addEventListener("load", function() {
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

    const img = "../favicon.ico";
    /*input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("check_login").click();
        }
        // if selected jakies tam inputy + to samo na create account
      });*/
    login_username.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  
            check_login.click();
        }
    });
    login_pass.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  
            check_login.click();
        }
    });
    check_login.addEventListener("click", async function() {
        var username = document.getElementById("login_username").value;
        var password = document.getElementById("login_pass").value;
        // that checks if username and login are in a trello board
        const API_KEY = "123";
        const API_TOKEN = "123";
        // from GET https://api.trello.com/1/members/me/boards?fields=name,url&key=5febd8f1c7aaa0c063d66877eb61b138&token=ATTA18a918c38f83950cf82bd11b74b61f8fb27e59f3e410d36ac9919fccf98dcf0a93B5E202
        const TABLE_ID = "6617aa1b831eefcf2f2f0edd";
        // from GET https://api.trello.com/1/boards/6617aa1b831eefcf2f2f0edd/lists?key=5febd8f1c7aaa0c063d66877eb61b138&token=ATTA18a918c38f83950cf82bd11b74b61f8fb27e59f3e410d36ac9919fccf98dcf0a93B5E202
        const LIST_ID = "6617aa1b9207bd5c82ad2873";
        
        const url = "https://api.trello.com/1/lists/6617aa1b9207bd5c82ad2873/cards?key=5febd8f1c7aaa0c063d66877eb61b138&token=ATTA18a918c38f83950cf82bd11b74b61f8fb27e59f3e410d36ac9919fccf98dcf0a93B5E202";
        
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        try{
            const info = await(await fetch(url, requestOptions)).json();
            for(let info_table of info){
                info_table["name"] = info_table["name"].split(" ");
                if((info_table["name"][0] == username || info_table["name"][1] == username) && info_table["desc"] == password){
                    console.log("correct");
                    document.querySelector(".login").style.display = "none";
                    document.querySelector(".table").style.display = "flex";
                    document.querySelector("#additional").style.display = "none";
                    document.querySelector("#menu").style.display = "block";
                    document.querySelector("#motto").style.display = "block";
                    document.querySelector("#asd").setAttribute("style","align-content: center");
                    alert("Logged in successfully");
                    const notification = new Notification("Arranger", { body: "You've logged in, hope you enjoy your time here!", icon: img });
                    return;
                }
            }
            alert("Wrong username or password.")
        }
        catch(error){
            console.error(error);
        }
    });
});
