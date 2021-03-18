var GRINDER_CAPACITY = 95;
var salt_length = 8;

function encrypt(meat, pepper, multiplier) {
	var instance, i, a, b, c, n;

	var meat_length = meat.length;
    var pepper_length = pepper.length;
    var bacon = meat.split('');
    
    for (instance = 0; instance < 0+multiplier; instance++) {
        pepper = pepper_shaker(pepper, instance);
		salt = salt_shaker(pepper);
		
		for (i = 0; i < meat_length; i++) {
            a = char_grinder(bacon[i], 'CHAR');
            b = char_grinder(pepper[i%pepper_length], 'CHAR');
			c = char_grinder(salt[i%salt_length], 'CHAR');
            n = (a + (b*b) + (c*c*c) + i%pepper_length)%GRINDER_CAPACITY;
			
			bacon[i] = char_grinder(n, 'NUM');
		}
	}
    return string(bacon);
}

function decrypt(bacon, pepper, multiplier, print_mode) {
	var instance, i, a, b, c, n;
	
	var bacon_length = bacon.length;
    var pepper_length = pepper.length;
    var meat = bacon.split('');
    
	for (instance = 0; instance < multiplier; instance++) {
		pepper = retrace_pepper(pepper, instance);
		salt = salt_shaker(pepper);
	}

    for (instance = multiplier-1; instance > -1; instance--) {
        for (i = 0; i < bacon_length; i++) {
            a = char_grinder(meat[i], 'CHAR');
            b = char_grinder(pepper[i%pepper_length], 'CHAR');
            c = char_grinder(salt[i%salt_length], 'CHAR');
			n = (a - (b*b) - (c*c*c) - i%pepper_length)%GRINDER_CAPACITY;

            while (n<0) {
				n += GRINDER_CAPACITY;
			}

            if(print_mode && instance==0)
                print(char_grinder(n, "NUM"));
            meat[i] = char_grinder(n,  'NUM');
		}
		pepper = pepper_shaker(pepper, instance);
		salt = salt_shaker(pepper);
	}
	if(!print_mode)
        return string(meat);
}

function pepper_shaker(pepper, instance) {
	pepper = pepper.split('');
    var pepper_length = pepper.length;
    
    if(instance == 1 || instance == 3) {
        pepper = pepper.reverse();
	}
    
    if(instance == 2) {
        for (var i = 0; i < pepper_length; i++) {
            if(i%2 == 0 && i != pepper_length-1) {
                temp_particle = pepper[i];
                pepper[i] = pepper[i+1];
			}
            if(i%2 == 1) {
                pepper[i] = temp_particle;
			}
		}
    }
	return string(pepper);
}

function retrace_pepper(pepper, instance) {
	pepper = pepper_shaker(pepper, instance);
	return pepper;
}

function salt_shaker(pepper, instance) {
	var A = 1, B = 0;
	for (var i = 0; i < pepper.length; i++) {
		A += char_grinder(pepper[i], 'CHAR');
		B += A;
	}
	return ("00000000" + ((A*B)**2)%99999999).slice(-8);
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
