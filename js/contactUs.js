'use strict';


// store all the contact details on click of submit
function store() {
	var inputEmail = document.getElementById('email');
	localStorage.setItem('email', inputEmail.value);
	var inputPhone = document.getElementById('phone');
	localStorage.setItem('phone', inputPhone.value);
	var inputFName = document.getElementById('fname');
	localStorage.setItem('fname', inputFname.value);
	var inputLName = document.getElementById('lname');	
	localStorage.setItem('lname', inputLname.value);
	var inputMessage = document.getElementById('message');
	localStorage.setItem('message', inputMessage.value);				
	
}