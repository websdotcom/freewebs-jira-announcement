setTimeout(function() {
	if (USER && USER.username === 'tools' && WEBS && WEBS.boards && WEBS.boards.Architects && window.location.href.indexOf('rapidView=' + WEBS.boards.Architects.id) > 0) {
		jQuery().ready(function() {
			var cols = jQuery('[data-swimlane-id="117"] + .ghx-columns .ghx-column');
			var viewportHeight = jQuery(window).height();
			cols.each(function(i) {
				var col = jQuery(this);
				var visibleHeight = viewportHeight - col[0].getBoundingClientRect().top;
				var issues = col.find('.ghx-issue');
				var height = issues.length ? issues[0].getBoundingClientRect().height : 0;
				var issuesHeight = issues.length * height;
				var hiddenHeight = issuesHeight - visibleHeight;
				if (hiddenHeight > (height - 50)) {
					var perIssueAdjustment = hiddenHeight / issues.length;
					issues.each(function(i) {
						jQuery(this).css({
							position: 'relative',
							top: '-' + (perIssueAdjustment * i) + 'px'
						});
					});
				}
			});
		});
	}
}, 1000);