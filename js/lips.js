var lipsCode = function() {
		jQuery('.aui-theme-default.lips #header .aui-header').attr('id', 'starfield');
		function Starfield() {
			this.fps = 30;
			this.canvas = null;
			this.width = 0;
			this.height = 0;
			this.minVelocity = 5;
			this.maxVelocity = 20;
			this.stars = 100;
			this.intervalId = 0;
		}
		Starfield.prototype.initialise = function(div) {
			var self = this;
			this.containerDiv = div;
			self.width = window.innerWidth > 1800 ? window.innerWidth : 1800;
			self.height = 60; // window.innerHeight;

			window.addEventListener('resize', function resize(event) {
				self.width = window.innerWidth;
				self.height = window.innerHeight;
				self.canvas.width = self.width;
				self.canvas.height = self.height;
				self.draw();
			});
			var canvas = document.createElement('canvas');
			div.appendChild(canvas);
			this.canvas = canvas;
			this.canvas.width = this.width;
			this.canvas.height = this.height;
		};

		Starfield.prototype.start = function() {
			var stars = [];
			for(var i=0; i<this.stars; i++) {
				stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, Math.random()*3+1,
				 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
			}
			this.stars = stars;

			var self = this;
			this.intervalId = setInterval(function() {
				self.update();
				self.draw();	
			}, 1000 / this.fps);
		};

		Starfield.prototype.stop = function() {
			clearInterval(this.intervalId);
		};

		Starfield.prototype.update = function() {
			var dt = 1 / this.fps;

			for(var i=0; i<this.stars.length; i++) {
				var star = this.stars[i];
				star.x -= dt * star.velocity;
				if(star.x < 0) {
					this.stars[i] = new Star(this.width, Math.random()*this.height, Math.random()*3+1, 
				 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
				}
			}
		};

		Starfield.prototype.draw = function() {
			var ctx = this.canvas.getContext("2d");
		 	ctx.fillStyle = '#1e1f33';
			ctx.fillRect(0, 0, this.width, this.height);
			ctx.fillStyle = '#ffffff';
			for(var i=0; i<this.stars.length;i++) {
				var star = this.stars[i];
				ctx.fillRect(star.x, star.y, star.size, star.size);
			}
		};

		function Star(x, y, size, velocity) {
			this.x = x;
			this.y = y; 
			this.size = size;
			this.velocity = velocity;
		}

		var container = document.getElementById('starfield');
				var starfield = new Starfield();
				starfield.initialise(container);
				starfield.start();
				function randomise() {
					starfield.stop();
					starfield.stars = Math.random()*1000 + 50;
					starfield.minVelocity = Math.random()*30+5;
					starfield.maxVelocity = Math.random()*50 + starfield.minVelocity;			
					starfield.start();
		}
	};
