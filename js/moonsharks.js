if (WEBS) {
	WEBS.currentBoardDeferred.then(function() {
		if (WEBS.currentBoard.moonSharkBoard) {
			var moonSharkId = WEBS.boards['Moon Sharks'].id;
			var moonSharkKanbanId = WEBS.boards.MoonSharksKanban.id;
			if (window.location.href.indexOf('rapidView=' + moonSharkId) > 0) {
				window.console && console.log('welcome moonsharks!');
				setTimeout(function() {
					var elem = jQuery('#work-toggle');
					elem.attr('href', '/secure/RapidBoard.jspa?rapidView='+moonSharkKanbanId);
					elem.attr('data-tooltip', 'Kanban Board');
					elem.off('click');
					elem.on('click', function(e) {
						e.preventDefault();
						// necessary because jira seems to randomly rewrite this URL
						window.location.href='/secure/RapidBoard.jspa?rapidView='+moonSharkKanbanId;
					});
					elem.text('Kanban board');
				}, 500);
			}

			if (window.location.href.indexOf('rapidView=' + moonSharkKanbanId) > 0) {
				window.console && console.log('welcome moonsharks Kanban!');
				setTimeout(function() {
					var elem = jQuery('#plan-toggle');
					elem.removeAttr('disabled');
					elem.attr('href', '/secure/RapidBoard.jspa?rapidView='+moonSharkId+'&view=planning');
					elem.attr('data-tooltip', 'Go to the Kanban backlog');
					elem.off('click');
				}, 500);
			}
		}
	});
}
