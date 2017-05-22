var fragmentShader = `

precision mediump float;
//varying lowp vec4 vColor;

varying highp vec3 lighting;

void main(void){
	//gl_FragColor = vec4(vColor.rgb, 0.5);

	vec3 color = vec3(0.5, 0.5, 0.5);
	color = color * lighting;
	gl_FragColor = vec4(color, 1.0);
}

`;

