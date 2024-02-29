import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap' 

//This is Our Scene
const scene = new THREE.Scene()

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// This is Our Camera
const camera =new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
)

// light 
const light = new THREE.PointLight(0xffffff, 1,100)
light.position.set(0,10,10)
scene.add(light)

// The Renderer
const renderer = new THREE.WebGL1Renderer({
  antialias: true
})

const mesh = renderer.domElement
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)
let canvas = document.querySelector('#app');
canvas.appendChild(mesh)

// controls 
const controls = new OrbitControls(camera,mesh)
controls.enableDamping= true

// create a sphere 
const geometry = new THREE.SphereGeometry(4,63, 63)
const material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('/images/globe2.jpg') })
const mash = new THREE.Mesh(geometry, material)

scene.add(mash)
camera.position.z = 15


function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()

// rezize 
window.addEventListener('resize',()=>{
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;
  // update camera
  camera.updateProjectionMatrix()
  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  mash.rotation.y += 0.002
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()
// 356316480653559/13
// 356316480725555/13

// Timeline Magic
const t1 = gsap.timeline({defaults: {duration: 1}})
t1.fromTo(mash.scale, {z: 0, x: 0, y: 0}, {z: 1, x: 1, y:1 })
t1.fromTo("img", {y: '-100%'}, {y: '0%'})
t1.fromTo('li', {opacity: 0}, {opacity: 1})