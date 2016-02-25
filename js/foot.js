setTimeout(function() {
	if (USER && USER.username === 'tools' && WEBS && WEBS.boards && WEBS.boards.Architects && window.location.href.indexOf('rapidView=' + WEBS.boards.Architects.id) > 0) {
		var overlapCards = function() {
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
          var perIssueAdjustment = visibleHeight / issues.length;
          perIssueAdjustment -= (issues[issues.length - 1].getBoundingClientRect().height - perIssueAdjustment) / issues.length - 1;
          var totalAdjustments = 0;
          issues.each(function(i) {
            if (i === 0) { return; }
            totalAdjustments += issues[i - 1].getBoundingClientRect().height - perIssueAdjustment;
            jQuery(this).css({
              position: 'relative',
              top: '-' + totalAdjustments + 'px'
            });
          });
        }
      });
    };

    jQuery().ready(overlapCards);
    window.addEventListener('resize', overlapCards);
    jQuery('.js-compact-toggle').click(overlapCards);
	}
}, 1000);


/*  Start JiraChat --
jQuery(setInterval(function(){
var $userInfo = jQuery('#header-details-user-fullname');
	top.postMessage(JSON.stringify({ action:'heartbeat',
	 user: $userInfo.attr('data-username'),
	 name:  jQuery.trim($userInfo.text()),
	 ticket: jQuery('#key-val').text() }), "*");
}, 2000));
-- End Jira Chat */
