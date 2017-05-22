var fragmentShader = `

precision mediump float;
//varying lowp vec4 vColor;

varying highp vec3 lighting;
varying float fogness;

void main(void){
	//gl_FragColor = vec4(vColor.rgb, 0.5);

	vec3 fogColor = vec3(0.628906, 0.78125, 0.886719);
	vec3 color = vec3(0.5, 0.5, 0.5);
	color = color * lighting;
	color = color*(1.0-fogness) + fogColor*(fogness);
	gl_FragColor = vec4(color, 1.0);
}

`;

