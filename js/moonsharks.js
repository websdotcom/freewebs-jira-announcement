if (WEBS) {
	WEBS.currentBoardDeferred.then(function() {
		if (WEBS.currentBoard.moonSharkBoard) {
			var moonSharkId = WEBS.boards.MoonSharks.id;
			var mmonSharkKanbanId = WEBS.boards.MoonSharksKanban.id;
			if (window.location.href.indexOf('rapidView=' + moonSharkId) > 0) {
				window.console && console.log('welcome moonsharks!');
			}

			if (window.location.href.indexOf('rapidView=' + mmonSharkKanbanId) > 0) {
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
