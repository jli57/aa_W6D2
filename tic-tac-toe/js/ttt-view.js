class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
    this.turn = 0;
  }
  
  bindEvents() {
    $('.grid').on('click', 'li', (e) => {
      const $square = $(e.target);
      if ( this.game.board.isEmptyPos( [$square.attr('data-row'), $square.attr('data-col')] ) ) {
        this.makeMove($square); 
      } else {
        alert("Invalid move!"); 
      }
      if ( this.game.isOver() ) {
        console.log("game over"); 
        this.$el.append(`<p class="win-message">You win, ${this.game.winner()}</p>`); 
        $('.grid').off('click', 'li'); 
        $('.hover').removeClass('hover'); 
        
        const seqs = this.game.board.winningSequence; 
        for( let i = 0; i < seqs.length; i++ ) {
          const pos = seqs[i]; 
          const $square = $(`li[data-row="${pos[0]}"][data-col="${pos[1]}"]`);
          console.log('square', $square);
          console.log('data', $square.attr('data-row'));
          $square.css('background-color', 'green'); 
          $square.css('color', 'white'); 
        }
      }
    });
  }

  makeMove($square) {
    if (this.turn % 2 === 0) {
      $square.text('X');
      $square.addClass('x'); 
    } else {
      $square.text('O');
      $square.addClass('o'); 
    }
    this.game.playMove([$square.attr('data-row'), $square.attr('data-col')]);
    $square.css('background-color', 'white');
    $square.removeClass('hover'); 
    this.turn++;
  }

  setupBoard() {
    let $grid = $('<ul> </ul>');
    $grid.addClass('grid');
    
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const $newSquare = $('<li> </li>');
        $newSquare.attr('data-row', `${i}`);
        $newSquare.attr('data-col', `${j}`);
        $newSquare.addClass('hover'); 
        $grid.append($newSquare);  
      }
    }  
    this.$el.append($grid);
  }
}

module.exports = View;
