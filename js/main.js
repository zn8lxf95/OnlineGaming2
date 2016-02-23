         $(document).ready(function(){
              dBug("Document is ready")

              var canvas = $("#gameCanvas");
              var context = canvas.get(0).getContext("2d");

              context.canvas.width = window.innerWidth;
              context.canvas.height = window.innerHeight;

              function moveStuff(){

                var isRunning = true;
                var shapes;
                var MAXSIZE = 90;
                var numOfshapes = 20;
                
                var Shape = function(x,y,w,h,v, r, g, b) {
                  this.x = x;
                  this.y = y;
                  this.w = w;
                  this.h = h;
                  this.vx = v;
                  this.vy = v;
                  this.r = r ;
                  this.g = g; 
                  this.b = b; 
                  //var r =  Math.floor(Math.random()*256);
                  //var g =  Math.floor(Math.random()*256);
                  //var b =  Math.floor(Math.random()*256);
                  //return "rgb(" + r + "," + g + "," + b + ")";

                };

                //context.fillStyle = Shape();

                function init() {
                  
                  shapes = new Array();

                  for(var i = 0; i < numOfshapes; i++) {
                    var s = Math.random() * MAXSIZE;

                    var v = 10 / s;

                    var red = Math.floor(Math.random() * 255);
                    var green = Math.floor(Math.random() * 255);
                    var blue = Math.floor(Math.random() * 255);

                    do {
                        var x = Math.random() * canvas.width();
                        var y = Math.random() * canvas.height();
                      } while ((x < 0 || x + s > canvas.width()) || (y < 0 || y + s > canvas.height()));

                    shapes.push(new Shape(x, y, s , s , v, red, green, blue));
                  };
                };

                function boundsCheck(obj) {

                  //left & right
                  if (obj.x < 0 || obj.x + obj.w > canvas.width()) {
                    dBug("collision left or right");
                    obj.vx = obj.vx * -1;
                  }

                  //top & bottom
                  if (obj.y < 0 || obj.y + obj.h > canvas.height()) {
                    obj.vy = obj.vy * -1;
                  }

                };

                function animate(){
                  dBug("in animate()");

                  if(isRunning) {
                    // clear the canvas
                    context.clearRect(0,0,canvas.width(),canvas.height());


                    for(var i = 0; i < shapes.length; i++) {
                      shapes[i].x = shapes[i].x + shapes[i].vx;
                      shapes[i].y = shapes[i].y + shapes[i].vy;
                      boundsCheck(shapes[i]);
                      context.fillStyle = "rgba(" + shapes[i].r + ", " + shapes[i].g + "," + shapes[i].b + ", 255)";
                      context.fillRect(shapes[i].x,shapes[i].y,shapes[i].w,shapes[i].h);

                    }

                    setTimeout(animate, 33);

                  }

                };

                init();
                animate();

              };

              moveStuff();

              function dBug(data){
                console.log(data);
              }
            });
