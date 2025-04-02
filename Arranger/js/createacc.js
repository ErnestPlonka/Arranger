window.addEventListener("load", function(){
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
    
    create_user.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  
            new_acc.click();
        }
    });
    create_email.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  
            new_acc.click();
        }
    });
    create_pass1.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  
            new_acc.click();
        }
    });
    create_pass2.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  
            new_acc.click();
        }
    });
    new_acc.addEventListener("click", async function(){
        var username = document.getElementById("create_user").value;
        var email = document.getElementById("create_email").value;
        var password = document.getElementById("create_pass1").value;
        var password2 = document.getElementById("create_pass2").value;
        let regex_username = /[A-Za-z]{1}[A-Za-z0-9_]{4,}/
        let regex_email = /[a-z]{1}[a-z0-9_+]{2,}[@]{1}[a-z]{3,}[.]{1}[a-z]{2,3}/
        let regex_pass = /[\w!.@#$%&()]{6,}/
        // checks regex with the values from user
        if(username.match(regex_username) && email.match(regex_email) && password == password2 && password.match(regex_pass)){
            console.log("correct");
            const API_KEY = "123";
            const API_TOKEN = "123";
            // from GET https://api.trello.com/1/members/me/boards?fields=name,url&key=5febd8f1c7aaa0c063d66877eb61b138&token=ATTA18a918c38f83950cf82bd11b74b61f8fb27e59f3e410d36ac9919fccf98dcf0a93B5E202
            const TABLE_ID = "6617aa1b831eefcf2f2f0edd";
            // from GET https://api.trello.com/1/boards/6617aa1b831eefcf2f2f0edd/lists?key=5febd8f1c7aaa0c063d66877eb61b138&token=ATTA18a918c38f83950cf82bd11b74b61f8fb27e59f3e410d36ac9919fccf98dcf0a93B5E202
            const LIST_ID = "6617aa1b9207bd5c82ad2873";
            
            const title = username + "+" + email;
            const url = "https://api.trello.com/1/cards?idList=6617aa1b9207bd5c82ad2873&key=5febd8f1c7aaa0c063d66877eb61b138&token=ATTA18a918c38f83950cf82bd11b74b61f8fb27e59f3e410d36ac9919fccf98dcf0a93B5E202&name=" + title + "&desc=" + password;
            const url2 = "https://api.trello.com/1/lists/6617aa1b9207bd5c82ad2873/cards?key=5febd8f1c7aaa0c063d66877eb61b138&token=ATTA18a918c38f83950cf82bd11b74b61f8fb27e59f3e410d36ac9919fccf98dcf0a93B5E202";
            
            
            const postOptions = {
                method: "POST",
                redirect: "follow"
            };

            const getOptions = {
                method: "GET",
                redirect: "follow"
            };
            var canCreated = true;
            try{
                const info = await(await fetch(url2, getOptions)).json();
                for(let info_table of info){
                    info_table["name"] = info_table["name"].split(" ");
                    console.log(info_table["name"]);
                    if(info_table["name"][0] == username){
                        alert("Username already exists.");
                        canCreated = false;
                    }
                    if(info_table["name"][1] == email){
                        alert("Email already exists.");
                        canCreated = false;
                    }
                }
            }
            catch(error){
                console.error(error);
            }

            if(canCreated){

                try{
                    await fetch(url, postOptions)
                    .then((response) => response.text())
                    .then((result) => console.log(result))
                    .catch((error) => console.error(error));
                    alert(`Account ${username} created successfully`);
                    const notification = new Notification("Arranger", { body: "Account created successfully, enjoy your stay!", icon: img });
                    window.location.href = "../index.html";
                }
                catch(error){
                    console.error(error);
                }

            }   
        }
        else if(!username.match(regex_username)){
            alert("Username doesn't meet the creation standards.");
        }
        else if(!email.match(regex_email)){
            alert("E-mail doesn't exist.");
        }
        else if(password != password2){
            alert("Passwords are not the same.");
        }
        else if(!password.match(regex_pass)){
            alert("Passwords don't meet the creation standards.")
        }
        else if(username == "" || password == "" || email == ""){
            alert("Please fill out every value.");
        }
        else{
            alert("Something went wrong, please try again.");
        }
    });
});