'use strict';


// store all the contact details on click of submit
function store() {
	var inputEmail = document.getElementById('email');
	var inputPhone = document.getElementById('phone');
	var inputFName = document.getElementById('fname');
	var inputLName = document.getElementById('lname');	
	var inputMessage = document.getElementById('message');

	var contact = {	'email': inputEmail,
					'phone': inputPhone,
					'fname': inputFName,
					'lname': inputLName,
					'message': inputMessage }

	var contacts = [];
	contacts.push(contact);
	
	// store contacts array to local storage
	localStorage.setItem('contacts', JSON.stringify(contacts));				
	
}