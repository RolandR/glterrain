
function calculateNormals(points){
	var normals = new Float32Array(points.length);
	for(var i = 0; i < points.length; i += 9){
		
		normals[i+0] = (points[i+4] - points[i+1])*(points[i+8] - points[i+2]) - (points[i+5] - points[i+2])*(points[i+7] - points[i+1]);
		normals[i+1] = (points[i+5] - points[i+2])*(points[i+6] - points[i+0]) - (points[i+3] - points[i+0])*(points[i+8] - points[i+2]);
		normals[i+2] = (points[i+3] - points[i+0])*(points[i+7] - points[i+1]) - (points[i+4] - points[i+1])*(points[i+6] - points[i+0]);
		
		normals[i+3] = (points[i+4] - points[i+1])*(points[i+8] - points[i+2]) - (points[i+5] - points[i+2])*(points[i+7] - points[i+1]);
		normals[i+4] = (points[i+5] - points[i+2])*(points[i+6] - points[i+0]) - (points[i+3] - points[i+0])*(points[i+8] - points[i+2]);
		normals[i+5] = (points[i+3] - points[i+0])*(points[i+7] - points[i+1]) - (points[i+4] - points[i+1])*(points[i+6] - points[i+0]);
		
		normals[i+6] = (points[i+4] - points[i+1])*(points[i+8] - points[i+2]) - (points[i+5] - points[i+2])*(points[i+7] - points[i+1]);
		normals[i+7] = (points[i+5] - points[i+2])*(points[i+6] - points[i+0]) - (points[i+3] - points[i+0])*(points[i+8] - points[i+2]);
		normals[i+8] = (points[i+3] - points[i+0])*(points[i+7] - points[i+1]) - (points[i+4] - points[i+1])*(points[i+6] - points[i+0]);
		
	}

	return normals;
}