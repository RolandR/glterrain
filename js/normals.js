
function calculateNormals(v, points){
	var normals = new Float32Array(v.length);
	for(var i = 0; i < v.length; i += 9){
		
		normals[i+0] = (v[i+4] - v[i+1])*(v[i+8] - v[i+2]) - (v[i+5] - v[i+2])*(v[i+7] - v[i+1]);
		normals[i+1] = (v[i+5] - v[i+2])*(v[i+6] - v[i+0]) - (v[i+3] - v[i+0])*(v[i+8] - v[i+2]);
		normals[i+2] = (v[i+3] - v[i+0])*(v[i+7] - v[i+1]) - (v[i+4] - v[i+1])*(v[i+6] - v[i+0]);
		
		normals[i+3] = (v[i+4] - v[i+1])*(v[i+8] - v[i+2]) - (v[i+5] - v[i+2])*(v[i+7] - v[i+1]);
		normals[i+4] = (v[i+5] - v[i+2])*(v[i+6] - v[i+0]) - (v[i+3] - v[i+0])*(v[i+8] - v[i+2]);
		normals[i+5] = (v[i+3] - v[i+0])*(v[i+7] - v[i+1]) - (v[i+4] - v[i+1])*(v[i+6] - v[i+0]);
		
		normals[i+6] = (v[i+4] - v[i+1])*(v[i+8] - v[i+2]) - (v[i+5] - v[i+2])*(v[i+7] - v[i+1]);
		normals[i+7] = (v[i+5] - v[i+2])*(v[i+6] - v[i+0]) - (v[i+3] - v[i+0])*(v[i+8] - v[i+2]);
		normals[i+8] = (v[i+3] - v[i+0])*(v[i+7] - v[i+1]) - (v[i+4] - v[i+1])*(v[i+6] - v[i+0]);
		
	}

	var nx, ny, nz;

	for(var x = 0; x < points.length; x++){
		for(var y = 0; y < points.length; y++){

			nx = 0;
			ny = 0;
			nz = 0;

			nx += v[(x*size+y)*18+0 ] = points[x][y].x;
			nz += v[(x*size+y)*18+1 ] = points[x][y].z;
			ny += v[(x*size+y)*18+2 ] = points[x][y].y;
			
			nx += v[(x*size+y)*18+3 ] = points[x+1][y].x;
			nz += v[(x*size+y)*18+4 ] = points[x+1][y].z;
			ny += v[(x*size+y)*18+5 ] = points[x+1][y].y;
			
			nx += v[(x*size+y)*18+6 ] = points[x][y+1].x;
			nz += v[(x*size+y)*18+7 ] = points[x][y+1].z;
			ny += v[(x*size+y)*18+8 ] = points[x][y+1].y;
			

			nx += v[(x*size+y)*18+9 ] = points[x+1][y].x;
			nz += v[(x*size+y)*18+10] = points[x+1][y].z;
			ny += v[(x*size+y)*18+11] = points[x+1][y].y;
			
			nx += v[(x*size+y)*18+12] = points[x+1][y+1].x;
			nz += v[(x*size+y)*18+13] = points[x+1][y+1].z;
			ny += v[(x*size+y)*18+14] = points[x+1][y+1].y;
			
			nx += v[(x*size+y)*18+15] = points[x][y+1].x;
			nz += v[(x*size+y)*18+16] = points[x][y+1].z;
			ny += v[(x*size+y)*18+17] = points[x][y+1].y;
			
		}
	}

	return normals;
}