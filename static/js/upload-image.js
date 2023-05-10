
let files = [],
	dragArea = document.querySelector('.drag-area'),
	input = document.querySelector('.drag-area input'),
	button = document.querySelector('.card button'),
	select = document.querySelector('.drag-area .select'),
	container = document.querySelector('.container');
var filesToUpload = []; //store files

/** CLICK LISTENER */
select.addEventListener('click', () => input.click());

/* INPUT CHANGE EVENT */
input.addEventListener('change', () => {
	let file = input.files;

	// if user select no image
	if (file.length == 0) return;
	if ((files.length + file.length) <= 10) {
		for (let i = 0; i < file.length; i++) {
			if (file[i].type.split("/")[0] != 'image') continue;
			var x = file[i].size / 1024 / 1024
			if (x >= 1) {
				M.toast({ html: `Max Allowed Size is 1MB!!`, classes: 'red rounded' });
				// alert("Max Allowed Size is 1MB")
				continue;
			}
			if (!files.some(e => e.name == file[i].name)) {

				files.push(file[i]);
			}
		}
	}
	else {
		M.toast({ html: `Only 10 Images Allowed one Time!!`, classes: 'red rounded' });
		// alert("Only 10 Images Allowed one Time")
	}
	showImages();
});

/** SHOW IMAGES */
function showImages() {
	container.innerHTML = files.reduce((prev, curr, index) => {
		return `${prev}
		    <div class="image">
			    <span onclick="delImage(${index})">&times;</span>
			    <img src="${URL.createObjectURL(curr)}" />
			</div>`
	}, '');
}

/* DELETE IMAGE */
function delImage(index) {
	files.splice(index, 1);
	filesToUpload.splice(index, 1)
	showImages();
}

/* DRAG & DROP */
dragArea.addEventListener('dragover', e => {
	e.preventDefault()
	dragArea.classList.add('dragover')
})

/* DRAG LEAVE */
dragArea.addEventListener('dragleave', e => {
	e.preventDefault()
	dragArea.classList.remove('dragover')
});

/* DROP EVENT */
dragArea.addEventListener('drop', e => {
	e.preventDefault()
	dragArea.classList.remove('dragover');

	let file = e.dataTransfer.files;
	for (let i = 0; i < file.length; i++) {
		/** Check selected file is image */
		if (file[i].type.split("/")[0] != 'image') continue;

		if (!files.some(e => e.name == file[i].name)) files.push(file[i])
	}
	showImages();
});



jQuery_3_6_1(document).ready(function (readyEvent) {



	//upload file
	jQuery_3_6_1('#filee').on('change', function () {

		// jQuery_3_6_1("#upload_prev").html('');

		fileCounter = this.files.length; //count files

		//Store all files to our main array
		var files = this.files;
		for (var i = 0; i < files.length; i++) {
			var x = files[i].size / 1024 / 1024

			if (x <= 1) {
				filesToUpload.push(files[i]);
			}
			else {
				continue
			}


		}

	});


	//Demo Upload button
	jQuery_3_6_1(document).on('click', '#upload_file', function () {
		if (filesToUpload.length) {
			if (document.getElementById("titling").innerText == "--Select Specie--") {
				M.toast({ html: "Select Specie from the Dropdown.", classes: 'red rounded' });
			}
			else if (document.getElementById("title_farm").innerText == "--Select Farm/Orchid--") {
				M.toast({ html: "Select Farm from the Dropdown.", classes: 'red rounded' });
			}
			else {

				var form_data = new FormData();
				var ins = document.getElementById('filee').files.length;


				for (var x = 0; x < filesToUpload.length; x++) {
					form_data.append("files[]", filesToUpload[x]);
				}
				form_data.append("farm", jQuery_3_6_1("#title_farm").attr('name'));
				
				form_data.append("specie_name", document.getElementById("titling").innerText);
				M.toast({ html: `Please Wait`, classes: 'green rounded' });
				jQuery_3_6_1.ajax({
					url: '/upload', // point to server-side URL
					dataType: 'json', // what to expect back from server
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,
					type: 'post',
					 
					complete: function (data) {
						console.log(data.responseText);
						M.Toast.dismissAll();
						M.toast({ html: "Processing  Done.", classes: 'green rounded' });
						for (var w = filesToUpload.length - 1; w >= 0; w--) {
							delImage(w)
						}
						// var delayInMilliseconds = 1000; //1 second
						// console.log(result);
						// setTimeout(function () {
							// localStorage.setItem("user_id", firebase.auth().currentUser.uid);
							// window.location.href = 'main_page.html';
							

						// }, delayInMilliseconds);
						var table_li =  data.responseText.split("+")
						for(var k = 0; k < table_li.length;k++){
							var insider = table_li[k].split("@")
							if(table_li[k] == "" ){
								continue;
							}
							if (insider[1] == "normal"){
								jQuery_3_6_1("#tabledata").append(`<tr  class="text-center">
										<td>${k+1}</td>
										<td>${insider[0]}</td>
										<td>no</td>
										<td>${insider[1]}</td>
										
										<td>${Math.round(insider[2] * 100) }%</td>
										<td>${insider[3]}</td>
									</tr>`)
							}
							else{
								jQuery_3_6_1("#tabledata").append(`<tr  class="text-center">
										<td>${k+1}</td>
										<td>${insider[0]}</td>
										<td>yes</td>
										<td>${insider[1]}</td>
										<td>${Math.round(insider[2] * 100) }%</td>
										<td>${insider[3]}</td>
									</tr>`)
							}
							
						   
						}
						
						
						var delayInMilliseconds = 2500; //1 second
						setTimeout(function () {
							M.Toast.dismissAll();
							document.getElementById("cen").style.display = "none";
						document.getElementById("table-main").style.visibility = "initial";
						document.getElementById("pdf").style.visibility = "visible";
						document.getElementById("csv").style.visibility = "visible";
					  
						  }, delayInMilliseconds);
						
					}
				})
			}
		}

		else {
			M.Toast.dismissAll();
			M.toast({ html: `Nothing to upload!!`, classes: 'orange rounded' });

		}
	})


});



