const STAR1 = document.querySelectorAll('.star1');
const BGSN = document.querySelectorAll('.backgroundScreen');
const SCREENLENGTH = window.screenX;
const SCREENHEIGHT =  window.screenY ;

function StarRandomPosition(){
    STAR1.style['top'] = Math.random(SCREENHEIGHT) * SCREENHEIGHT;
    /*remplacer BGSC par window (element javascript)
    modifier la valeur de math.random (elle est cappé de 0 à 1) */
    STAR1.style['left'] = Math.random(SCREENLENGTH) * SCREENLENGTH;
}
StarRandomPosition();