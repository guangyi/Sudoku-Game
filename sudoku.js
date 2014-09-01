$(document).ready(function() {
	var initData2 = [[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],
	['.', '.', '.', '.', '.' ,'.', '.' ,'.', '.'],[1,2,3,4,5,6,7,8,9],
	[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],[1,2,3,4,5,6,7,8,9],['.', '.', '.', '.', '.' ,'.', '.' ,'.', '.']];

	function DataModule(initData) {
		var data = initData.map(function(arr) {
			return arr.slice();
		});// make a copy so it can revert
		
		this.editData = function(row, col, value) {
			if (row && col) {
				data[row][col] = value;
				console.log(initData);
			}
			else if (row) {
				for (var c = 0; c < 9; c++) {
					data[row][col] = value;
				}
			}
			else if (col) {
				for (var r = 0; r < 9; r++) {
					data[r][col] = value;
				}
			}
		}
		this.validSudoku = function() {
			for (var r = 0; r < 9; r++) {
				for (var c = 0; c < 9; c++) {
					if (data[r][c] == '&nbsp') return false
					temp = this.isValid(r, c);
					if (!temp) return false 
				}
			}
			return true
		}
		this.isValid = function(row, col) {
			for (var r = 0; r < 9; r++) {
				if (r != row && data[r][col] == data[row][col]) return false
			}
			for (var c = 0; c < 9; c++) {
				if (c != col && data[row][c] == data[row][col]) return false
			}
			for (var r = Math.floor(row / 3) * 3; r < Math.floor(row / 3) * 3 + 3; r++) {
				for (var c = Math.floor(col / 3) * 3; c < Math.floor(col / 3) * 3 + 3; c++) {
					if (r != row && c != col && data[r][c] == data[row][col]) return false
				}
			}
			return true
		}
		this.reset = function() {
			data = initData;
		}
	}
	function SudokuView() {
		this.updateTile = function(tile, value) {
			tile.html(value);
			tile.data('val', value);
		}
		this.hightLightCell = function(element) {
			this.clearHeightLight();
			element.addClass('cell_onclick');
			if (element.data('val') != '&nbsp') 
				$('.sudoku_cell').find('[data-val=' + element.data('val') + ']').addClass('cell_sameVal');
			else {
				$('.sudoku_cell').find('[data-row=' + element.data('row') + ']').addClass('cell_related');
				$('.sudoku_cell').find('[data-col=' + element.data('col') + ']').addClass('cell_related');
				element.removeClass('cell_related');
			}
		}
		this.clearView = function(row, col, element) {
			if (element) element.html('&nbsp');
			else if (row) $('.need_to_fill[data-row=' + row + ']').html('&nbsp').data('val','&nbsp');
			else if (col) $('.need_to_fill[data-col=' + col + ']').html('&nbsp').data('val','&nbsp');
			this.clearHeightLight();
		}
		this.clearAllView = function() {
			$('.need_to_fill').html('&nbsp').data('val','&nbsp');
			this.clearHeightLight();
		}
		this.clearHeightLight = function() {
			$('.cell_onclick').removeClass('cell_onclick');
			$('.cell_related').removeClass('cell_related');
			$('.cell_sameVal').removeClass('cell_sameVal');
		}
	}

	var dataModule = new DataModule(initData2);
	var sudokuView = new SudokuView();
	
	$('#board_wrapper').on('click', function(e) {
		var currentTile = $(e.target);
		if (currentTile.length > 0) {
			sudokuView.hightLightCell(currentTile);
		}
	});
	$('#selection').on('click', function(e) {
		// e.target is number h2
		var currentTile = $('.cell_onclick');// h2.cell_onclick
		if (e.target) {
			if (currentTile.length > 0 && currentTile.hasClass('need_to_fill')) {
				var newValue = $(e.target).html();
				var curValue = currentTile.html();
				var row = currentTile.data('row');
				var col = currentTile.data('col');
				// edit data to test if this number is valid in data
				dataModule.editData(row, col, newValue);
				var valid = dataModule.isValid(row, col);
				if (valid) {
					sudokuView.updateTile(currentTile, newValue);
					if (dataModule.validSudoku()) alert("congratulations");
				}
				else dataModule.editData(row, col, curValue);
			}
		}
		sudokuView.clearHeightLight();
	});

	$('.btnOption').on('click', function() {
		var id = $(this).attr('id');
		var currentTile = $('.cell_onclick');
		if (id == 'clearAll') {
			sudokuView.clearAllView();
			dataModule.reset(); 
		} 
		else if (currentTile.length == 0 ){
			alert("Select a tile to clear");
		}
		else {
			var row = currentTile.data('row');
			var col = currentTile.data('col');
			console.log(row, col,'test');	
			switch(id) {
				case 'clearTile': 
					sudokuView.clearView(row, col, currentTile);
					dataModule.editData(row, col, '&nbsp');
				case 'clearRow' : 
					sudokuView.clearView(row, null, null);
					dataModule.editData(row, null, '&nbsp');
				case 'clearCol' : 
					sudokuView.clearView(null, col, null);
					dataModule.editData(null, col, '&nbsp');
			}
		}
	});
});