$(document).ready(function() {
	var data = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],
	['.', '.', '.', '.', '.' ,'.', '.' ,'.', '.'],[1,2,3,4,5,6,7,8,9],
	[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],['.', '.', '.', '.', '.' ,'.', '.' ,'.', '.']];

	$('#board_wrapper').on('click', function(e) {
		$('.cell_onclick').removeClass('cell_onclick');
		if (e.target && $(e.target.parentNode).hasClass("sudoku_cell") || $(e.target).hasClass("sudoku_cell")) {
			$(e.target.parentNode).addClass('cell_onclick');
		}
	});
	$('#selection').on('click', function(e) {
		console.log($(e.target).html());
		$('.number_onclick').removeClass('number_onclick');
		// e.target is the inner most element. its parent has class number
		if (e.target && $(e.target.parentNode).hasClass('number')) {
			var currentTile = $('.cell_onclick');
			if (!(currentTile.hasClass('preset'))) {
				console.log($(e.target).html());
				currentTile.children('h2').html($(e.target).html());
			}
			currentTile.removeClass('cell_onclick');
		}
	});
});