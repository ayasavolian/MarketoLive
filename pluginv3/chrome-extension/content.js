console.log("Content > Running");
window.mkto_live_plugin_state = true;

var URL_PATH = "m3",
    LIVE_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/marketo-live.min.js",
    APP_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/marketo-app.min.js",
    POD_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/pods.min.js",
	DELIVERABILITY_TOOLS_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/deliverability-tools.min.js",
    DASHBOARD_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/dashboards/remote-data.min.js",
    RTP_DEEPLINK_SCRIPT_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/rtp-deeplink.min.js",
    ASSET_NAV_BAR_LOCATION = "https://marketolive.com/"+URL_PATH+"/v3/assets.html",
    RTP_NAV_BAR_LOCATION = "https://marketolive.com/"+URL_PATH+"/pluginv3/html/turner-rtp.html",
    currentUrl = window.location.href,
	mktoAppDomain = "^https:\/\/app-[a-z0-9]+\.marketo\.com",
	mktoAppMatch = "https://app-*.marketo.com",
	mktoLiveDomain = "^https:\/\/marketolive.com",
	mktoLiveMatch = "https://marketolive.com/*",
    mktoColorPicker = "^https:\/\/marketolive\.com[a-zA-Z0-9-\/]*\/color-picker\.html",
	mktoLoginDomain = "^https:\/\/login\.marketo\.com",
	mktoAppLoginDomain = "^https:\/\/app\.marketo\.com",
	mktoDesignerDomain = "^https:\/\/[a-z0-9]+-[a-z0-9]+\.marketodesigner\.com",
	mktoDesignerMatch = "https://*.marketodesigner.com/*",
	mktoEmailDesigner = mktoDesignerDomain + "/ds",
	mktoLandingPageDesigner = mktoDesignerDomain + "/lpeditor/",
	mktoWizard = mktoAppDomain + "/m#",
	rtpDemoDomain = "^http:\/\/sjrtp1.marketo.com\/demo\/$|^http:\/\/cloud4.insightera.com\/demo\/$",
	emailDeliverabilityDomain = "^https:\/\/250ok.com/",
	colorPickerPage = "\/color-picker\.html$",
    customCompanyLandingPage106Fragment = "LPE11381",
    customCompanyLandingPagePreview106Fragment = "LPP11381",
    customCompanyLandingPage106aFragment = "LPE10672",
    customCompanyLandingPagePreview106aFragment = "LPP10672",
    customCompanyLandingPage106bFragment = "LPE10768",
    customCompanyLandingPagePreview106bFragment = "LPP10768",
    customCompanyEmail106Fragment = "EME15464",
    customCompanyEmail106aFragment = "EME14240",
    customCompanyEmail106bFragment = "EME13924",
    form106Fragment = "FOE2892",
    form106aFragment = "FOE2532",
    form106bFragment = "FOE2472",
    push106Fragment = "MPNE29",
    push106aFragment = "MPNE29",
    push106bFragment = "MPNE2",
	loadScript,
	getCookie,
	setCookie;

loadScript = function(name) {
	console.log("Content > Loading: Script: "+name);
	
    var script = document.createElement("script");
    script.setAttribute("src", name);
    document.getElementsByTagName("head")[0].appendChild(script);
}

setCookie = function(cname, cvalue, exdays, domain, secure) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires + "; " + "path=/;" + "domain=" + domain + ";secure="+ secure +";";
}

getCookie = function(cookieField) {
	console.log("Content > Getting: Cookie");
	
    var name = cookieField + "=",
        cookies = document.cookie.split(';'),
        currentCookie;
    for (var ii = 0; ii < cookies.length; ++ii) {
        var currentCookie = cookies[ii].trim();
        if (currentCookie.indexOf(name) == 0) {
            return currentCookie.substring(name.length, currentCookie.length);
		}
    }
    return null;
}

/**************************************************************************************
 *
 *  main object that will pass the variables for which analyzer should be present using
 *  currPosition as the current position in the object array.
 *
 *  @Author Arrash
 *
 *  @class
 *
 **************************************************************************************/

Analyzer = function(pod) {
	console.log("Content > Constructor: Analyzer");
	
    this.currPosition = 0;
    this.pod = pod;
}

/**************************************************************************************
 *
 *  This method will insert an HTML template and a CSS sheet inside the template 
 *  directly into the header of the Marketo page via "Import" and runs asynchronously. 
 *  Then it binds the 'prev' and 'next' elements with a click function so that whenever 
 *  they are clicked it will call chooseAnalyzer and pass the element clicked.
 *
 *  @Author Arrash
 *
 *  @function
 *
 *  @namespace link
 *  @namespace importedDoc
 *  @namespace el
 *
 **************************************************************************************/

Analyzer.prototype.showAnalyzer = function() {
	console.log("Content > Displaying: Analyzer Navigation Bar");
	
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://marketolive.com/dev/pluginv3/html/analyzer.html", false);
    xmlHttp.send();
    var pageLoaded = function() {
        var newElement = document.createElement('div');
        newElement.innerHTML = xmlHttp.responseText;
        document.body.appendChild(newElement);
    }
    window.onload = pageLoaded();
}

Analyzer.prototype.showAssets = function() {
   var xmlHttp = new XMLHttpRequest();
   xmlHttp.open("GET", ASSET_NAV_BAR_LOCATION, false);
   xmlHttp.onreadystatechange = function() {
       if (4 != xmlHttp.readyState) {
           return;
       }
       if (200 != xmlHttp.status) {
           return;
       }
   };
   xmlHttp.send();

   var isMktEditor = window.setInterval(function() {
		if (document.querySelectorAll("body.mktPurple")[0] != null) {
			window.clearInterval(isMktEditor);
			
			var pageLoaded = function(response) {
				var newElement = document.createElement('div'),
					pod = getCookie("userPod");
				console.log("Content > Pod = " + pod);
				newElement.innerHTML = response;
				document.querySelectorAll("body.mktPurple")[0].appendChild(newElement);
			   
				switch(pod) {
				case "app-sjp":
					document.getElementById("ml-email-link").href = 
                        "https://na-sjp.marketodesigner.com/ds?explictHostname=app-sjp.marketo.com#"+customCompanyEmail106Fragment;
					document.getElementById("ml-form-link").href = 
                        "https://app-sjp.marketo.com/m#"+form106Fragment+"-DET";
					document.getElementById("ml-lp-link").href = 
                        "https://na-sjp.marketodesigner.com/lpeditor/editor?explictHostname=app-sjp.marketo.com#"+customCompanyLandingPage106Fragment;
					document.getElementById("ml-push-link").href="https://app-sjp.marketo.com/m#MPNE29"+push106Fragment;
					break;
                        
				case "app-ab07":
					document.getElementById("ml-email-link").href = 
                        "https://na-ab07.marketodesigner.com/ds?explictHostname=app-ab07.marketo.com#"+customCompanyEmail106aFragment;
					document.getElementById("ml-form-link").href = 
                        "https://app-ab07.marketo.com/m#"+form106aFragment+"-DET";
					document.getElementById("ml-lp-link").href = 
                        "https://na-ab07.marketodesigner.com/lpeditor/editor?explictHostname=app-ab07.marketo.com#"+customCompanyLandingPage106aFragment;
					document.getElementById("ml-push-link").href=
                        "https://app-ab07.marketo.com/m#"+push106aFragment+"-SU";
					break;
                        
				case "app-ab08":
					document.getElementById("ml-email-link").href = 
                        "https://na-ab08.marketodesigner.com/ds?explictHostname=app-ab08.marketo.com#"+customCompanyEmail106bFragment;
					document.getElementById("ml-form-link").href = 
                        "https://app-ab08.marketo.com/m#"+form106bFragment+"-DET";
					document.getElementById("ml-lp-link").href = 
                        "https://na-ab08.marketodesigner.com/lpeditor/editor?explictHostname=app-ab08.marketo.com#"+customCompanyLandingPage106bFragment;
					document.getElementById("ml-push-link").href=
                        "https://app-ab08.marketo.com/m#"+push106bFragment;
					break;
                        
				default:
					break;
				}
			}
		pageLoaded(xmlHttp.responseText);
		}
   }, 0);
}

var port = chrome.runtime.connect({
	name: "mycontentscript"
});

window.onload = function() {
    console.log("Content > Window: Loaded");
    
//    if (currentUrl.search(mktoLiveDomain) != -1) {
//        console.log("Content > Displaying Go Agile Button");
//        
//        document.getElementById("first-option").style.display = "inline-block";
//    }

    if (currentUrl.search(mktoAppDomain) != -1
	&& currentUrl.search(mktoDesignerDomain) == -1
	&& currentUrl.search(mktoWizard) == -1) {
		console.log("Content > Location: Marketo App");
		
		var oppInfluenceAnalyzerFragment = "AR1559A1!",
			programAnalyzerFragment = "AR1544A1!",
			modeler106Fragment = "RCM39A1!",
			modeler106abFragment = "RCM5A1!",
			successPathAnalyzerFragment = "AR1682A1!";
		
        loadScript(POD_SCRIPT_LOCATION);
        loadScript(APP_SCRIPT_LOCATION);
		loadScript(DASHBOARD_SCRIPT_LOCATION);
		
		if (currentUrl.search(mktoAppDomain + "/#" + oppInfluenceAnalyzerFragment) != -1
		|| currentUrl.search(mktoAppDomain + "/#" + programAnalyzerFragment) != -1
		|| currentUrl.search(mktoAppDomain + "/#" + modeler106Fragment) != -1
		|| currentUrl.search(mktoAppDomain + "/#" + modeler106abFragment) != -1
		|| currentUrl.search(mktoAppDomain + "/#" + successPathAnalyzerFragment) != -1) {
			console.log("Content > Location: Analyzers");
		
			Analyzer.prototype.showAnalyzer();
		}
    }
	
    else if (currentUrl.search(mktoDesignerDomain) != -1
	|| currentUrl.search(mktoWizard) != -1) {
        console.log("Content > Location: Designer/Wizard");
        
        loadScript(APP_SCRIPT_LOCATION);
        
        if (currentUrl.search(customCompanyLandingPage106Fragment) != -1
        || currentUrl.search(customCompanyLandingPage106aFragment) != -1
        || currentUrl.search(customCompanyLandingPage106bFragment) != -1
        || currentUrl.search(customCompanyLandingPagePreview106Fragment) != -1
        || currentUrl.search(customCompanyLandingPagePreview106aFragment) != -1
        || currentUrl.search(customCompanyLandingPagePreview106bFragment) != -1
        || currentUrl.search(customCompanyEmail106Fragment) != -1
        || currentUrl.search(customCompanyEmail106aFragment) != -1
        || currentUrl.search(customCompanyEmail106bFragment) != -1
        || currentUrl.search(form106Fragment) != -1
        || currentUrl.search(form106aFragment) != -1
        || currentUrl.search(form106bFragment) != -1
        || currentUrl.search(push106Fragment) != -1
        || currentUrl.search(push106aFragment) != -1
        || currentUrl.search(push106bFragment) != -1) {
            console.log("Content > Location: Asset with Nav Bar");
            
            Analyzer.prototype.showAssets();
        }
    }
	
    else if (currentUrl.search(mktoColorPicker) != -1) {
		console.log("Content > Location: Color-Picker Page");
        
        var correct = document.getElementById('correct'),
            incorrect = document.getElementById('incorrect'),
			submitCookies;
		
		submitCookies = function() {
            var cookieColor = document.getElementById("cookie-color").innerHTML,
                // The split gets rid of the image size in the URL parameter
                cookieLogo = document.getElementById("cookie-logo").innerHTML.split("?")[0];

            chrome.runtime.sendMessage({
                action: "setColorCookie",
                color: cookieColor,
                logo: cookieLogo
            }, function(response) {
                console.log("Content > Received Response from Background Color Cookie Request: " + response);
            });
            window.close();
        }

        correct.onclick = submitCookies;
		
		document.onkeyup = function (e) {
			if (e.which == 13) {
				submitCookies();
			}
		}
        
        incorrect.onclick = function() {
            document.getElementById('first').style.display = "none";
            document.getElementById('second').style.display = "block";
            document.getElementById('second-incorrect').style.display = "block";
        }
    }

    else if (currentUrl.search(rtpDemoDomain) != -1) {
		console.log("Content > Location: RTP Demo");
		
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", RTP_NAV_BAR_LOCATION, false);
        xmlHttp.send(null);
        var pageLoaded = function() {
            var newElement = document.createElement('div');
            newElement.innerHTML = xmlHttp.responseText;
            document.getElementById("demo-page").appendChild(newElement);
            loadScript(RTP_DEEPLINK_SCRIPT_LOCATION);
        }
        window.onload = pageLoaded();
    }
	
	else if (currentUrl.search("250ok\.com\/") != -1) {
		console.log("Content > Location: Deliverability Tools");
		
		loadScript(DELIVERABILITY_TOOLS_SCRIPT_LOCATION);
	}
}