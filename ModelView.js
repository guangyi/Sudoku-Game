function ModalView() {
	this.show = function() {
		$('#modal').animate({
			top:'0px'
		}, 1000);
	}
	this.startNewGame = function() {
		var initData = getInitData();
    	var sudokuDataModel = new SudokuDataModel(initData);
    	var sudokuView = new SudokuView();
    	sudokuView.initView(initData);
    	$('#modal').animate({
			top:'-1000px'
		}, 1000);
	}
	this.cancel = function() {
		$('#modal').animate({
			top:'-1000px'
		}, 1000);
	}
}