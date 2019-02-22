var currenttile = 1,
  currentrow = 1,
  rows = 5,
  tiles = 6,
  tempitem = null,
  fliptimer = null,
  deg = 0,
  textfield = "";

function createtiles() {
  var flippers = document.getElementById("flippers");

  for (var j = 1; j < rows + 1; j++) {
    for (var i = 1; i < tiles; i++) {
      var tile = document.createElement('div');
      tile.className = 'tile';
      tile.id = 'tile' + j + '-' + i;
      flippers.appendChild(tile);
    }
  }
}
createtiles();

//variables set in function for easy reset
function resetvals() {
  currenttile = 1;
  currentrow = 1;
  rows = 5; //how many tall
  tiles = 6; //how many wide
  tempitem = null;
  clearInterval(fliptimer);
  fliptimer = null;
}

//set number to colour hex
function convertcolor(colornum) {
  var tileColor = "";
  switch (colornum) {
    case 'r':
      tileColor = "#cd2421";
      break; //Red
    case 'o':
      tileColor = "#f15a24";
      break; //Orange
    case 'y':
      tileColor = "#ebcd02";
      break; //Yellow
    case 'g':
      tileColor = "#009245";
      break; //Green
    case 'b':
      tileColor = "#0098d9";
      break; //Blue
    case 'l':
      tileColor = "#521989";
      break; //White
    case 'w':
      tileColor = "#ebebeb";
      break;
  }
  return tileColor;
}

//fliptile animation
//sets the colour of the tile, flips it diagonally by row
function fliptiles(tilearray) {

  //flip panels ==========
  var x = currentrow,
    y = currenttile;

  //loop while there are more rows and tiles to iterate to
  while (x > 0 && y < tiles) {
    var arrayitem = (x - 1) * (tiles - 1) + y - 1; //work out what current tile up to
    var tilecolor = null;

    //randomise colours if not specified an array
    if (tilearray == null)
      tilecolor = convertcolor(randcolor());
    else
      tilecolor = convertcolor(tilearray[arrayitem]);

    //FLIP and COLOUR
    //seethrough tiles
    var curtile = document.getElementById("tile" + x + "-" + y);

    if (tilecolor == "#000000")
      curtile.style.opacity = 0;
    else
      curtile.style.opacity = 1;

    //Set colour of tiles and flip
    curtile.style.background = tilecolor; //colour
    curtile.style.transition = "1s";
    if (deg == 180) deg = 0;
    else deg = 180;
    curtile.style.transform = "rotateY(" + deg + "deg)"; //play flipping anim

    x--; //minus row
    y++; //plus tile
  } //end while =====

  //get ready for next flip
  if (currentrow < rows) currentrow++;
  else currenttile++;

  if (fliptimer == null)
    fliptimer = setInterval(function() {
      fliptiles(tilearray)
    }, 100);
  if (currentrow == rows && currenttile == tiles)
    resetvals();
} //end fliptiles() ======

//=================
//End Flip tiles
//=================

//recolour the letters to match position Green/Grey/Orange
function arraycolour(array, colour) {
  if (array == null) return; //fallback

  for (var i = 0; i < array.length; i++) { //loop all of array
    //case to change 1 to wanted colour and 0 to white
    switch (array[i]) {
      case 1:
        array[i] = colour;
        break;
      case 0:
      default:
        array[i] = 0;
        break;
    }
  }
  return array; //return recoloured letter array
}

//some fun things to display sometimes

let r = null

function randomflip(random) {
  let rand = Math.floor((Math.random() * 6) + 1);
  if (r == null) {
    tempitem = "ggrgggrrrgrgrgrggrggggrgg";
    r = rand
  } else {
    if (rand == 1) //smileyface
      tempitem = "ggggggggggggwgggggggggggg";
    if (rand == 2) //smileyface
      tempitem = "bbbbwbbbbbbbbbbbbbbbwbbbb";
    if (rand == 3) //rainbow
      tempitem = "yyyywyyyyyyywyyyyyyywyyyy";
    if (rand == 4) //squares
      tempitem = "wooowooooooooooooooowooow";
    if (rand == 5) //hi
      tempitem = "wlllwlllllllwlllllllwlllw";
    if (rand == 6) //face
      tempitem = "wrrrwrrrrrwrrrwrrrrrwrrrw";
  }
  fliptiles(tempitem);
}
randomflip(null)

//=================
//Start Resize code
//=================

var stageHeight = $('#flippers').height(); // Set a variable for the height of the stage

$("#flippers").css({ // Set the transform origin so we always scale to the top left corner of the stage
  "transform-origin": "0 0",
  "-ms-transform-origin": "0 0",
  "-webkit-transform-origin": "0 0",
  "-moz-transform-origin": "0 0",
  "-o-transform-origin": "0 0"
});

function scaleStage() {
  var stage = $('#flippers'); // Set a reusable variable to reference the stage
  var parent = $('#flippers').parent(); // Set a reusable variable to reference the parent container of the stage

  var parentWidth = parent.width(); // Get the parent of the stage width
  var stageWidth = stage.width(); // Get the stage width
  var desiredWidth = Math.round(parentWidth); // Set the new width of the stage as it scales
  var rescale = Math.min(desiredWidth / stageWidth, 1.0); // Set a variable to calculate the new width of the stage as it scales

  // Rescale the stage
  stage.css('transform', 'scale(' + rescale + ')');
  stage.css('-o-transform', 'scale(' + rescale + ')');
  stage.css('-ms-transform', 'scale(' + rescale + ')');
  stage.css('-webkit-transform', 'scale(' + rescale + ')');
  stage.css('-moz-transform', 'scale(' + rescale + ')');
  stage.css('-o-transform', 'scale(' + rescale + ')');
  parent.height(stageHeight * rescale); // Reset the height of the parent container so the objects below it will reflow as the height adjusts
}

// Make it happen when the browser resizes
$(window).on('resize', function() {
  scaleStage();
});

// Make it happen when the page first loads
$(document).ready(function() {
  scaleStage();
  randomflip();
});
//===============
//End Resize code
//===============
//