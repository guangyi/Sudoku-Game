$(document).ready(function() {
	
	$('#board_wrapper').on('click', function(e) {
		$('.cell_onclick').removeClass('cell_onclick');
		if (e.target && $(e.target).hasClass("sudoku_cell")) {
			$(e.target).addClass('cell_onclick');
			//$('.number_onclick').removeClass('number_onclick');
		}
	});
	$('#selection').on('click', function(e) {
		$('.number_onclick').removeClass('number_onclick');
		// e.target is the inner most element. its parent has class number
		if (e.target && $(e.target).parent().hasClass('number')) {
			var currentTile = $('.cell_onclick');
			currentTile.html( Number($(e.target).html()) );
			currentTile.removeClass('cell_onclick');
		}
	});
});