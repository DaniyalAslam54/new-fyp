// var pap = window.location.pathname;
// var papp = pap.split("/");
// alert(papp[1])

// document.getElementById("Information").onclick = function (e) {
// 	jQuery_3_6_1(papp[1]).removeClass('active');
// }
// if (papp[1] == "Information"  ) {
// 	jQuery_3_6_1("#Information").addClass('active');
// }
 


// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .side-dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})





// SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .toggle-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .divider');

if(sidebar.classList.contains('hide')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');

	if(sidebar.classList.contains('hide')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




sidebar.addEventListener('mouseleave', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})
	}
})



sidebar.addEventListener('mouseenter', function () {
	if(this.classList.contains('hide')) {
		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})




// PROFILE DROPDOWN
const profile = document.querySelector('nav .profile');
const imgProfile = profile.querySelector('img');
const dropdownProfile = profile.querySelector('.profile-link');

imgProfile.addEventListener('click', function () {
	dropdownProfile.classList.toggle('show');
})




// MENU
const allMenu = document.querySelectorAll('main .content-data .head .menu');

allMenu.forEach(item=> {
	const icon = item.querySelector('.icon');
	const menuLink = item.querySelector('.menu-link');

	icon.addEventListener('click', function () {
		menuLink.classList.toggle('show');
	})
})



window.addEventListener('click', function (e) {
	if(e.target !== imgProfile) {
		if(e.target !== dropdownProfile) {
			if(dropdownProfile.classList.contains('show')) {
				dropdownProfile.classList.remove('show');
			}
		}
	}

	allMenu.forEach(item=> {
		const icon = item.querySelector('.icon');
		const menuLink = item.querySelector('.menu-link');

		if(e.target !== icon) {
			if(e.target !== menuLink) {
				if (menuLink.classList.contains('show')) {
					menuLink.classList.remove('show')
				}
			}
		}
	})
})





// PROGRESSBAR
const allProgress = document.querySelectorAll('main .card .progress');

allProgress.forEach(item=> {
	item.style.setProperty('--value', item.dataset.value)
})






// APEXCHART
// var options = {
//   series: [{
//   name: 'series1',
//   data: [31, 40, 28, 51, 42, 109, 100]
// }, {
//   name: 'series2',
//   data: [11, 32, 45, 32, 34, 52, 41]
// }],
//   chart: {
//   height: 350,
//   type: 'area'
// },
// dataLabels: {
//   enabled: false
// },
// stroke: {
//   curve: 'smooth'
// },
// xaxis: {
//   type: 'datetime',
//   categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
// },
// tooltip: {
//   x: {
//     format: 'dd/MM/yy HH:mm'
//   },
// },
// };

// var chart = new ApexCharts(document.querySelector("#chart"), options);
// chart.render();


// var options = {
// 	series: [3, 4, 5, 5, 2],
// 	chart: {
// 		width: 400,
// 		type: 'donut',

// 	},
// 	plotOptions: {
// 		pie: {
// 			startAngle: -90,
// 			endAngle: 270
// 		}
// 	},
// 	labels: ["Super-Admin", "Admin", "Teachers", "Students", "Staff"],
// 	dataLabels: {
// 		enabled: false
// 	},
// 	fill: {
// 		type: 'gradient',
// 	},
// 	legend: {
// 		formatter: function (val, opts) {

// 			return val + " : " + opts.w.globals.series[opts.seriesIndex]
// 		}
// 	},

// 	responsive: [{
// 		breakpoint: 450,
// 		options: {
// 			chart: {
// 				height: 400,
// 				width: 450
// 			},
// 			legend: {
// 				position: 'top'
// 			}
// 		}
// 	}]
// };

// var chart = new ApexCharts(document.querySelector("#chart3"), options);
// chart.render();


// var options1 = {
// 	colors: ['#ff4560', '#13e090', '#775dd0'],
// 	series: [{
// 		name: 'Count',
// 		data: [4, 2, 9]
// 	}],
// 	chart: {

// 		height: 300,
// 		type: 'bar',
// 		events: {
// 			click: function (chart, w, e) {
// 				// console.log(chart, w, e)
// 			}
// 		}
// 	},

// 	plotOptions: {
// 		bar: {
// 			columnWidth: '50%',
// 			distributed: true,
// 		}
// 	},

// 	dataLabels: {
// 		enabled: true
// 	},
// 	legend: {
// 		show: true
// 	},
// 	xaxis: {
// 		categories: [
// 			['HI', 'DISABLED'],
// 			['VI', 'DISABLED'],
// 			['IDD', 'DISABLED'],

// 		],
// 		labels: {
// 			style: {

// 				fontSize: '12px'
// 			}
// 		}
// 	}

// };

// var chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
// chart1.render();




var options2 = {

	series: [{
		name: 'Count',
		data: [3, 4, 6, 8, 1, 2, 8]
	}],
	chart: {

		height: 300,
		type: 'bar',
		events: {
			click: function (chart, w, e) {
				// console.log(chart, w, e)
			}
		}
	},

	plotOptions: {
		bar: {
			columnWidth: '75%',
			distributed: true,
		}
	},

	dataLabels: {
		enabled: true
	},
	legend: {
		show: false
	},
	xaxis: {
		categories: [
			['Anthracnose'],
			['Bacterial', 'Canker'],
			['Black Soothy', 'Mold'],
			['Gall', 'Midge'],
			['Apoderus', 'Javanicus'],
			
			['Dappula', 'Tertia'],
			['Healthy'	],


		],
		labels: {
			style: {

				fontSize: '12px'
			}
		}
	}

};

var chart1 = new ApexCharts(document.querySelector("#chart2"), options2);
chart1.render();


var options2 = {
	series: [3, 4, 5, 5, 2],
	chart: {
		width: 400,
		type: 'donut',

	},
	plotOptions: {
		pie: {
			startAngle: -90,
			endAngle: 270
		}
	},
	labels: ["Anthracnose", "Bacterial Canker", "Black Soothy Mold", "Gall Midge", "Apoderus Javanicus"],
	dataLabels: {
		enabled: false
	},
	fill: {
		type: 'gradient',
	},
	legend: {
		formatter: function (val, opts) {

			return val + " : " + opts.w.globals.series[opts.seriesIndex]
		}
	},

	responsive: [{
		breakpoint: 450,
		options: {
			chart: {
				height: 400,
				width: 450
			},
			legend: {
				position: 'top'
			}
		}
	}]

};

var chart1 = new ApexCharts(document.querySelector("#chart4"), options2);
chart1.render();


