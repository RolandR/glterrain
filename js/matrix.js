function multiplyMatrices(a, b){

	var result = [];

	var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
		a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
		a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
		a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

	// Cache only the current line of the second matrix
	var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];  
	result[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	result[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	result[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	result[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
	result[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	result[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	result[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	result[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
	result[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	result[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	result[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	result[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
	result[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
	result[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
	result[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
	result[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

	return result;
}

function multiplyArrayOfMatrices(matrices){

	var inputMatrix = matrices[matrices.length-1];

	if(matrices.length > 1){

		for(var i = matrices.length-2; i > 0; i--) {
			inputMatrix = multiplyMatrices(inputMatrix, matrices[i]);
		}
	}

	return inputMatrix;
}

function normalMatrix(matrix) {

	/*
		This function takes the inverse and then transpose of the provided
		4x4 matrix. The result is a 3x3 matrix. Essentially the translation
		part of the matrix gets removed.

		https://github.com/toji/gl-matrix
	*/

	var a00 = matrix[0], a01 = matrix[1], a02 = matrix[2], a03 = matrix[3],
		a10 = matrix[4], a11 = matrix[5], a12 = matrix[6], a13 = matrix[7],
		a20 = matrix[8], a21 = matrix[9], a22 = matrix[10], a23 = matrix[11],
		a30 = matrix[12], a31 = matrix[13], a32 = matrix[14], a33 = matrix[15],

	b00 = a00 * a11 - a01 * a10,
	b01 = a00 * a12 - a02 * a10,
	b02 = a00 * a13 - a03 * a10,
	b03 = a01 * a12 - a02 * a11,
	b04 = a01 * a13 - a03 * a11,
	b05 = a02 * a13 - a03 * a12,
	b06 = a20 * a31 - a21 * a30,
	b07 = a20 * a32 - a22 * a30,
	b08 = a20 * a33 - a23 * a30,
	b09 = a21 * a32 - a22 * a31,
	b10 = a21 * a33 - a23 * a31,
	b11 = a22 * a33 - a23 * a32,

	// Calculate the determinant
	det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

	if (!det) { 
		return null; 
	}
	det = 1.0 / det;

	var result = [];

	result.push((a11 * b11 - a12 * b10 + a13 * b09) * det);
	result.push((a12 * b08 - a10 * b11 - a13 * b07) * det);
	result.push((a10 * b10 - a11 * b08 + a13 * b06) * det);
	result.push(0);

	result.push((a02 * b10 - a01 * b11 - a03 * b09) * det);
	result.push((a00 * b11 - a02 * b08 + a03 * b07) * det);
	result.push((a01 * b08 - a00 * b10 - a03 * b06) * det);
	result.push(0);

	result.push((a31 * b05 - a32 * b04 + a33 * b03) * det);
	result.push((a32 * b02 - a30 * b05 - a33 * b01) * det);
	result.push((a30 * b04 - a31 * b02 + a33 * b00) * det);
	result.push(0);

	result.push(0);
	result.push(0);
	result.push(0);
	result.push(1);

	return result;
}

function invertMatrix( matrix ) {
	
	// Adapted from: https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
	
	// Performance note: Try not to allocate memory during a loop. This is done here
	// for the ease of understanding the code samples.
	var result = [];

	var n11 = matrix[0], n12 = matrix[4], n13 = matrix[ 8], n14 = matrix[12];
	var n21 = matrix[1], n22 = matrix[5], n23 = matrix[ 9], n24 = matrix[13];
	var n31 = matrix[2], n32 = matrix[6], n33 = matrix[10], n34 = matrix[14];
	var n41 = matrix[3], n42 = matrix[7], n43 = matrix[11], n44 = matrix[15];

	result[ 0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
	result[ 4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
	result[ 8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
	result[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
	result[ 1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
	result[ 5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
	result[ 9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
	result[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
	result[ 2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
	result[ 6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
	result[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
	result[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
	result[ 3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
	result[ 7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
	result[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
	result[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

	var determinant = n11 * result[0] + n21 * result[4] + n31 * result[8] + n41 * result[12];

	if ( determinant === 0 ) {
		throw new Error("Can't invert matrix, determinant is 0");
	}
	
	for( var i=0; i < result.length; i++ ) {
		result[i] /= determinant;
	}

	return result;
}