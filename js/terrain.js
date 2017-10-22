
var canvas = document.getElementById("renderCanvas");

canvas.width = document.getElementById("canvasContainer").clientWidth;
canvas.height = document.getElementById("canvasContainer").clientHeight;

var renderer = new Renderer("renderCanvas");

setTimeout(init, 10);

function init(){

	noise.seed(Math.random());

	var size = 512;
	var points = [];

	for(var x = 0; x < size; x++){

		points[x] = [];
		
		for(var y = 0; y < size; y++){

			points[x][y] = {
				 x: (x/size)*2-1
				,y: (y/size)*2-1
				,z: getNoise(x, y, size)*0.2
				//,z: Math.round((y-40)/size)*0.5-0.5 + Math.random()*0.005
				,erosion: 0
				,sediment: 0
				,water: 1
				,newWater: 0
				,down: 0
			}
			
		}
	}

	points = erode(points, size);

	var vertices = buildMeshFromPoints(points, size);

	var normals = calculateNormals(vertices, points, size);

	console.log(vertices.length, normals.length);

	renderer.addVertices(vertices, normals);

	var controls = new Controls();

	document.getElementById("hangOn").style.display = "none";
	
}

function erode(points, size){

	var scale = size/512;

	var erosion = 0.0005*scale;
	var deposition = 0.0000002*scale;
	var evaporation = 0.9;
	var iterations = 300;
	var steepness;
	var down;
	var water;
	var stayingWater;

	for(var i = 0; i < iterations; i++){
		for(var x = 1; x < size-2; x++){
			for(var y = 1; y < size-2; y++){

				down = 0;
				
				down += Math.max(points[x][y].z - points[x+1][y].z, 0);
				down += Math.max(points[x][y].z - points[x+1][y+1].z, 0);
				down += Math.max(points[x][y].z - points[x+1][y-1].z, 0);
				down += Math.max(points[x][y].z - points[x][y+1].z, 0);
				down += Math.max(points[x][y].z - points[x][y-1].z, 0);
				down += Math.max(points[x][y].z - points[x-1][y].z, 0);
				down += Math.max(points[x][y].z - points[x-1][y+1].z, 0);
				down += Math.max(points[x][y].z - points[x-1][y-1].z, 0);

				points[x][y].down = down;

				if(down != 0){
					water = points[x][y].water * evaporation;
					stayingWater = (water*0.0002)/(down*scale+1);
					water = water - stayingWater;

					points[x+1][y].newWater += (Math.max(points[x][y].z - points[x+1][y].z, 0)/down) * water;
					points[x+1][y+1].newWater += (Math.max(points[x][y].z - points[x+1][y+1].z, 0)/down) * water;
					points[x+1][y-1].newWater += (Math.max(points[x][y].z - points[x+1][y-1].z, 0)/down) * water;
					points[x][y+1].newWater += (Math.max(points[x][y].z - points[x][y+1].z, 0)/down) * water;
					points[x][y-1].newWater += (Math.max(points[x][y].z - points[x][y-1].z, 0)/down) * water;
					points[x-1][y].newWater += (Math.max(points[x][y].z - points[x-1][y].z, 0)/down) * water;
					points[x-1][y+1].newWater += (Math.max(points[x][y].z - points[x-1][y+1].z, 0)/down) * water;
					points[x-1][y-1].newWater += (Math.max(points[x][y].z - points[x-1][y-1].z, 0)/down) * water;

					points[x][y].water = 1 + stayingWater;
				}		
			}
		}

		for(var x = 1; x < size-2; x++){
			for(var y = 1; y < size-2; y++){
				points[x][y].water += points[x][y].newWater;
				points[x][y].newWater = 0;

				var oldZ = points[x][y].z;
				points[x][y].z += (-(points[x][y].down-0.005/scale)*points[x][y].water) * erosion + points[x][y].water * deposition;
				points[x][y].erosion = oldZ - points[x][y].z;

				if(oldZ < points[x][y].z){
					points[x][y].water = Math.max(points[x][y].water - (points[x][y].z - oldZ)*1000, 0);
				}
			}
		}
	}

	for(var x = 0; x < size; x++){
		for(var y = 0; y < size; y++){
			points[x][y].z -= 0.2;
		}
	}

	return points;
	
}

function getNoise(x, y, res){
	
	var lightness = (noise.simplex2(x/res, y/res));
	res /= 2;
	lightness += (noise.simplex2(x/res, y/res))*0.5;
	res /= 2;
	lightness += (noise.simplex2(x/res, y/res))*0.25;
	res /= 2;
	lightness += (noise.simplex2(x/res, y/res))*0.125;
	res /= 2;
	lightness += (noise.simplex2(x/res, y/res))*0.06;
	res /= 2;
	//lightness += (noise.simplex2(x/res, y/res))*0.03;
	res /= 2;
	lightness += (noise.simplex2(x/res, y/res))*0.015;
	res /= 2;
	//lightness += (noise.simplex2(x/res, y/res))*0.008;

	return lightness;
}

function buildMeshFromPoints(points, size){
	var mesh = new Float32Array(Math.pow(size-1, 2)*18);

	for(var x = 0; x < size-1; x++){
		for(var y = 0; y < size-1; y++){
			mesh[(x*size+y)*18+0 ] = points[x][y].x;
			mesh[(x*size+y)*18+1 ] = points[x][y].z;
			mesh[(x*size+y)*18+2 ] = points[x][y].y;
			
			mesh[(x*size+y)*18+3 ] = points[x+1][y].x;
			mesh[(x*size+y)*18+4 ] = points[x+1][y].z;
			mesh[(x*size+y)*18+5 ] = points[x+1][y].y;
			
			mesh[(x*size+y)*18+6 ] = points[x][y+1].x;
			mesh[(x*size+y)*18+7 ] = points[x][y+1].z;
			mesh[(x*size+y)*18+8 ] = points[x][y+1].y;
			

			mesh[(x*size+y)*18+9 ] = points[x+1][y].x;
			mesh[(x*size+y)*18+10] = points[x+1][y].z;
			mesh[(x*size+y)*18+11] = points[x+1][y].y;
			
			mesh[(x*size+y)*18+12] = points[x+1][y+1].x;
			mesh[(x*size+y)*18+13] = points[x+1][y+1].z;
			mesh[(x*size+y)*18+14] = points[x+1][y+1].y;
			
			mesh[(x*size+y)*18+15] = points[x][y+1].x;
			mesh[(x*size+y)*18+16] = points[x][y+1].z;
			mesh[(x*size+y)*18+17] = points[x][y+1].y;
		}
	}

	return mesh;
}





























