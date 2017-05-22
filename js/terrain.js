
var canvas = document.getElementById("renderCanvas");

canvas.width = document.getElementById("canvasContainer").clientWidth;
canvas.height = document.getElementById("canvasContainer").clientHeight;

var renderer = new Renderer("renderCanvas");

init();

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
				,z: getNoise(x, y)*0.2
			}
			
		}
	}

	var vertices = buildMeshFromPoints(points, size);

	var normals = calculateNormals(vertices);

	console.log(vertices.length, normals.length);

	renderer.addVertices(vertices, normals);
	
}

function getNoise(x, y){
	var res = 512;
	
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
	lightness += (noise.simplex2(x/res, y/res))*0.03;
	res /= 2;
	lightness += (noise.simplex2(x/res, y/res))*0.015;
	res /= 2;
	lightness += (noise.simplex2(x/res, y/res))*0.008;

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





























