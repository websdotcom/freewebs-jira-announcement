

window.addEventListener('load', function() {
    Array.from(document.querySelectorAll('.ghx-days')).forEach(function(node) {
        const relevantColumns = ['1852'];
        if (relevantColumns.indexOf(node.parentElement.parentElement.dataset.columnId) === -1) {
            return;
        }
        const daysInCol = parseInt(node.title.split(' ')[0]);
        const beginingOfBadDays = 3;
        const ultimateBadDays = 10;

        const opacityStart = .05;
        const maxOpacity = 1;
        const opacityFactor = (maxOpacity - opacityStart)  / (ultimateBadDays - beginingOfBadDays);

        if (daysInCol >= beginingOfBadDays) {
            node.parentElement.style.backgroundColor = 'rgba(' + [255, 0, 0, Math.min(opacityFactor * daysInCol, maxOpacity)].join(', ') + ')'
        }
    });
});
