const STAR1 = document.querySelectorAll('.star1');
const STAR2 = document.querySelectorAll('.star2');
const STAR3 = document.querySelectorAll('.star3');
const BGSCN = document.querySelectorAll('.backgroundScreen');

function StarRandomPosition(){
    STAR1.style['top'] = Math.random() * BGSCN.style['height'];
    STAR1.style['left'] = Math.random() * BGSCN.style['width'];

    
}