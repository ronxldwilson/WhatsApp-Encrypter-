var selectedText;

var encryptButton = document.getElementById("encrypt");
encryptButton.addEventListener('click', function() {encryption_process();});

var decryptButton = document.getElementById("decrypt");
decryptButton.addEventListener('click', function() {decryption_process();});

var passwordCheckbox = document.getElementById("checkbox");
passwordCheckbox.addEventListener('click', function() {password_checkbox();});


//Encryption
function encryption_process() {
	var message = document.getElementById("message").value;
	var password = document.getElementById("password").value;

	var result = encrypt(message, password, 4);
	document.getElementById("InsertResultHere").innerHTML = escapeHTML(result);
	
	copyToClipboard(result);
	copiedMessage();
}

//Decryption
function decryption_process() {
	var message = document.getElementById("message").value;
	var password = document.getElementById("password").value;

	var result = decrypt(message, password, 4, false);
	document.getElementById("InsertResultHere").innerHTML = escapeHTML(result);
}

//Show/Hide Password Checkbox
function password_checkbox() {
	var x = document.getElementById("password");
	if (x.type === "password") {
		x.type = "text";
	}
	else {
		x.type = "password";
	}
}

//To escape unsafe characters before pasting to innerHTML
function escapeHTML(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

//Copy encrypted message to user's clipboard
function copyToClipboard(result) {
	var aux = document.createElement("input");

	aux.setAttribute("value", result);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
}

//Message alerting that encrypted message has been copied to user's clipboard
function copiedMessage() {
	var x = document.getElementById("copiedMessage");

	x.style.display = "block";
}
