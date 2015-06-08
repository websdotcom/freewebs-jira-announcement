jQuery().ready(function(){ if(jQuery('#header-details-user-fullname').length === 0){ jQuery('#helpEmail').show(); } });



var USER;
jQuery(function() {
	USER = jQuery('#header-details-user-fullname').data();
	console.log(USER);
});
var WEBS = {
	boards: {
		'Architects': {
			id: 58,
			nav: 'Architects',
			navCat: 'Identity',
			bodyClass: 'architects'
		},
		'Moon Sharks': {
			id: 139,
			bodyClass: 'moonsharks',
			moonSharkBoard: true,
			suppressStoryPoints: true
		},
		'MoonSharksKanban': {
			id: 153,
			nav: 'Moon Sharks',
			navCat: 'Identity',
			bodyClass: 'moonsharks',
			moonSharkBoard: true,
			suppressStoryPoints: true
		},
		'SPECTRE': {
			id: 138,
			nav: 'SPECTRE',
			navCat: 'Identity',
			bodyClass: 'spectre'
		},
		'Thoroughbreds': {
			id: 99,
			nav: 'Thoroughbreds',
			navCat: 'Identity',
			bodyClass: 'mustang'
		},
		'Watchmen': {
			id: 60,
			nav: 'Watchmen',
			navCat: 'Identity',
			bodyClass: 'Watchmen'
		},
		'Watchmen (Archimedes)': {
			id: 167,
			//nav: 'Watchmen',
			//navCat: 'Identity',
			bodyClass: 'Watchmen'
		},
		//'Flying Squirrels': {
		//	id: 58,
		//	nav: 'Squirrels',
		//	bodyClass: 'flyingsquirrels'
		//},

		'Launch in Progress': {
			id: 150,
			nav: 'LIPs',
			navCat: 'Marketing',
			bodyClass: 'lips',
			//customize: lipsCode
		},
		'Local Legend': {
			id: 149,
			nav: 'Local Legend',
			navCat: 'Marketing',
			bodyClass: 'local'
		},
		'Breaking Ads': {
			id: 152,
			nav: 'Breaking Ads',
			navCat: 'Marketing',
			bodyClass: 'bads'
		},
		'DCTD' : {
			id: 137,
			//nav: 'DCTD',
			navCat: 'Marketing',
			bodyClass: 'dctd'
		},
		//'Pagemodo': {
		//	id: 109,
		//	bodyClass: 'pagemodo',
		//	nav: 'Pagemodo',
		//	isCurrentBoard: function() {
		//		return window.location.href.toLowerCase().indexOf("pagemodo") >= 0;
		//	}
		//},

		'Space Laser Cats': {
			id: 174,
			nav: 'Space Laser Cats',
			navCat: 'Other',
			bodyClass: 'lasercats'
		},
		'Ghostbusters': {
			id: 81,
			nav: 'Ghostbusters',
			navCat: 'Other',
			bodyClass: 'shawn'
		},
		'Impediments': {
			id: 98,
			nav: 'Impediments',
			navCat: 'Other',
			bodyClass: 'snorelax'
		},
		'Prod Support': {
			id: 87,
			nav: 'Prod Support',
			navCat: 'Other',
			bodyClass: 'prodSupport'
		},
		'Design': {
			id: 65,
			nav: 'Dangerrr',
			navCat: 'Other',
			bodyClass: 'dangerrr',
			customize: function() {
				jQuery(window).resize(jQuery.proxy(function() {
					this.updateHeaders();
                                }, this));
                                this.updateHeaders();
			},
			updateHeaders: function() {
				jQuery('.aui-theme-default.dangerrr #header .aui-header #logo a').css({
						'height': (jQuery(window).height() * 0.15),
						'background-size': ((jQuery(window).height() * 0.15) / 260 * 100) + "%"
				});
				WEBS.fixHeaders();
			}
		},
		'Zeki': {
			id: 92,
			bodyClass: 'Zeki'
		},
		'SEO': {
			id: 101,
			bodyClass: 'seo seo' + Math.floor( Math.random() * 4)
		},
		'Crush': {
			id: -1,
			bodyClass: 'crush',
			isCurrentBoard: function() {
				return document.title.indexOf("Crush") === 0;
			}
		},
		'PLEX': {
			id: 124,
			bodyClass: 'peeps'
		},
		'Musketeers': {
			id: 127,
			bodyClass: 'musketeers'
		}
	},

	currentBoard: null,
	currentBoardDeferred: new jQuery.Deferred(),
	detectBoard: function() {
		jQuery.each(WEBS.boards, function(key, board) {
			if (window.location.href.indexOf('rapidView=' + board.id) > 0 || (board.isCurrentBoard && board.isCurrentBoard())) {
				WEBS.currentBoard = board;
				return false;
			}
		});
		if (!WEBS.currentBoard) {
			WEBS.currentBoard = WEBS.boards[jQuery.trim(jQuery('#customfield_10910-val').text())];
		}
		if (WEBS.currentBoard) {
			console.log('Current Board:');
			console.log(WEBS.currentBoard);
			WEBS.currentBoardDeferred.resolve();
		} else {
			console.log('NO BOARD FOUND');
		}
	},

	cleanupBoard: function() {
		var $body = jQuery('body');
		jQuery.each(WEBS.boards, function(key, board) {
			if (board.bodyClass) {
				$body.removeClass(board.bodyClass);
			}
		});
	},

	commonBoardUpdates: function() {
		// Fix header sizing
		WEBS.fixHeaders();

		// Add class to body
		if (WEBS.currentBoard.bodyClass) {
			jQuery('body').addClass(WEBS.currentBoard.bodyClass);
		}

		// Annoying squirrel crap
		/*
		setInterval(function () {
			if(Math.floor(Math.random()*500) == 1){
				console.log('Flying squirrels are nocturnal, so they should only fly at night.');
				jQuery('<img src="http://nickswider.com/jira/FlyingSquirrelsLarge.png" width="150" style="position:absolute; top:45%; right:0;">').appendTo("body").animate({right:'100%'}, 1300);
			}
		}, 3000);*/
	},
	fixHeaders: function() {
		var $poolColumn = jQuery('#ghx-pool-column');
		if ($poolColumn.length > 0 && $poolColumn.offset()) {
			jQuery('#ghx-column-header-group').css('top', $poolColumn.offset().top);
		}
		else {
			setTimeout(WEBS.fixHeaders, 500);
		}
	},
	initAutoRefresh: function() {
		if(window.location.search.indexOf('bestTeam=squirrels') > 0) {
			var interval = window.setInterval(function() {
				if(jQuery("#ghx-update-message").text().indexOf("This board has been updated") >= 0) {
					document.location.reload(true);
				}
			},10000);
		}
	},
	addQuickScrum: function() {
		if (jQuery('#quickscrum').length === 0) {
			var linkCats = {};
			var keys = [];
			jQuery.each(WEBS.boards, function(key) {
				keys.push(key);
			});
			jQuery.each(keys, function(idx, key) {
				var board = WEBS.boards[key];
				if (board.nav) {
					var url = 'https://jira.freewebs.com/secure/RapidBoard.jspa?rapidView=' + board.id;
					url += '&quickFilter=173&quickFilter=177&quickFilter=188&quickFilter=183&quickFilter=245&quickFilter=239';
					cat = board.navCat ? board.navCat : 'Other';
					if(!linkCats[cat]){
						linkCats[cat] = [];
					}
					linkCats[cat].push(jQuery('<a/>', { href: url }).text(board.nav));
				}
			});
			if (Object.keys(linkCats).length > 0) {
				var $quickScrum = jQuery('<div/>', { id: 'quickscrum' }).appendTo('#header .aui-header');
				for (var cat in linkCats) {
					var $cat = jQuery('<div/>', { class: 'quickscrum-category' }).text(cat).appendTo($quickScrum);
					var $boardList = jQuery('<div/>').appendTo($cat);
					jQuery.each(linkCats[cat], function(idx, $el) {
						$boardList.append($el);
					});
				}
			}
		}
	},

	doBitPoints: function() {
		if(jQuery('#key-val').length > 0) {
			var ticketId = jQuery('#key-val').text();
			var ticketTitle = jQuery('#summary-val').text();
			var ticketPath = 'addTicketCookie?ticketSystem=jira&ticketHost=jira.freewebs.com&ticketID=' + ticketId;
			ticketPath += '&ticketTitle=' + encodeURI(ticketTitle);

			jQuery('<img/>', { src: 'http://bitpoints.io/' + ticketPath })
				.css({ width: '1px', height: '1px', position: 'absolute' })
				.appendTo('body');
			//jQuery('<img/>', { src: 'http://localhost:3000/' + ticketPath })
			//	.css({ width: '1px', height: '1px', position: 'absolute' })
			//	.appendTo('body');
		}
	},

	/********************
	 * Calculate Points outside of GreenHopper
	 *******************/
	showPts: function(DOMWindow, preserveLink) {
		var $devCells = jQuery('.customfield_11511', DOMWindow); // D_pts = 10182; Points = 11310; BitPoints = 11511;
		if($devCells.size() > 0){
			var ticketPts = $devCells.text().replace(/ +/g, ',').split(',').map(function(el){ return el === '' ? 0 : parseFloat(el.trim()); });
			var total = 0;
			jQuery.each(ticketPts, function(){ total += this; });
			total = Math.round(total*1000)/1000; //hack around JS float bug
			var
				$resEl = jQuery('.results-count', DOMWindow),
				resSummary = $resEl.html().substring(0, $resEl.html().lastIndexOf("."));
			if(preserveLink){
				resSummary += '</a>';
			}
			resSummary += ' with <strong>'+total+'</strong> BitPoints.';
			$resEl.html(resSummary);
		}
	},
	doShowPts: function(){
		if(window.frames.length == 0) { // Filter
			WEBS.showPts(document);
		} else { // Dashboard (wait for iframes to load and don't break the link back to the source filter)
			setTimeout(function() {
				for(var i = 0; i < window.frames.length; i++) {
					WEBS.showPts(window.frames[i].document, true);
				}
			}, 1700);
		}
	},

	initJiraBoard: function() {
		WEBS.cleanupBoard();
		WEBS.detectBoard();

		if (WEBS.currentBoard) {
			WEBS.commonBoardUpdates();
			if (WEBS.currentBoard.customize) {
				WEBS.currentBoard.customize();
			}
		}

		WEBS.addQuickScrum();
                WEBS.initAutoRefresh();

	},

	onDomReady: function() {
		WEBS.initJiraBoard();
                WEBS.doBitPoints();
		setTimeout(WEBS.doShowPts, 100);  //iframes are not recognized on DOMReady
	},

	onPopState: function() {

		WEBS.initJiraBoard();
	},

	onWorkModeUIReady: function() {
		WEBS.currentBoardDeferred.then(function() {
			if (WEBS.currentBoard && !WEBS.currentBoard.suppressStoryPoints) {
				processSPs();
			}
		});
	}
};

jQuery(WEBS.onDomReady);
jQuery().ready(function() {
	AJS.$(GH).bind("workModeUIReady", WEBS.onWorkModeUIReady);
});
jQuery(window).on('popstate', WEBS.onPopState);

/********************
 * GreenHopper Column Totals -- https://jira.atlassian.com/browse/GHS-6755
 *******************/
function processSPs(){
	try{
		var SP_FIELD = "customfield_11511";
		var STATUS_FIELD = "status";
		var LABELS_FIELD = "labels";
		var restApiBaseUrl = document.location.protocol + "//" + document.location.host;

		if (GH.Ajax.CONTEXT_PATH && GH.Ajax.CONTEXT_PATH.length > 0)
			restApiBaseUrl += "/" + GH.Ajax.CONTEXT_PATH;

		function getJson(restUrl, callback, callbackError) {
			return jQuery.ajax({
				type: "GET",
				url: restUrl,
				success: callback,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				error: callbackError
			})
		}

		function addSprintIcon(ticketId) {
			jQuery(".ghx-issue[data-issue-key='" + ticketId + "']")
				.append(jQuery("<div/>").text(" ").addClass("ghx-flags").addClass("wu-tang"));
		}

		function setSPSpanValue(jQContainers, sp) {
			jQuery.each(jQContainers, function() {
				jQContainer = jQuery(this);
				var spDiv = jQContainer.find(".sp-flag");

				if (spDiv.length === 0)
					spDiv = jQuery("<span class='sp-flag' style='margin-left: 5px; font-weight: bold'></span>")
						.appendTo(jQContainer);
					spDiv.html("(" + sp + ")");
			})
		}

		jQuery("#ghx-board-name").css("display","inline");

		function processColumn(boardInfo, columnInfo) {
			var statusIds = columnInfo.statusIds;
			var issueKeys = _.map(boardInfo.issuesData.issues, function(issueData) {
				if(jQuery.inArray(String(issueData.statusId), statusIds) !== -1)
					return issueData.key;
				return null
			});

			issueKeys = _.without(issueKeys, null);
			searchIssues(issueKeys, columnInfo.id, 0, 0)
		}

		var grandTotalSP = 0;
		// We can't have spaces in our labels
		var sprintId = jQuery(".ghx-name.js-toggle-sprint").text().replace(/ /ig, '_');

		function searchIssues(issueKeys, dataId, startAt, totalSP) {
			if(issueKeys.length == 0)
				return;
			var url = restApiBaseUrl + "/rest/api/2/search?jql=key in (" + issueKeys + ")&fields=" + SP_FIELD + "," + STATUS_FIELD + "," + LABELS_FIELD + "&maxResults=500";
			getJson(url + "&startAt=" + startAt, function(searchResult) {
				jQuery.each(searchResult.issues, function(i,issue) {
					if (issue.fields) {
						if (issue.fields[SP_FIELD]) {
							var sp = issue.fields[SP_FIELD];
							if (jQuery("#plan-toggle").is(":disabled"))
								setSPSpanValue(jQuery(".ghx-issue[data-issue-key='" + issue.key + "'] .ghx-key"), sp);
							totalSP += sp;
							totalSP = Math.round(totalSP * 100) / 100
						}
						// Add all ticket labels into the 'data-label-names' attribute
						if (issue.fields[LABELS_FIELD]) {
							var labels = issue.fields[LABELS_FIELD];
							if (issue.fields[STATUS_FIELD].name === 'Reopened') {
								labels.push("reopened-ticket");
							}
							// Also add a special label if the current sprint is contained in the labels
							if (jQuery.inArray(sprintId, labels) !== -1) {
								labels.push("current-sprint-ticket");
							}
							jQuery(".ghx-issue[data-issue-key='" + issue.key + "']")
								.attr("data-label-names", labels.join(" "));
						}
					}
				});

				var jQHeader = jQuery(".ghx-column-headers li[data-id=" + dataId + "] h2");
				jQHeader.css("display", "inline");
				setSPSpanValue(jQHeader, totalSP);
				grandTotalSP += totalSP;
				grandTotalSP = Math.round(grandTotalSP * 100) / 100;
				var boardTitle = jQuery("#ghx-view-selector");
				setSPSpanValue(boardTitle, grandTotalSP);
				var callStartAt = searchResult.startAt || 0;
				if(startAt + searchResult.issues.length < searchResult.total)
					searchIssues(issueKeys, dataId, startAt + searchResult.maxResults, totalSP)
			})
		}

		var rapidViewId = GH.RapidBoard.State.data.rapidViewId;

		if(rapidViewId){
			var url = restApiBaseUrl + GH.Ajax.REST_URL_BASE + "/xboard/work/allData/?rapidViewId=" + rapidViewId;

			getJson(url, function(boardInfo) {
				for(var i = 0; i < boardInfo.columnsData.columns.length; i++){
					var columnInfo = boardInfo.columnsData.columns[i];
					processColumn(boardInfo, columnInfo)
				}
			})
		}
	} catch(e) {
		console.log("processSPs error occured", e)
	}
}