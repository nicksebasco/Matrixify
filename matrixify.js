window.matrixify = function(_parent,_rows,_cols,_options,_styleOptions){
  /*
  _options: { symbols:[Array of characters], size:font-size, family:font-family, colors:[Array of colors], bg:"background color of canvas"   };
  _styleOptions: ( additional style options to assign to the matrixified canvas, any css rule valid for canvas elements will apply. ) = { attribute1:value1,...,attributen:valuen };
  */
  var self       = this,
  bgCanvas       = document.createElement("canvas"),
  ctx            = bgCanvas.getContext("2d"),
  symPool        = (_options.symbols || [1,2,3,4,5,6,7,8,9]).map(String), // ["*"],[1,2,3,4,5,6,7,8,9], ["\n/\\","\\/"]
  symMap         = [/*{s:symbol,x:x,y:y}*/],
  fontAttributes = {
    pad:    0,
    size:   _options.size || "28px",
    family: _options.family || "monospace",
    color:  _options.colors || ["#9FA8DA","#81D4FA","#80CBC4"] //["#A5D6A7","#80CBC4","#C5E1A5"]
  },
  partition = (function(n,m){
    return {
      n   : n,
      m   : m || self.innerHeight/(parseInt(fontAttributes.size) + fontAttributes.pad),
      off : function(i){
        return i *self.innerWidth/(this.n) + self.innerWidth/(2*this.n);
      },
      offY: parseInt(fontAttributes.size) + fontAttributes.pad,
      offYi: parseInt(fontAttributes.size) + fontAttributes.pad,
    };
  })(_cols,_rows);

  (function styling(){
    bgCanvas.style.margin = 0;
    bgCanvas.style.padding = 0;
    bgCanvas.style.background = _options.bg || "#263238";
    bgCanvas.style.display = "block";
    _parent.style.postion = "relative";
    _parent.appendChild(bgCanvas);
  })();

  Array.prototype.choice = function(){
    /*
    Array method choice: Randomly returns an element from the array
    Array.choice();
    */
    return this[~~(Math.random()*this.length)];
  };

  function resize(){
    /*
    Update bgCanvas's dimensions based on parents dimensions onwindow resize;
    */
    bgCanvas.height = parseInt(this.getComputedStyle(_parent).height); bgCanvas.width = parseInt(this.getComputedStyle(_parent).width);
  }

  function animate(){
    /*
    Animation method.  update canvas by clearing it, then redrawing each symbol in symMap with the
    updated coordinates.  The New row condition, analyzes the y coordinate of the first symbol in a row
    if it has been incremented such that it is >= inter-row offset then a new row is formed and the inter-row
    offset is incremented by it's initial value.  Also a check is done to ensure that the max # of rows
    ( partition.m ) has not been exceeded.
    */
    ctx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
    symMap.forEach(function(row){
      row.forEach(function(sym,idx){
        sym.y = sym.y < bgCanvas.height ? sym.y+sym.v : 0;
        render(sym);
      });
      // New row
      if( row[0].y > partition.offYi && symMap.length < partition.m){
        buildRow();
        partition.offYi=partition.offY * symMap.length;
      }
    });
    self.requestAnimationFrame(animate);
  }

  function buildRow(){
    /*
    Add a new row to the symMap.  The row will be of length partition.n, which
    specifies the # of columns.  An initial 2d coordinate is assigned along with
    a randomly chosen symbol and velocity ( 1 < v < 1.99... ).
    */
    var row = [];
    for(var i = 0; i < partition.n; i++){
      var s= symPool.choice(), x = partition.off(i), yi = 0;
      var sym = {s:s,x:x,y:yi,v:(Math.random()*1)+1,c:fontAttributes.color.choice()};
      render(sym);
      row.push(sym);
    }
    symMap.push(row);
  }

  function render(sym){
    /*
    Render a symbol from the symMap on the bgCanvas.
    */
    ctx.fillStyle = sym.c;
    ctx.font= fontAttributes.size+" "+fontAttributes.family;
    ctx.fillText(sym.s,sym.x,sym.y);
  }

  (function start(){
    /*
    method auto invoked when matrixify is called.  Initializes matrixifcation.
    */
    buildRow();
    self.requestAnimationFrame(animate);
  })();
  self.addEventListener("load",resize);
  self.addEventListener("resize",resize);

};
