// Get the corridor element
const corridor = document.getElementById('corridor');

// Create the Three.js scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({
    canvas: document.createElement('canvas'),
    antialias: true
});
corridor.appendChild(renderer.domElement);

camera.position.z = 50; // Move the camera back a bit

// Set up the camera controls
let cameraPosition = 0;
window.addEventListener('scroll', () => {
    cameraPosition += window.scrollY * 0.01;
    camera.position.z = cameraPosition;
});

// Create the corridor geometry
const corridorGeometry = new THREE.BoxGeometry(10, 10, 100);
const corridorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
const corridorMesh = new THREE.Mesh(corridorGeometry, corridorMaterial);
scene.add(corridorMesh);

console.log('Corridor material:', corridorMesh.material);

// Add some walls to the corridor
const wallGeometry = new THREE.BoxGeometry(10, 10, 1);
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
for (let i = 0; i < 10; i++) {
    const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    wallMesh.position.z = i * 10;
    scene.add(wallMesh);

    console.log('Wall material:', wallMesh.material);
}

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);

console.log('Ambient light added:', ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(-10, 20, 10);
scene.add(pointLight);

console.log('Point light added:', pointLight);

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Set the renderer size to match the window size
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);
onWindowResize();