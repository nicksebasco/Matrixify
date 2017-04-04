# Matrixify
Short and Sweet vanilla javascript library, producing a surprisingly aesthetic effect.

<h5>Download and Usage </h5>
<p>Download matrixify.js, copy a version to your project directory.  Link to your main html 
file with a script tag.</p>

<code>
  <script src="matrixify.js"></script>
</code>

<h5> Matrixifying a div </h5>
<p>
  Matrixifying any div is simple, just use the <code> matrixfy( parent, rows, cols, options ) </code> function.
  Check out the examples directory to see everything in action!
</p>
<p>
  matrixify takes 4 arguments ( a fifth argument for advanced styling in coming soon. ).
  <ol>
    <li> <strong>parent</strong> (html element) - the div that you are trying to marixify.  </li>
    <li> <strong>rows</strong> (integer) - Number of rows in your matrix   </li>
    <li> <strong>columns</strong> (integer) - Number of columns in your matrix   </li>
    <li> <strong>options</strong> (object, <i>optional</i>) - customizable attributes of your matrix  </li>
    <pre>
     var options = {
       bg: (background color for the matrix, any valid html color including all rgba, hex values, and webkit gradients will work ),
       family: ( font family ),
       size: ( font size ),
       colors: ( an array of colors for the matrix symbols  ),
       symbols: ( array of symbols that your matrix will use, any keyboard character or combination of keyboard characters is ok ),
      };
    </pre>
  </ol>
  
</p>
