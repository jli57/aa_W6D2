class HanoiView {
  constructor(game, $el) {
    this.game = game; 
    this.$el = $el; 
    this.setupTowers(); 
    this.render(); 
    this.clickTower(); 
  }
  
  setupTowers() {
    for ( let i = 0; i < 3; i++ ) {
      const $ul = $('<ul class="tower"></ul>'); 
      $ul.attr('id', `${i}`); 
      for ( let j = 2; j >= 0; j-- ) {
        const $li = $('<li class="disc">&nbsp</li>'); 
        $li.attr('id', `${j}`); 
        $ul.append($li); 
      }
      this.$el.append($ul); 
    }
  }
  
  render() {
    const towers = this.game.towers; 
    towers.forEach( (tower, i) => {
      tower.forEach( (disc, j) => {
        const $disc = $(`ul[id="${i}"] li[id=${j}]`); 
        $disc.css("width", `${disc*40}px`);
        $disc.addClass("rendered-disc"); 
      }); 
    }); 
  }
  
  clickTower() {
    $('ul').on('click', (e)=> {
      const $currentTarget = $(e.currentTarget); 
      if ( this.firstRow === undefined ) {
        this.firstRow = $currentTarget.attr('id'); 
      } else {
        const secondRow = $currentTarget.attr('id'); 
        if ( this.game.isValidMove(this.firstRow, secondRow) ) {
          this.game.move(this.firstRow, secondRow); 
          this.firstRow = undefined; 
          this.render(); 
        } else {
          alert("Invalid move"); 
        }
      }
    }); 
  }
}

module.exports = HanoiView;  