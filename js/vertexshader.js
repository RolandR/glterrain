



var vertexShader = `

uniform mat4 model;
uniform mat4 view;
uniform mat4 perspective;
uniform mat4 normalTransform;
uniform float aspect;
uniform float maxDistance;

attribute vec3 coordinates;
attribute vec3 vertexNormal;

varying highp vec3 lighting;
varying float fogness;

void main(void){

	highp vec3 ambientLight = vec3(0.22, 0.25, 0.3);
    highp vec3 directionalLightColor = vec3(1.0, 1.0, 0.9);
    highp vec3 directionalVector = normalize(vec3(-1.0, -1.0, 0.0));

	highp float directional = clamp(dot(normalize(vertexNormal), directionalVector), 0.0, 1.0);
    lighting = ambientLight + (directionalLightColor * directional);

	vec4 coords = vec4(coordinates, 1.0);

	coords = perspective * view * model * coords;

	fogness = coords.z/maxDistance;

	gl_Position = coords;
}

`;
