//Set domain
self.origin = "https://cfpng.health";

var hp_main = {};
hp_main.project_name = 'PG01 Helper';
hp_main.loc_assets = hp_loc + 'assets/';
hp_main.loc_data = hp_loc + 'data/';

window.top.postMessage("pg01healthdashboard", "*")

hp_main.pre_start = function() {
	//Do not change anything below this
	document.title = hp_main.project_name + hp_cpagename;
	
	hp_main.addDyn(hp_head, 'link', {'href': hp_loc + 'assets/css/bootstrap.min.css', 'rel': 'stylesheet'});
	var jq = hp_main.addDyn(hp_head, 'script', {'src': hp_loc + 'assets/js/jquery-3.7.0.min.js'});
	jq.onload = function() {
		hp_main.addDyn(hp_head, 'script', {'src': hp_loc + 'assets/cjs/jqmenabled.js'});
	};
	if(hp_configs['charts'] === true) {
		hp_main.addDyn(hp_head, 'script', {'src': hp_main.loc_assets + 'apex-charts/apexcharts.min.js'});
	}
	if(hp_configs['fancy_tables'] === true) {
		hp_main.addDyn(hp_head, 'script', {'src': hp_main.loc_assets + 'js/fancyTable.min.js'});
	}
	//Config only stuff
	if(hp_configs['data'] === true) {
		hp_main.addDyn(hp_head, 'script', {'src': hp_main.loc_data + 'ichos_data.js'});
	}
	//Non-standard stuff
	hp_main.addDyn(hp_head, 'link', {'href': hp_loc + 'assets/ccss/main.css', 'rel': 'stylesheet'});
	//Loadit
	if(typeof(dummyload) == 'function') {
		dummyload();
	}
};

hp_main.addDyn = function(appendp, eltime, kvp) {
	var nel = document.createElement(eltime);
	for(var a in kvp) {
		nel.setAttribute(a, kvp[a]);
	}
	appendp.append(nel);
	return nel;
};

hp_main.xsplit = function(sts) {
	var rtt = [];
	try {
		var mc = sts.split(';');
		for(var i = 0; i < mc.length; i++) {
			try {
				var qr = mc[i];
				var ns = qr.split('.', 2)[1].trim();
				if(ns.toLowerCase().search('covid') >= 0 || ns.toLowerCase().search('c19') >= 0 || ns.toLowerCase().search('c-19') >= 0 || ns.toLowerCase().search('coivd') >= 0) {
					ns = "COVID-19";
				}
				rtt.push(ns.toUpperCase());
			} catch(e) {
			}
		}
	} catch(e) {
	}
	return rtt;
};


//Start it off
hp_main.pre_start();