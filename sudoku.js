$(document).ready(function() {
	var initData2 = [[6,'.',2,'.','.','.','.','.',7],
					[8,9,'.',2,'.','.','.',6,'.'],
					['.',5,4,'.',6,'.',8,'.',2],
					['.',7,'.',6, '.',5,4,'.','.'],
					[4,'.','.',3,'.',9, '.','.',6],
					[9,6,'.','.','.','.',2,'.',5],
					['.',4,'.','.',7,'.','.',5,3],
					['.',8,'.','.','.','.',9,4,'.'],
					['.', '.',3,'.','.',6,7,'.',8]];

	function DataModule(initData) {
		var data = initData.map(function(arr) {
			return arr.slice();
		});// make a copy so it can revert
		this.editData = function(row, col, value) {
			if (row != null && col != null) {
				data[row][col] = value;
				console.log(data);
			}
		}
		this.clearData = function(row, col) {
			if (row != null && col != null) data[row][col] = initData[row][col];
			else if (row != null) data[row] = initData[row].slice();
			else if (col != null) {
				for (var r = 0; r < 9; r++) {
					data[r][col] = initData[r][col];
				}
			}
		}
		this.validSudoku = function() {
			for (var r = 0; r < 9; r++) {
				for (var c = 0; c < 9; c++) {
					if (data[r][c] == '.') return false
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
			tile.data('val', value).attr('data-val', value);
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
			if (element != null && element.hasClass('need_to_fill')) element.html('&nbsp').data('val', '&nbsp');
			else if (row != null && col == null) {
				alert(row);
				console.log($('.need_to_fill[data-row=' + row + ']'));
				$('.need_to_fill[data-row=' + row + ']').html('&nbsp').data('val','&nbsp');
			}
			else if (col != null && row == null) {
				alert('col');
				$('.need_to_fill[data-col=' + col + ']').html('&nbsp').data('val','&nbsp');
			} 
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
				console.log(newValue, valid);
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
					dataModule.clearData(row, col);
					break;
				case 'clearRow' : 
					sudokuView.clearView(row, null, null);
					dataModule.clearData(row, null);
					break;
				case 'clearCol' : 
					sudokuView.clearView(null, col, null);
					dataModule.editData(null, col);
					break;
			}
		}
	});
});