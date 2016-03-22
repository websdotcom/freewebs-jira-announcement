setTimeout(function() {
	if (USER && USER.username === 'tools' && WEBS && WEBS.boards && WEBS.boards.Architects && window.location.href.indexOf('rapidView=' + WEBS.boards.Architects.id) > 0) {
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    var overlapCards = debounce(function() {
      console.log('fitting cards in viewport');

      var cols = jQuery('[data-swimlane-id="117"] + .ghx-columns .ghx-column');
      var viewportHeight = jQuery(window).height();
      cols.each(function(i) {
        var col = jQuery(this);
        var issues = col.find('.ghx-issue');

        if (issues.length === 0) {
          return;
        }

        var colTop = col[0].getBoundingClientRect().top;
        var visibleHeight = viewportHeight - colTop;
        var issuesHeight = jQuery.makeArray(issues).reduce(function(result, iss, i) {
          return result + issues.get(i).getBoundingClientRect().height;
        }, 0);
        var hiddenHeight = issuesHeight - visibleHeight;
        if (hiddenHeight > 0) {
          console.log('collapsing column ' + i);
          var perIssueAdjustment = visibleHeight / issues.length;
          perIssueAdjustment -= (issues.get(-1).getBoundingClientRect().height - perIssueAdjustment) / issues.length - 1;
          var totalAdjustments = 0;
          issues.each(function(i) {
            if (i === 0) { return; }
            totalAdjustments += issues[i - 1].getBoundingClientRect().height - perIssueAdjustment;
            jQuery(this).css({
              position: 'relative',
              top: '-' + totalAdjustments + 'px'
            });
          });
        } else {
          console.log('resetting column ' + i);
          issues.each(function(i) {
            jQuery(this).css({
              position: 'relative',
              top: 'auto'
            });
          });
        }
      });
    }, 500);

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
