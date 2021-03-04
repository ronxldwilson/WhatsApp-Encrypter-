var encryptButton = document.getElementById("encrypt");
encryptButton.addEventListener('click', function() {encryption_process();});

var decryptButton = document.getElementById("decrypt");
decryptButton.addEventListener('click', function() {decryption_process();});

var passwordCheckbox = document.getElementById("checkbox");
passwordCheckbox.addEventListener('click', function() {password_checkbox();});

var GRINDER_CAPACITY = 95;


function encryption_process() {
	var message = document.getElementById("message").value;
	var password = document.getElementById("password").value;

	var result = encrypt(message, password, 4);
	document.getElementById("InsertResultHere").innerHTML = result;
}

function decryption_process() {
	var message = document.getElementById("message").value;
	var password = document.getElementById("password").value;

	var result = decrypt(message, password, 4, false);
	document.getElementById("InsertResultHere").innerHTML = result;
}



function encrypt(meat, salt, multiplier) {
	var instance, i, a, b, c;

	var meat_length = meat.length;
    var salt_length = salt.length;
    
    var bacon = meat.split('');
    
    for (instance = 0; instance < 0+multiplier; instance++) {
        salt = shuffle_salt(salt, instance);
		for (i = 0; i < meat_length; i++) {
            a = char_grinder(bacon[i], 'CHAR');
            b = char_grinder(salt[i%salt_length], 'CHAR');
            c = (a + b + i%salt_length)%GRINDER_CAPACITY;
            bacon[i] = char_grinder(c, 'NUM');
		}
	}
    return string(bacon);
}


function decrypt(bacon, salt, multiplier, print_mode) {
	var instance, i, a, b, c;
	var bacon_length = bacon.length;
    var salt_length = salt.length;
    
    var meat = bacon.split('');
    
    for (instance = 4; instance > 4-multiplier; instance--) {
        salt = shuffle_salt(salt, instance);
		for (i = 0; i < bacon_length; i++) {
            a = char_grinder(meat[i], 'CHAR');
            b = char_grinder(salt[i%salt_length], 'CHAR');
            
            if(b+(i%salt_length) > a)
                c = (a - b - i%salt_length)%GRINDER_CAPACITY + GRINDER_CAPACITY;
            else
                c = (a - b - i%salt_length)%GRINDER_CAPACITY;
            
            //c = (a - b - i%salt_length)%GRINDER_CAPACITY;
            
            if(print_mode)
                print(char_grinder(c, "NUM"));
            else
                meat[i] = char_grinder(c,  'NUM');
		}
	}
    return string(meat);
}


function shuffle_salt(salt, instance) {
	salt = salt.split('');
    var salt_length = salt.length;
    
    if(instance == 1 || instance == 3) {
        salt = salt.reverse();
	}
    
    if(instance == 2) {
        for (var i = 0; i < salt_length; i++) {
            if(i%2 == 0 && i != salt_length-1) {
                temp_particle = salt[i];
                salt[i] = salt[i+1];
			}
            if(i%2 == 1) {
                salt[i] = temp_particle;
			}
		}
    }
	return string(salt);
}


function char_grinder(package, package_type) {
    alphabet = " !\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".split('');
    
	if(package_type == "CHAR") {
        return alphabet.indexOf(package);
	}
    if(package_type == "NUM") {
        return alphabet[package];
	}
}


function string(list) {
    return list.join('');
}



function password_checkbox() {
	var x = document.getElementById("password");
	if (x.type === "password") {
		x.type = "text";
	}
	else {
		x.type = "password";
	}
}
