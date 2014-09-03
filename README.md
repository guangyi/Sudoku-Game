Sudoku-Game
===========

A Simple Sodoku Game
./templates/index.html

***** Only FireFox can't load text font locally *****
***** So For better result, use Chrome/Safari/Opera *****

How to play?
1.Select a tile
  If it has number on it, the board will highlight tiles have same number
  If not, the board will highlight the row and column this tile is in

2.Select a number 
  If the result is correct, the number will be showed in the tile.Highlight tiles with same value
  Else red background applied to row and col the tile is in

3.This game ONLY valid under current situation, that means it wou't compare to the final result, 
  just like playing a Sudoku game on a newspaper or a book
  
4.Can use "Clear Tile", "Clear Row", "Clear Col" and "Clear All" to clear the tile

5.When finished, can select to start a new game or cancel

Structure:

SudokuDataModel.js is the data model. It edit/delete/valid data.
SudokuView.js is the view. It update the view of html, including element's content and attribute.
Sudoku.js is  the controller. If the sudokuBoard/number Options be clicked, it will let SudokuDataModel 
to update data and/or let SudokuView to update view.
Sudoku.js get data from generateData.js
When the game is finished, Sudoku.js let ModalView.js to display a modal, to either start a new game or cancel.

Technics:
1.Jade template engine
  It helps avoid writing duplicate html. It very helpful especially under this case. 
  I learned it for this project.

2.Sass
  It really helps with the architecture of CSS files and prefix for different browser. 
  I know how to use Sass, so I choose it this time.

3.Jquery:
  Good for DOM manipulating.

4.Responsive design:
  If the windows size change, the layout will change too.
  Good for different size devices

Following work:
If have additional time I would:
  1.Create a button to save the data(actually now the data has been saved in localStorage['sudokuCurrent']) and retrive data
  to continue the game any time
  
  2.Add some sound effect or animation.
  
  3.Make the alert prettier(use custom dialog)
