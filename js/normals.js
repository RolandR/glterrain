
function calculateNormals(v, points, size){
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

	for(var x = 1; x < points.length; x++){
		for(var y = 1; y < points.length; y++){

			nx = 0;
			ny = 0;
			nz = 0;

			nx += normals[((x)*size+(y))*18+0 ];
			nz += normals[((x)*size+(y))*18+1 ];
			ny += normals[((x)*size+(y))*18+2 ];
			
			nx += normals[((x-1)*size+(y))*18+3 ];
			nz += normals[((x-1)*size+(y))*18+4 ];
			ny += normals[((x-1)*size+(y))*18+5 ];
			
			nx += normals[((x)*size+(y-1))*18+6 ];
			nz += normals[((x)*size+(y-1))*18+7 ];
			ny += normals[((x)*size+(y-1))*18+8 ];
			

			nx += normals[((x-1)*size+(y))*18+9 ];
			nz += normals[((x-1)*size+(y))*18+10];
			ny += normals[((x-1)*size+(y))*18+11];
			
			nx += normals[((x-1)*size+(y-1))*18+12];
			nz += normals[((x-1)*size+(y-1))*18+13];
			ny += normals[((x-1)*size+(y-1))*18+14];
			
			nx += normals[((x)*size+(y-1))*18+15];
			nz += normals[((x)*size+(y-1))*18+16];
			ny += normals[((x)*size+(y-1))*18+17];

			

			normals[((x)*size+(y))*18+0 ] = nx;
			normals[((x)*size+(y))*18+1 ] = nz;
			normals[((x)*size+(y))*18+2 ] = ny;
			
			normals[((x-1)*size+(y))*18+3 ] = nx;
			normals[((x-1)*size+(y))*18+4 ] = nz;
			normals[((x-1)*size+(y))*18+5 ] = ny;
			
			normals[((x)*size+(y-1))*18+6 ] = nx;
			normals[((x)*size+(y-1))*18+7 ] = nz;
			normals[((x)*size+(y-1))*18+8 ] = ny;
			

			normals[((x-1)*size+(y))*18+9 ] = nx;
			normals[((x-1)*size+(y))*18+10] = nz;
			normals[((x-1)*size+(y))*18+11] = ny;
			
			normals[((x-1)*size+(y-1))*18+12] = nx;
			normals[((x-1)*size+(y-1))*18+13] = nz;
			normals[((x-1)*size+(y-1))*18+14] = ny;
			
			normals[((x)*size+(y-1))*18+15] = nx;
			normals[((x)*size+(y-1))*18+16] = nz;
			normals[((x)*size+(y-1))*18+17] = ny;
			
		}
	}

	return normals;
}
