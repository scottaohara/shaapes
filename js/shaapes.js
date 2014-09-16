
// Useful bit to be able to get a random entry from an array
// (we do that a lot here).
Array.prototype.randomEntry = function() {
	return this[util.random(0, this.length - 1)];
}

Array.prototype.generateBitmask = function() {
	var b = 0;
	for (var i = 0; i < this.length; i++) {
		b += 1 << this[i];
	}

	return b;
}


// Variable Defaults (may be overridden later)
var SPEED = 600,
	DEFAULT_WIDTH = 1024,
	DEFAULT_HEIGHT = 768,
	DEFAULT_NUMSHAPES = 500,
	DEFAULT_SIZE = 128,
	DEFAULT_SPACEBETWEEN = 1,
	DEFAULT_SIZERAND = 1,
	DEFAULT_DISTANCE = 1,
	DEFAULT_TRANS = 0.5,
	DEFAULT_DISTRO = 'even',
	DEFAULT_ROTATION = 'none',
	DEFAULT_COLOR_VARIANCE = 10,
	BRIGHTNESS_THRESHOLD = 150,
	IMAGE_TYPE = 'image/png',
	HASH_SEPARATOR = '$',
	DEMO_VALUE = 'MzIkNTAxJDEkMTExJGRlZzE4MCRGREU2QkRXMC4yLEExQzVBQlcwLjIsRjRERDUxVzAuMixEMTFFNDhXMC4yLDYzMkY1M1cwLjIkMC41JDEwJGFsdGVybmF0ZSQxJDE=',

SVG = {
	MIME_HEADER: 'data:image/svg+xml;base64,',
	DOC_HEADER:'<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
	DOC_BEGIN:'<svg width="_DOCX_px" height="_DOCY_px" viewBox="0 0 _DOCX_ _DOCY_" xmlns="http://www.w3.org/2000/svg" version="1.1">',
	DOC_END: '</svg>',
	SHAPES: {
		circle:           '<circle cx="16" cy="16" r="14" fill="_C_" />',
		circle2:          '<circle cx="16" cy="16" r="7" fill="_C_" />',
		// circle3:          '<circle cx="16" cy="16" r="14" fill="none" stroke="_C_" stroke-width="3" />',
		// circle4:          '<circle cx="16" cy="16" r="7" fill="none" stroke="_C_" stroke-width="3" />',
		// quartercircle:    '<path d="M0,0 a_S_,_S_ 0 0,1 _S_,_S_ h-_S_ z" fill="_C_" />',
		halfcircle1:      '<path d="M0,0 a14,14 0 0,0 _S_,0 h-_S_ z" fill="_C_" />',
		// halfcircle2:      '<path d="M0,_S_ A16,16 0 0,1 _S_,_S_ z" fill="_C_" />',
		// filledarc:        '<path d="M0,0 h_S_ A_S_,_S_ 0 0,0 0,_S_  z" fill="_C_" />',
		triangle:         '<path d="M0,0 v_S_ h_S_ z" fill="_C_" />',
		triangle2:        '<path d="M0,0 v_S_ L16,16 z" fill="_C_" />',
		triangle3:        '<path d="M0,0 v_S_ L32,16 z" fill="_C_" />',
		square:           '<path d="M0,0 h_S_ v_S_ h-_S_ z" fill="_C_" />',
		square2:          '<path d="M10.5,10.5 h10.5 v10.5 h-10.5 z" fill="_C_" />',
		// square3:          '<path d="M0,0 h_S_ v_S_ h-_S_ z" fill="none" stroke="_C_" stroke-width="3" />',
		// square4:          '<path d="M10.5,10.5 h10.5 v10.5 h-10.5 z" fill="none" stroke="_C_" stroke-width="2" />',
		dline:            '<line x1="0" y1="0" x2="_S_" y2="_S_" fill="none" stroke="_C_" stroke-linecap="square" stroke-width="1"/>',
		// dline2:           '<line x1="0" y1="0" x2="16" y2="_S_" fill="none" stroke="_C_" stroke-linecap="square" stroke-width="2"/>',
		// vline:            '<line x1="16" y1="0" x2="16" y2="_S_" fill="none" stroke="_C_" stroke-linecap="square" stroke-width="1"/>',
		// vline2:           '<line x1="16" y1="0" x2="16" y2="_S_" fill="none" stroke="_C_" stroke-linecap="square" stroke-width="3"/>',
		// vline3:           '<line x1="16" y1="0" x2="16" y2="_S_" fill="none" stroke="_C_" stroke-linecap="square" stroke-width="5"/>',
		// vline4:           '<line x1="16" y1="0" x2="16" y2="_S_" fill="none" stroke="_C_" stroke-linecap="square" stroke-width="10"/>',
		leaf:             '<path d="M0,0 A_S_,_S_ 0 0,0 _S_,_S_ A_S_,_S_ 0 0,0 0,0" fill="_C_" />',
		halfleaf:         '<path d="M0,0 a_S_,_S_ 0 0,0 _S_,_S_ z" fill="_C_" />',
		// arc:              '<path d="M0,_S_ a_S_,_S_ 0 0,0 _S_,-_S_ " fill="none" stroke="_C_" stroke-linecap="butt" stroke-width="5"/>',
		diamond:          '<path d="M16,0 L0 16 L16 32 L32 16 z" fill="_C_" />',
		hexagon:          '<path d="M0,10.6 v10.6 L16 32 L32 21 v-10.6 L16 0 z" fill="_C_" />'
	}
},

// Various useful functions conveniently
// wrapped in a class.
util = {
	// Base 64 Encode a string (if window.btoa doesn't exist)
	// Basically, it works like so:
	// take 3 8-bit ASCII vals and repurpose the bits as
	// 4 6-bit vals.  Assign alphanums to each val and go
	base64_encode: function(str) {
		if (window.btoa) {
			return window.btoa(str);
		}

		var __BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		o = '',
		i = 0,
		c1,
		b1;
		str = str || '';

		while (i < str.length) {
			c1 = str.charCodeAt(i++), c2 = str.charCodeAt(i++) || 0, c3 = str.charCodeAt(i++) || 0;
			b1 = c1 >> 2, b2 = (((c1 << 8) | c2) & 1008) >> 4, b3 = (((c2 << 8) | c3) & 4032) >> 6, b4 = c3 & 63;
			o += __BASE.charAt(b1);
			o += __BASE.charAt(b2);
			o += __BASE.charAt(b3);
			o += __BASE.charAt(b4);
		}

		return o;
	},

	// Standard, run-of-the-mill b64 decoder
	base64_decode: function(str) {
		var __BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
			o = '',
			c1,
			b1,
			i = 0;

		str = str || '';
		while (i < str.length) {
			c1 = __BASE.indexOf(str[i++]), c2 = __BASE.indexOf(str[i++]) || 0, c3 = __BASE.indexOf(str[i++]) || 0, c4 = __BASE.indexOf(str[i++]) || 0;
			b1 = (c1 << 2) | (c2 >> 4), b2 = ((c2 & 15) << 4) | (c3 >> 2), b3 = ((c3 & 3) << 6) | c4;
			o += String.fromCharCode(b1);
			if (c3 < 64) {
				o += String.fromCharCode(b2);
			}
			if (c4 < 64) {
				o += String.fromCharCode(b3);
			}
		}

		return o;
	},

	// Nice helper function to generate a random number
	// from @min to @max and optional @step val
	random: function(min, max, step) {
		step = step || 1;
		return (Math.round(Math.random() * ((max - min)/step)) * step) + min;
	},

	// Exponentially-weighted random number generator
	exprandom: function(min, max, step) {
		var r = Math.log(1 - Math.random()) / -3;
		return (Math.round(r * ((max - min) / step)) * step) + min;
	},

	// Convert from Hex colors to RGBA color.
	hex2rgba: function(h, opacity) {
		h = h || '';
		return 'rgba(' + util.hex2rgbValues(h).join(',') + ',' + opacity + ')';
	},

	// Return the raw RGB values of a given color
	hex2rgbValues: function(c) {
		var cols = c.replace('#', '').match(/.{2}/g);

		// If we can't parse the color, then throw something back
		if (!cols || cols.length != 3) {
			return 'rgba(0, 0, 0, 1)';
		}

		// Otherwise, go through the parsed list and convert to dec.
		for (var i in cols) {
			cols[i] = parseInt(cols[i], 16);
		}

		return cols;
	},

	// From a bitmasked number, generate an array of which bits are active.
	parseBitmask: function(i) {
		var a = [], c = 0;
		while (i > 0) {
			if ((i & 1) == 1) {
				a.push(c);
			}
			++c;
			i >>= 1;
		}
		return a;
	}
};


var SHAAPES = (function($, document) {
	var __shapeScheme,
		__colorScheme,
		__distributionScheme,
		__imageGenerator,

	/////////////////////////////////
	// Shapes
	// This manages which shapes the user selected and handles the button
	// creation and drawing on the context.
	__shapeScheme = function() {
		this.shapeList = [];
		this.size = DEFAULT_SIZE;
		this.numShapes = DEFAULT_NUMSHAPES;
		this.generatedNum = 0;
		this.sizeRand = DEFAULT_SIZERAND;
		this.maxW = 500;
		this.maxH = 500;
		this.iconSize = 32;
		this.iconColor = 'rgb(0,0,0)';

		// Adds a selected shapes from the form to the list of
		// 'active' shapes to use.
		this.addShape = function(type) {
			this.shapeList.push(type);
		};

		// Resets the 'active' shapes list
		this.resetShapeList = function() {
			this.generatedNum = 0;
			this.shapeList = [];
		};

		// Used by the initial load of the page, read all the shapes above
		// and populate the list of shapes with the corresponding <a> tags
		this.appendShapeButtons = function($container) {
			for (var i in SVG.SHAPES) {
				if (SVG.SHAPES.hasOwnProperty(i)) {
					var s = SVG.SHAPES[i].replace(/_S_/g, this.iconSize).replace(/_C_/g, this.iconColor);
					var $a = $("<a/>", { href: '#', id: 'shape-button-' + i });
					var src = SVG.DOC_HEADER + SVG.DOC_BEGIN.replace(/_DOCX_|_DOCY_/g, this.iconSize) + s + SVG.DOC_END;
					var $img = $('<img />', { src: SVG.MIME_HEADER + util.base64_encode(src) });

					$a.click(function() {
						$(this).toggleClass('selected');
					});
					$img.appendTo($a);
					$container.append($a);
				}
			}

		};

		// This is clearly the most important function of the whole app:
		// actually draws the shape with the given @color and @position to
		// the canvas (via @ctx).
		this.generateShape = function(ctx, colorObj, distroObj, index) {
			var thisShapesSize,
				newShapeGuy,
				circleRadii = 4,
				position,
				percObj,
				color;

			if (this.shapeList.length > 0) {
				thisShapesSize = this.size * util.random(1, this.sizeRand);
				newShapeGuy = this.shapeList.randomEntry();
				position = distroObj.generatePositions(index);

				for (var p = 0; p < position.length; p++) {
					percObj = distroObj.getPercentage(position[p].x, position[p].y);
					ctx.save();
					ctx.translate(position[p].x, position[p].y);
					ctx.rotate(position[p].r);
					ctx.fillStyle = ctx.strokeStyle = colorObj.generateColor(percObj);
					ctx.beginPath();

					switch (newShapeGuy) {
						case 'circle':
							ctx.arc(thisShapesSize / 2, thisShapesSize / 2, thisShapesSize / 2, Math.PI * 2, 0, true);
							ctx.fill();
							break;
						case 'circle2':
							ctx.arc(thisShapesSize / 2, thisShapesSize / 2, thisShapesSize / 4, Math.PI * 2, 0, true);
							ctx.fill();
							break;
						case 'circle3':
							ctx.lineWidth = circleRadii;
							ctx.arc(thisShapesSize / 2, thisShapesSize / 2, (thisShapesSize / 2) - (circleRadii / 2), Math.PI * 2, 0, true);
							ctx.stroke();
							break;
						case 'circle4':
							ctx.lineWidth = circleRadii;
							ctx.arc(thisShapesSize / 2, thisShapesSize / 2, (thisShapesSize / 4) - (circleRadii / 2), Math.PI * 2, 0, true);
							ctx.stroke();
							break;
						case 'quartercircle':
							ctx.moveTo(0, 0);
							ctx.lineTo(0, thisShapesSize);
							ctx.arc(0, thisShapesSize, thisShapesSize, 0, 3 * Math.PI / 2, true);
							ctx.fill();
							break;
						case 'halfcircle1':
							ctx.moveTo(0, 0);
							ctx.arc(thisShapesSize / 2, 0, thisShapesSize / 2, Math.PI, 2 * Math.PI, true);
							ctx.fill();
							break;
						case 'halfcircle2':
							ctx.moveTo(0, thisShapesSize);
							ctx.arc(thisShapesSize / 2, thisShapesSize, thisShapesSize / 2, Math.PI, 2 * Math.PI, false);
							ctx.fill();
							break;
						case 'filledarc':
							var s2 = thisShapesSize / 2;
							ctx.moveTo(0, 0);
							ctx.arc(s2, s2, s2, 3 * Math.PI / 2, Math.PI, true);
							ctx.lineTo(0, 0);
							ctx.fill();
							break;
						case 'triangle':
							ctx.moveTo(0, 0);
							ctx.lineTo(0, thisShapesSize);
							ctx.lineTo(thisShapesSize, thisShapesSize);
							ctx.fill();
							break;
						case 'triangle2':
							ctx.moveTo(0, 0);
							ctx.lineTo(0, thisShapesSize);
							ctx.lineTo(~~(thisShapesSize * (Math.sqrt(3) / 2)), thisShapesSize / 2);
							ctx.fill();
							break;
						case 'triangle3':
							ctx.moveTo(0, 0);
							ctx.lineTo(0, thisShapesSize);
							ctx.lineTo(thisShapesSize, thisShapesSize / 2);
							ctx.fill();
							break;
						case 'square':
							ctx.moveTo(0, 0);
							ctx.lineTo(0, thisShapesSize);
							ctx.lineTo(thisShapesSize, thisShapesSize);
							ctx.lineTo(thisShapesSize, 0);
							ctx.fill();
							break;
						case 'square2':
							var s3 = Math.floor(thisShapesSize / 3);
							ctx.moveTo(s3, s3);
							ctx.lineTo(s3 * 2, s3);
							ctx.lineTo(s3 * 2, s3 * 2);
							ctx.lineTo(s3, s3 * 2);
							ctx.fill();
							break;
						case 'square3':
							ctx.lineWidth = thisShapesSize / 20;
							ctx.moveTo(0, 0);
							ctx.lineTo(0, thisShapesSize);
							ctx.lineTo(thisShapesSize, thisShapesSize);
							ctx.lineTo(thisShapesSize, 0);
							ctx.closePath();
							ctx.stroke();
							break;
						case 'square4':
							ctx.lineWidth = thisShapesSize / 20;
							var s3 = Math.floor(thisShapesSize / 3);
							ctx.moveTo(s3, s3);
							ctx.lineTo(s3 * 2, s3);
							ctx.lineTo(s3 * 2, s3 * 2);
							ctx.lineTo(s3, s3 * 2);
							ctx.closePath();
							ctx.stroke();
							break;
						case 'dline':
							ctx.lineWidth = 1;
							ctx.moveTo(0, 0);
							ctx.lineCap = 'square';
							ctx.lineTo(thisShapesSize, thisShapesSize);
							ctx.stroke();
							break;
						case 'dline2':
							ctx.lineWidth = 2;
							ctx.moveTo(0, 0);
							ctx.lineCap = 'square';
							ctx.lineTo(thisShapesSize, thisShapesSize / 2);
							ctx.stroke();
							break;
						case 'vline':
							ctx.lineWidth = 1;
							ctx.lineCap = 'square';
							ctx.moveTo(0,0);
							ctx.lineTo(0, thisShapesSize);
							ctx.stroke();
							break;
						case 'vline2':
							ctx.lineWidth = 3;
							ctx.lineCap = 'square';
							ctx.moveTo(0,0);
							ctx.lineTo(0, thisShapesSize);
							ctx.stroke();
							break;
						case 'vline3':
							ctx.lineWidth = 5;
							ctx.lineCap = 'square';
							ctx.moveTo(0,0);
							ctx.lineTo(0, thisShapesSize);
							ctx.stroke();
							break;
						case 'vline4':
							ctx.lineWidth = thisShapesSize / 5;
							ctx.lineCap = 'square';
							ctx.moveTo(0,0);
							ctx.lineTo(0, thisShapesSize);
							ctx.stroke();
							break;
						case 'leaf':
							ctx.moveTo(0, 0);
							ctx.arc(0, thisShapesSize, thisShapesSize, 3 * Math.PI / 2, 0, false);
							ctx.arc(thisShapesSize, 0, thisShapesSize, Math.PI / 2, Math.PI, false);
							ctx.fill();
							break;
						case 'halfleaf':
							ctx.moveTo(0, 0);
							ctx.lineTo(thisShapesSize, thisShapesSize);
							ctx.arc(thisShapesSize, 0, thisShapesSize, Math.PI / 2, Math.PI, false);
							ctx.fill();
							break;
						case 'arc':
							ctx.lineWidth = 5;
							ctx.lineCap = 'square';
							ctx.arc(0, thisShapesSize, thisShapesSize, Math.PI / 2, 0, true);
							ctx.stroke();
							break;
						case 'diamond':
							var s2 = thisShapesSize / 2;
							ctx.moveTo(s2, 0);
							ctx.lineTo(0, s2);
							ctx.lineTo(s2, thisShapesSize);
							ctx.lineTo(thisShapesSize, s2);
							ctx.fill();
							break;
						case 'hexagon':
							var s4 = thisShapesSize / 4;
							var s2 = thisShapesSize / 2;
							ctx.moveTo(0, s4);
							ctx.lineTo(0, s4 + s2);
							ctx.lineTo(s2, thisShapesSize);
							ctx.lineTo(thisShapesSize, s4 + s2);
							ctx.lineTo(thisShapesSize, s4);
							ctx.lineTo(s2, 0);
							ctx.fill();
						default:
							break;
					}

					ctx.restore();
				}
			}
		};
	},

	/////////////////////////////////
	// Colors
	// Handles the generation of the color buttons, handles the interface
	// to ColourLovers, and handles the weighted values from the CL list.
	__colorScheme = function() {
		this.transparency = DEFAULT_TRANS;
		this.variance = DEFAULT_COLOR_VARIANCE;
		this.colorList = [];
		this.resetBG = true;
		this.container = '';
		this.$clresults = '';
		this.CLURL = 'http://colourlovers.com/api/palettes';
		this.CLURLParams = {'format': 'json', 'numResults': 50, 'orderCol': 'score', 'sortBy': 'DESC', 'showPaletteWidths':1};

		// Function that will take in @search and use the ColourLovers API
		// to get their search terms and create the relevent buttons to display.
		this.getCLResults = function(search) {
			var p = this.CLURLParams;
			if (search) {
				p['keywords'] = search;
			}

			var _this = this;
			$.ajax({
				url: this.CLURL,
				dataType: 'jsonp',
				data: p,
				jsonp: 'jsonCallback',
				success: function(results) {
					_this.$clresults.removeClass('hide').empty();

					for (var i in results) if (results.hasOwnProperty(i)) {
						var r = results[i];
						$a = $("<a />", {'class': 'clpal', href: '#', title: r.title}).data({'colors': r.colors, 'weights': r.colorWidths});
						$a.append($('<div />').html(r.title).addClass('title'));
						var $colorBlock = $('<div />').addClass('color-block color-adjust');

						for (var c in r.colors) {
							$colorBlock.append($('<span />').css({'background-color': '#' + r.colors[c], 'width': (r.colorWidths[c] * 100) + '%'}));
						}
						$a.append($colorBlock);

						$a.click(function() {
							_this.resetColorList();
							var c = $(this).data('colors');
							var w = $(this).data('weights');
							for (var j in c) {
								if (typeof c[j] === 'string') {
									_this.appendColorButton(c[j], w[j]);
								}
							}
							// TODO: change this to a "selected".
							$('#alltheshapesthatsshapelyshape').submit();
						});
						$a.appendTo(_this.$clresults);
					}
				}
			})
		}

		// Handles colors in hex format (we'll process them via util.hex2rgba).
		this.addColor = function(c, w) {
			var count = w ? w * 100 : 1
			for (var i = 0; i < count; i++) {
				this.colorList.push(c);
			}
		}
		// Pretty self-explanatory, resets the list (either from
		// new scheme selection, reset button or form submission.
		this.resetColorList = function() {
			//$(".colorpicker").remove();
			this.container.empty();
			this.colorList.length = 0;
		}

		// Add the color button to the main form so that when
		// submitted, it will be able to pull those values.
		this.appendColorButton = function(color, weight) {
			$i = $('<input />', {'type': 'text', 'class': 'color-sel'}).val(color).css({'background-color': '#' + color}).data({'weight': weight});
			this.container.append($i);
		}

		// Returns the color meant for the background of the image.
		// This will find a random entry in this.colorList and return it,
		// but at the same time, remove this color from the list so that it won't
		// be used when we call generateColor() later on.
		this.generateBGColor = function() {
			return util.hex2rgba(this.colorList.randomEntry(), 1);
		};

		// Return a random color in RGBA format.
		this.generateColor = function(percObj) {
			var c = this.colorList.randomEntry();
			if (percObj.x) {
				var p = percObj.x + util.random(this.variance * -1, this.variance, 1);
				p = (p < 0) ? 0 : p;
				p = (p > this.colorList.length) ? Math.abs(this.colorList.length - p): p;
				c = this.colorList[p] || this.colorList[0];
			}
			return util.hex2rgba(c, this.transparency);
		};

		this.getAvgBrightness = function() {
			var avgR = avgG = avgB = 0;

			for (var i = 0; i < this.colorList.length; i++) {
				var cc = util.hex2rgbValues(this.colorList[i]);
				avgR += cc[0];
				avgG += cc[1];
				avgB += cc[2];
			}

			avgR = ~~(avgR / this.colorList.length);
			avgG = ~~(avgG / this.colorList.length);
			avgB = ~~(avgB / this.colorList.length);

			return ~~((avgR + avgG + avgB) / 3);
		}
	},

	/////////////////////////////////
	// Distribution Scheme
	// This handles the positioning and rotation of the elements on the field.
	// The schemes for the different distributions are calculated in this class.
	__distributionScheme = function() {
		this.space = DEFAULT_SPACEBETWEEN;
		this.distance = DEFAULT_DISTANCE;
		this.type = DEFAULT_DISTRO;
		this.docw = DEFAULT_WIDTH;
		this.doch = DEFAULT_HEIGHT;
		this.shapeSize = DEFAULT_SIZE;
		this.rotate = DEFAULT_ROTATION;
		this.initialPositionX = 0;
		this.initialPositionY = 0;

		// Easy wrapper that is called from the submit so
		// that we can use these values in this class.
		this.setDocSize = function(w, h, shapeSize) {
			this.docw = w;
			this.doch = h;
			this.shapeSize = shapeSize;
		};

		// Return the percentages per @x and @y of the screen.
		// This is specifically used to figure out what color to
		// paint a shape based on its position on the screen.
		this.getPercentage = function(x, y) {
			return {
				// The initial position is positive, and x is relative to that, therefore
				// could be negative. That's why it's a plus.
				x: ~~(((x + this.initialPositionX) / this.docw) * 100),
				y: ~~(((y + this.initialPositionY) / this.doch) * 100)
			};
		};

		// Gets the initial position for the distribution scheme
		// returns an obj as {x: #, y: #}
		this.getInitialPosition = function() {
			switch(this.type) {
				case 'even':
				case 'topleft':
				case 'alternate':
					this.initialPositionX = 0;
					this.initialPositionY = 0;
					break;
				case 'center':
				case 'kaleidoscope':
				case 'spiral':
					this.initialPositionX = ~~(this.docw / 2);
					this.initialPositionY = ~~(this.doch / 2);
					break;
				default:
					this.initialPositionX = 0;
					this.initialPositionY = 0;
					break;
			}

			return {x: this.initialPositionX, y: this.initialPositionY};
		}

		// This returns a set of points and rotations for shapeScheme to position things
		// return value is an array of {x:#, y:#, r:#}
		// @i is the shape index, used specifically by spiral to generate position.
		this.generatePositions = function(i) {
			var ret = [];
			var s  = Math.floor(this.shapeSize * this.space);
			var r;

			switch(this.rotate) {
				case 'leftright':
					r = Math.PI / 180 * util.random(0, 180, 180);
					break;
				case 'deg30':
					r = Math.PI / 180 * util.random(0, 360, 30);
					break;
				case 'deg45':
					r = Math.PI / 180 * util.random(0, 360, 45);
					break;
				case 'deg60':
					r = Math.PI / 180 * util.random(0, 360, 60);
					break;
				case 'deg90':
					r = Math.PI / 180 * util.random(0, 270, 90);
					break;
				case 'deg120':
					r = Math.PI / 180 * util.random(0, 360, 120);
					break;
				case 'deg180':
					r = Math.PI / 180 * (util.random(0, 180, 180) + 90);
					break;
				case 'full':
					r = Math.PI / 180 * util.random(0, 360);
					break;
				case 'none':
				default:
					r = 0;
					break;
			}

			switch(this.type) {
				case 'even':
					ret.push({x: util.random(0, this.docw, s), y: util.random(0, this.doch, s), r:r});
					break;

				case 'alternate':
					var s2 = s * this.distance;
					var x1 = util.random(0, this.docw, s);
					var y1 = util.random(0, this.doch, s2);
					x1 = (Math.round(y1 / s2) % 2 == 0) ? x1 - (s / 2) : x1;
					// y1 = ((x1 / s) % 2 == 0) ? y1 + (s / 2) : y1;
					ret.push({x:x1, y:y1, r:r});
					break;

				case 'topleft':
					var w1 = Math.floor(this.docw / (2 * this.distance));
					var h1 = Math.floor(this.doch / (2 * this.distance));
					var w2 = util.exprandom(s * -1, w1, s);
					var h2 = util.exprandom(s * -1, h1, s);
					ret.push({x:w2, y:h2, r:r});
					break;

				case 'center':
					var w1 = Math.floor(this.docw / (2 * this.distance));
					var h1 = Math.floor(this.doch / (2 * this.distance));
					var w2 = util.exprandom(0, w1, s);
					var h2 = util.exprandom(0, h1, s);
					w2 = (Math.random() > 0.5) ? w2 * -1 : w2;
					h2 = (Math.random() > 0.5) ? h2 * -1 : h2;
					ret.push({x:w2, y:h2, r:r});
					break;

				case 'kaleidoscope':
					var w = Math.floor(this.docw / 2);
					var h = Math.floor(this.doch / 2);
					var x1 = util.random(s * -1, w, s);
					var y1 = util.random(s * -1, h, s);
					ret.push({x:x1, y:y1, r:r});
					ret.push({x:-1*x1, y:y1, r:r + Math.PI / 2 });
					ret.push({x:-1*x1, y:-1*y1, r:r + Math.PI});
					ret.push({x:x1, y:-1*y1, r:r + (3 * Math.PI / 2)});
					break;

				case 'spiral':
					var t = Math.PI / 180 * i * (222.4 * this.distance);
					var d = this.space * i;
					var x1 = Math.floor(d * Math.cos(t));
					var y1 = Math.floor(d * Math.sin(t));
					ret.push({x:x1, y:y1, r:r + t});
					break;

				default:
					break;
			}
			return ret;
		};
	},


	/////////////////////////////////
	// Generator
	// The master of ceremonies, this will aggregate all of the objects
	// and render the image based on those parameters.
	__imageGenerator = function(w,h, shapeGenObj, colorSchemeObj, distroSchemeObj) {
		this.w = w;
		this.h = h;
		this.shapes = shapeGenObj;
		this.colorScheme = colorSchemeObj;
		this.distroScheme = distroSchemeObj;

		// Draw a Background Field with a BG Color
		// (which will remove that color from the list of colors)
		this.refresh = function(ctx) {
			ctx.fillStyle = this.colorScheme.generateBGColor();
			ctx.fillRect(0, 0, this.w, this.h);
		}

		this.createCanvas = function() {
			var $canv = $("<canvas></canvas>").addClass('img');
			return $canv;
		}

		// Generate the whole image.  Loop through the Shape Generator and
		// add the shapes based on the Distribution Scheme and Color Scheme
		this.generate = function() {
			var ip = this.distroScheme.getInitialPosition(),
				$canvas = this.createCanvas(),
				cso = this.colorScheme;
				ctx = $canvas.get(0).getContext('2d');

			// For some reason, this is needed to prevent the image from zooming
			$canvas.attr('width', this.w).attr('height', this.h);

			this.refresh(ctx);

			ctx.translate(ip.x, ip.y);

			for (var i = 0; i < this.shapes.numShapes; i++) {
				this.shapes.generateShape(ctx, this.colorScheme, this.distroScheme, i);
			}

			$(".color-adjust").removeClass('black white').addClass(function() {
				return (cso.getAvgBrightness() > BRIGHTNESS_THRESHOLD) ? 'black' : 'white';
			});

			$canvas.appendTo('.img-container').fadeIn(SPEED, function() {
				$(".img").not(":last").remove();
			});
		}
	};

	return {
		shapeScheme			: __shapeScheme,
		colorScheme			: __colorScheme,
		distributionScheme	: __distributionScheme,
		imageGenerator		: __imageGenerator
	};
})(jQuery, document, undefined);




// Onload, do this.
$(function() {
	var shapeScheme = new SHAAPES.shapeScheme(),
		colorScheme = new SHAAPES.colorScheme(),
		distroScheme = new SHAAPES.distributionScheme();

	// Since we can reasonably assume that the user is making
	// a background image for this computer, we can grab the screen
	// resolution and populate the sizes respectively
	$('#docw').val(window.screen.width * (window.devicePixelRatio || 1));
	$('#doch').val(window.screen.height * (window.devicePixelRatio || 1));

	// Initialze Shapes
	shapeScheme.appendShapeButtons($('#shape-button-area'));

	// Initialize Colors
	colorScheme.container = $('#color-sel-area');
	colorScheme.$clresults = $("#cl-results");

	$("#reset-color-sel").click(function(ev) {
		ev.preventDefault();
		colorScheme.resetColorList();
		colorScheme.appendColorButton('444444');
		colorScheme.appendColorButton('f3f3f3');
	}).click();

	$("#add-color-sel").click(function(ev) {
		ev.preventDefault();
		colorScheme.appendColorButton('FFFFFF');
	});


	$("#btn--download").click(function(ev) {
		ev.preventDefault();
		var p = $('.img').last().get(0).toDataURL($("#output-format").val(), 1.0);
		$('#omgimgdl').attr('src', p);
		$('#shaapes--download').removeClass('hide');
	});

	$('.btn-close').click(function(ev) {
		ev.preventDefault();
		$(".popup").addClass('hide');
	});

	$(".dock-btn").click(function(ev) {
		ev.preventDefault();
		var id = $(this).attr('id'),
			$block = $("#" + id.replace('btn', 'shaapes'))

		$('.dock-btn').not(this).removeClass('selected');
		$(this).toggleClass('selected');

		$('.block-wrapper').not($block).addClass('hide');
		$block.toggleClass('hide');

		return false;
	});

	$("#btn--refresh").click(function(ev) {
		$(".hint").addClass("invisible");
		setTimeout(function() {
			$(".hint").addClass('hide');
		}, 1000);
		$("#alltheshapesthatsshapelyshape").submit();
	});

	// On submit of the form, RUN ALL THE THINGS!
	$("#alltheshapesthatsshapelyshape").submit(function(ev) {
		var hashStr = [],
			w = parseInt($('#docw').val()) || DEFAULT_WIDTH,
			h = parseInt($('#doch').val()) || DEFAULT_HEIGHT,
			colorHashArr = [];

		ev.preventDefault();

		colorScheme.transparency = parseFloat($('#trans').val()) || DEFAULT_TRANS;
		colorScheme.transparency = colorScheme.transparency > 1 ? 1 : colorScheme.transparency;
		colorScheme.variance = parseFloat($('#variance').val()) || DEFAULT_COLOR_VARIANCE;
		colorScheme.isResetBG = true;

		$(".color-sel").each(function(i) {
			colorHashArr.push(this.value + 'W' + $(this).data('weight'));
			colorScheme.addColor(this.value, $(this).data('weight'));
		});


		// Process all the shape selections
		shapeScheme.resetShapeList();
		shapeScheme.size = parseInt($('#shapesize').val()) || DEFAULT_SIZE;
		shapeScheme.numShapes = ~~((w / shapeScheme.size) * (h / shapeScheme.size)) * 10;
		// shapeScheme.numShapes = parseInt($('#numshapes').val()) || DEFAULT_NUMSHAPES;
		shapeScheme.sizeRand = $('#sizerand').val();

		var shapeHashArr = [];
		$('#shape-button-area').children('a').each(function(i) {
			if ($(this).hasClass('selected')) {
				shapeHashArr.push(i);
				shapeScheme.addShape(this.id.replace('shape-button-', ''));
			}
		});

		// Process distribution options
		distroScheme.setDocSize(w, h, shapeScheme.size);
		distroScheme.type = $('#distribution').val();
		distroScheme.space = $("#space").val() || DEFAULT_SPACEBETWEEN;
		distroScheme.distance = parseFloat($("#distance").val()) || DEFAULT_DISTANCE;
		distroScheme.rotate = $('#rotate').val();

		hashStr.push(shapeHashArr.generateBitmask());
		hashStr.push(shapeScheme.numShapes);
		hashStr.push(shapeScheme.sizeRand);
		hashStr.push(shapeScheme.size);
		hashStr.push(distroScheme.rotate);
		hashStr.push(colorHashArr.join(','));
		hashStr.push(colorScheme.transparency);
		hashStr.push(colorScheme.variance);
		hashStr.push(distroScheme.type);
		hashStr.push(distroScheme.space);
		hashStr.push(distroScheme.distance);

		_canG = new SHAAPES.imageGenerator(w, h, shapeScheme, colorScheme, distroScheme);
		_canG.generate();

		var hhhh = util.base64_encode(hashStr.join(HASH_SEPARATOR));

		// generate hash string and set it
		$("#share-url").attr('href', location.href.split('#')[0] + '#' + hhhh);
		document.cookie = 'lastVal=' + hhhh;
		return false;
	});

	$("#cl-search").keypress(function(ev) {
		if (ev.keyCode == 13) {
			ev.preventDefault();
			colorScheme.getCLResults(this.value);
		}
	});

	$("#cl-submit").click(function(ev) {
		ev.preventDefault();
		colorScheme.getCLResults($("#cl-search").val());
	});

	// Pull any valid arguments out of the hash tag
	var processHashValues = function(h) {
		var shapeArr, colorArr,
			optArr = util.base64_decode(h.replace('#', '')).split(HASH_SEPARATOR);

		if (optArr.length > 1) {
			shapeArr = util.parseBitmask(optArr[0]);
			$('#shape-button-area').children('a').removeClass('selected');
			for (var j = 0; j < shapeArr.length; j++) {
				$('#shape-button-area').children('a').eq(shapeArr[j]).addClass('selected');
			}

			colArr = optArr[5].split(',');
			colorScheme.resetColorList();
			for (var j = 0; j < colArr.length; j++) {
				colorScheme.appendColorButton(colArr[j].split('W')[0], colArr[j].split('W')[1]);
			}
			$("#numshapes").val(optArr[1]);
			$("#sizerand").val(optArr[2]);
			$("#shapesize").val(optArr[3]);
			$("#rotate").val(optArr[4]);
			$('#trans').val(optArr[6]);
			$("#variance").val(optArr[7]);
			$('#distribution').val(optArr[8]);
			$('#space').val(optArr[9]);
			$('#distance').val(optArr[10]);
		}

		// Kick the form off here, even if the values
		// weren't set above
		$("#alltheshapesthatsshapelyshape").submit();
	};



	if (window.location.hash.length > 1) {
		processHashValues(window.location.hash);
	}
	else if (document.cookie.indexOf('lastVal') < 0) {
		$("#block-wrapper-about").show();
		$(".hint").removeClass('hide').removeClass('invisible');
		processHashValues(DEMO_VALUE);
		// document.cookie = 'lastVal=' + DEMO_VALUE;
	}
	else {
		processHashValues(document.cookie.replace('lastVal=', ''));
	}

});

