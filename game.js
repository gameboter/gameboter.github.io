
let invite_url  = "http://inmotiongame.com/api.php/lotter/invite";

var content = "" ; 

// invite: 
// 4eHm2eiHf2qgNKKx
// Role_id: 
// 8590016014
// Role_name: 
// 8590016014肥猫千斤
// gsid: 
// 2
code_list = [];

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "code.csv",
        
        success: function(data) {
        	processData(data);
        },

        error: function(XMLHttpRequest, textStatus, errorThrown) { 
        
        console.log("Error: " + errorThrown); 
    		}   
     });
});

function processData(allText) {
    var record_num = 1;  // or however many elements there are in each row
    var allTextLines = allText.split(/\r\n|\n/);
    


    for (var j=0; j<allTextLines.length; j++) {
        code_list.push(allTextLines[j])
    }
    // alert(lines);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


function invite(token,count){

	if(count <= 0 ) return;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", invite_url);

	xhr.setRequestHeader("accept", "*/*");
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Cookie", "PHPSESSID=b9264a9475d500012853d2440dcc6654");
	xhr.setRequestHeader("authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIiLCJqdGkiOiIwNTYxOGFmNTI3ZDU5YzAwMTA2NWM2N2ZjMTM3NDIxOGVmZDc4YTE5Y2FjMGFkNTU0MDY2NjQ3MzQyMWZmOTM2YzUzZDZjNmNmYTRiNjVjMSIsImlhdCI6MTY2OTE3NzY4MCwibmJmIjoxNjY5MTc3NjgwLCJleHAiOjE2NzE3Njk2ODAsInN1YiI6IjEyNTQ4NCIsInNjb3BlcyI6W251bGxdfQ.I4CHsiFi4hyZT7VdXYASNob3cWvY7FVrUinG4pGepffRc2mhApO35YuLchbMpaCRMsIHTa2MQefMmXjpz8m0pHlS6pA0RGQecYVMsIfaimA33dCIB9jMswKAohqX0dM0LeewNBwqyLaEG_CPEedhRpYxSJFNStrbP3WJJhw5Om07fa8s2TTWrNGfUN6J_XaBiZVIB7ywJKYm206Ocyoc-O_I3wZCmk0pkhCdKUBkejqLpL-d2In-JNmu15ZFHD7KY99WjOEBn6Uo_tmhxXmMmxgDEQGnbJk_fLxuq231nH1Qj7Kdt7Ir_DIN4hPn1BeoAB8OJZe5mFy5eQYKsx9qPQ");

	xhr.withCredentials = true;

	xhr.onreadystatechange = function () {
	   if (xhr.readyState === 4) {
	      console.log(xhr.responseText);
	      //{"status":-20000,"message":"Authenticate Token Fail. msg : 'accessToken' must not be null or empty"}
				let response = JSON.parse(xhr.responseText);

				content = content + response.msg + "\n"; 
				var el = document.getElementById('log');

				
                
	     
	     	if(response.msg == "邀请成功") {
	     		el.innerHTML = content ;
	     		alert("邀请成功，请检查，请收货！");
	     		count -- ; 
	     		invite(token,count);
	     	} else {
	     		invite(token,count);
	     	}
	      
	      
	   }};

	var role_id = 4295038000 + getRandomInt(1,100000);

	var invite_info = "invite=" + token + "&Role_id=" + role_id + "&Role_name=" + role_id + "%E5%8D%81%E5%85%AB%E5%B2%81%E4%B8%B6%E5%A4%8F%E5%AE%87" + "&gsid=2";

	xhr.send(invite_info);
}

function inviteSubmit(){
	let token = document.getElementById("token").value;
	let code = document.getElementById("count").value;
	token = token.replace(/\s/g, '');
	code = code.replace(/\s/g, '');

	if(!code_list.includes(code)){
		alert("注册码错误，请查证！");
		return;
	}

	invite(token,1);

}




