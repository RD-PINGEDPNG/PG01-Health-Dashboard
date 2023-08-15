//Document readyState
var jqen = {};
jqen.navo = [
{
	'title': 'Home',
	'type': 'basic',
	'link': hp_loc + 'index.html',
	'code': 'HOME'
},
{
	'title': 'Projects',
	'type': 'dropdown',
	'content': [
		{'title': 'PG01-009: AIC', 'link': '#'},
		{'title': 'PG01-013: APCHOS', 'link': '#'}
	],
	'code': 'PROJECTS'
},
{
	'title': 'About',
	'type': 'basic',
	'link': hp_loc + 'about.html',
	'code': 'ABOUT'
}
];
jqen.repwords = {
	'pname': hp_main.project_name
};
$(document).ready(function(){
	hp_main.addDyn(document.querySelector('body'), 'script', {'src': hp_loc + 'assets/js/bootstrap.bundle.min.js'});
	//Run replacements
	jqen.runRep();
	//Append header/footers
	jqen.build_nav();
	jqen.build_foot();
	if(typeof(hp_init) == 'function') {
		hp_init();
	}
});

jqen.runRep = function() {
	var allreq = $('[hp_rep]');
	for(var i = 0; i < allreq.length; i++) {
		var qr = allreq[i];
		var atts = qr.getAttribute('hp_rep');
		qr.innerHTML = jqen.repwords[atts];
	}
}

jqen.build_nav = function() {
	var html = '<nav class="navbar navbar-expand-md navbar-dark bg-cf fixed-top" aria-label="Fourth navbar example">';
    html += '<div class="container-fluid">'
    html += '<a class="navbar-brand" href="' + hp_loc + 'index.html">' + hp_main.project_name + '</a>';
    html += '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">';
    html += '<span class="navbar-toggler-icon"></span>';
    html += '</button>'

    html += '<div class="collapse navbar-collapse" id="navbarsExample04">';
    html += '<ul class="navbar-nav me-auto mb-2 mb-md-0">';
	var nav = "";
	for(var i = 0; i < jqen.navo.length; i++) {
		let qr = jqen.navo[i];
		var exclass = "";
		var exaria = "";
		if(qr['type'] == 'basic') {
			if(hp_pcode == qr['code'] || hp_incode == qr['code']) {
				exclass = " active";
				exaria = " aria-current=\"page\" ";
			}
			if(qr['disabled'] === true) {
				exclass += ' disabled';
			}
			nav += '<li class="nav-item">';
			nav += '<a class="nav-link' + exclass + '"' + exaria + ' href="' + qr['link'] + '">' + qr['title'] + '</a>';
			nav += '</li>';
		} else if(qr['type'] == 'dropdown') {
			nav += '<li class="nav-item dropdown">';
			if(hp_incode == qr['code']) {
				exclass = " active";
			}
			nav += '<a class="nav-link dropdown-toggle' + exclass + '" href="#" data-bs-toggle="dropdown" aria-expanded="false">' + qr['title'] + '</a>';
            nav += '<ul class="dropdown-menu">';
			for(var a = 0; a < qr['content'].length; a++) {
				let aqr = qr['content'][a];
				exclass = "";
				if(aqr['code'] == hp_pcode) {
					exclass = " active";
				}
				nav += '<li><a class="dropdown-item' + exclass + '" href="' + aqr['link'] + '">' + aqr['title'] + '</a></li>';
			}
            nav += '</ul></li>';
		}
	}
    html += nav;
    html += '</ul>';
	html += '</div></div></nav>';
	$('body').html(html + $('body').html());
};

jqen.build_foot = function() {
	var html = "";
	html += '<footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">';
    html += '<div class="col mb-3">';
    html += '<a href="' + hp_loc + 'index.html" class="d-flex align-items-center mb-3 link-dark text-decoration-none">';
    html += '<img class="bi me-2" width="40" height="40" src="' + hp_loc + 'assets/logos/rd.svg"></a>';
    html += '<p class="text-muted">&copy; Romeo Dabok 2023</p><p>Got an issue or suggestion? Please contact ';
	html += 'me via <a href="mailto:romeo.dabok@gmail.com">email</a> or <a href="tel:+67574295680">mobile</a>!</div>';
    html += '<div class="col mb-3"></div>';

    html += '<div class="col mb-3"><h5>External Links</h5><ul class="nav flex-column">';
	html += '<li class="nav-item mb-2"><a href="https://www.cfpngfms.com" target="_blank" class="nav-link p-0 text-muted">FMS</a></li>';
	html += '<li class="nav-item mb-2"><a href="https://teamchildfund.bamboohr.com/" target="_blank" class="nav-link p-0 text-muted">Bamboo HR</a></li>';
    html += '<li class="nav-item mb-2"><a href="https://childfundhive.my.salesforce.com/" target="_blank" class="nav-link p-0 text-muted">Salesforce</a></li>';   
	html += '</ul></div>';
	html += '</footer>';
	$('body').html($('body').html() + html);
};

jqen.ifUrlExist = function(url, callback) {
    let request = new XMLHttpRequest;
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.setRequestHeader('Accept', '*/*');
    request.onprogress = function(event) {
        let status = event.target.status;
        let statusFirstNumber = (status).toString()[0];
        switch (statusFirstNumber) {
            case '2':
                request.abort();
                return callback(true);
            default:
                request.abort();
                return callback(false);
        };
    };
    request.send('');
};