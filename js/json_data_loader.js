
let loadGallery = (galleryDataArray) => {
	let appendRow;

	//console.log(galleryDataArray.length);
	
	for(let i = 0; i < galleryDataArray.length; i++) {
		let titleName = galleryDataArray[i].name;
		let imageUrl = galleryDataArray[i].url;
		/*let imageInfo = galleryDataArray[i].info;
		let imageUploadedDate = galleryDataArray.uploaded_date;*/
		if(i == 0 || i % 3 == 0) {
			appendRow = $("<div class='row' style='margin-top: 18px;'></div>").appendTo("#My-Gallery");
		}
		$("<div class='col-4'><div class='card' style='width: 18rem;' onclick='openThisCard(event)'> <img class='card-img-top' src='" + imageUrl +"' alt='Card image cap'><div class='card-body' <h5 class='card-title'>" + titleName + "</h5><div></div></div>").appendTo(appendRow);
	}

	
}


function loadSampleJSON(callback) {   

    let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'gallery_data_test.json', true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}

function init() {
 loadSampleJSON(function(response) {

    let sampleJson = JSON.parse(response);
    localStorage.setItem("galleryData", JSON.stringify(sampleJson));
    console.log(sampleJson);
 });
}

let loadJsonData = () => {
	//Initialise sample data
	let newItem = localStorage.getItem("galleryData");

	if(null == newItem) {

		/*let jsonObject = JSON.parse('{"gallery_data":[]}');
		let firstItem = {"name" : "Sample 1","url" : "http://www.gstatic.com/webp/gallery/1.webp","info" : "Some Information about the image","uploaded_date": "15/01/2018"};
		let secondItem = {"name" : "Sample 2","url" : "http://www.gstatic.com/webp/gallery/2.webp","info" : "Some Information about the image","uploaded_date": "15/01/2018"};
		let thirdItem = {"name" : "Sample 3","url" : "http://www.gstatic.com/webp/gallery/4.webp","info" : "Some Information about the image","uploaded_date": "15/01/2018"};
		jsonObject['gallery_data'].push(firstItem);
		jsonObject['gallery_data'].push(secondItem);
		jsonObject['gallery_data'].push(thirdItem);
		localStorage.setItem("galleryData", JSON.stringify(jsonObject));*/

		//call this to get data from json file
		init();
	}

	let item = localStorage.getItem("galleryData");
	let jsonObject = JSON.parse(item);
	let galleryDataArray = jsonObject['gallery_data'];
	//console.log(galleryDataArray[0].name);
	loadGallery(galleryDataArray);
}
let today = () => {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1;

	let yyyy = today.getFullYear();
	if(dd < 10){
	    dd='0'+dd;
	} 
	if(mm < 10){
	    mm = '0' + mm;
	} 
	let date = dd + '/' + mm + '/' + yyyy;
	return date;
}
let isEmpty = (value) => {
	return (null == value) || (value == "");
}

let onlySpaces = (value) => {
	for(let i = 0 ; i < value.length; i++) {
		if(value[i] != ' ') return false;
	}
	return true;
}

let validateNewData = () => {
	let imageName = document.getElementById("imageName").value;
	let imageUrl = document.getElementById("imageUrl").value;
	let imageInfo = document.getElementById("imageInfo").value;
	let imageUploadeDate = document.getElementById("imageUploadeDate").value;
	let nameRegex = /^[A-Za-z0-9 ]{3,20}$/;;
	let urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	let errors = [];
	if(isEmpty(imageName) ||  onlySpaces(imageName) || !nameRegex.test(imageName)) {
		errors[errors.length] = "Please Enter Valid Name no special characters(min - 3 & max - 20)";
	}
	if(!urlRegex.test(imageUrl)) {
		errors[errors.length] = "Please Enter Valid Url";
	}
	if(isEmpty(imageInfo)) {
		errors[errors.length] = "Please Enter Some Information About the Image";
	}
	if(isEmpty(imageUploadeDate) || imageUploadeDate > today()) {
		errors[errors.length] = "Please Enter Valid Date";
	}
	if(errors.length > 0) {
		reportErrors(errors);
		return false;
	}
	return true;
}

function reportErrors(errors){
	var msg = "Please Enter Valid Data...\n";
	for (var i = 0; i<errors.length; i++) {
 		var numError = i + 1;
  		msg += "\n" + numError + ". " + errors[i];
	}
 	alert(msg);
}

function remove(array, index) {
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function addNewImage() {
	if(!validateNewData()) return false
	let imageName = document.getElementById("imageName").value;
	let imageUrl = document.getElementById("imageUrl").value;
	let imageInfo = document.getElementById("imageInfo").value;
	let imageUploadeDate = document.getElementById("imageUploadeDate").value;

	let newImageObject = {"name" : imageName,"url" : imageUrl,"info" : imageInfo,"uploaded_date": imageUploadeDate};
	let item = localStorage.getItem("galleryData");
	let jsonObject = JSON.parse(item);
	jsonObject['gallery_data'].push(newImageObject);

	localStorage.setItem("galleryData", JSON.stringify(jsonObject));
	return true;
}

function setData(colIndex, rowIndex) {
	let item = localStorage.getItem('galleryData');
	let jsonObject = JSON.parse(item);
	let galleryDataArray = jsonObject['gallery_data'];

	let clickedElementIndex = rowIndex * 3 + colIndex;
	localStorage.setItem("current_item", JSON.stringify(galleryDataArray[clickedElementIndex]));
	localStorage.setItem("current_item_index", "" + clickedElementIndex);
	
}

function getData() {
	let item = localStorage.getItem("current_item");

	let sentData = JSON.parse(item);
	let imageName = sentData.name;
	let imageUrl = sentData.url;
	let imageInfo = sentData.info;
	let imageUploadedDate = sentData.uploaded_date;

	document.getElementById("img").src = imageUrl;
	document.getElementById("imageName").value = imageName;
	document.getElementById("imageUrl").value = imageUrl;
	document.getElementById("imageInfo").value = imageInfo;
	document.getElementById("imageUploadeDate").value = imageUploadedDate;

}

function saveData() {
	if(!validateNewData()) return false;
	let jsonObject = JSON.parse(localStorage.getItem("galleryData"));
	let galleryDataArray = jsonObject['gallery_data'];
	let index = localStorage.getItem('current_item_index');
	let imageName = document.getElementById("imageName").value;
	let imageUrl = document.getElementById("imageUrl").value;
	let imageInfo = document.getElementById("imageInfo").value;
	let imageUploadeDate = document.getElementById("imageUploadeDate").value;
	let newItem = {"name" : imageName,"url" : imageUrl,"info" : imageInfo,"uploaded_date": imageUploadeDate};

	 
	galleryDataArray[index] = newItem;
	localStorage.setItem("galleryData", JSON.stringify(jsonObject));
	return true;
}

function deleteCard() {
	let jsonObject = JSON.parse(localStorage.getItem("galleryData"));
	let galleryDataArray = jsonObject['gallery_data'];
	let index = localStorage.getItem('current_item_index');
	remove(galleryDataArray, index);
	console.log(galleryDataArray);
	localStorage.setItem("galleryData", JSON.stringify(jsonObject));
}

function validateContactForm() {
	let name = document.getElementById("sender_name").value;
	let email = document.getElementById("sender_email").value;
	let message = document.getElementById("sender_message").value;
	let nameRegex = /^[A-Za-z0-9 ]{3,20}$/;;
	let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let errors = [];
	if(isEmpty(name) ||  onlySpaces(name) || !nameRegex.test(name)) {
		errors[errors.length] = "Please Enter Valid Name no special characters(min - 3 & max - 20)";
	}
	if(!emailRegex.test(email)) {
		errors[errors.length] = "Please Enter Valid Email";
	}
	if(isEmpty(message) || onlySpaces(message)) {
		errors[errors.length] = "Please Enter some message";
	}
	if(errors.length > 0) {
		reportErrors(errors);
		return false;
	}
	return true;
}