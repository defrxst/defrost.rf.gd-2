import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { InteractionManager } from 'three.interactive'

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.position.setZ(40)
    
    scene.add(camera)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.maxDistance = 100

    const interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    let object = new THREE.Object3D
    let objectToRender = 'defrost'

    const loader = new GLTFLoader()

    loader.load(
        `/models/${objectToRender}/defrost.gltf`,
        function (gltf) {
            object = gltf.scene
            scene.add(object)
        },
        function (xhr)  {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded')
        },
        function (error) {
            console.log(error)
        }
    )
    
    const torus = new THREE.Mesh(
        new THREE.TorusGeometry(10, 2, 5, 20),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
    )    
    const torus2 = new THREE.Mesh(
        new THREE.TorusGeometry(17, 2, 5, 30),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
    )
    const torus3 = new THREE.Mesh(
        new THREE.TorusGeometry(25, 2, 5, 20),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
    )
    const torus4 = new THREE.Mesh(
        new THREE.TorusGeometry(32, 2, 5, 25),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
    )

    const dodecahedron = new THREE.Mesh(
        new THREE.DodecahedronGeometry(4),
        new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
    )

    dodecahedron.material.transparent = true
    interactionManager.add(dodecahedron);

    dodecahedron.addEventListener('mouseover', (event) => {
        event.target.material.opacity = 0.4
        document.body.style.cursor = "pointer"
    })
    dodecahedron.addEventListener('mouseleave', (event) => {
        event.target.material.opacity = 1
        document.body.style.cursor = ""
    })
    dodecahedron.addEventListener('click', (event) => {
        window.location.href = "https://e-z.bio/frost"
    })

    torus.material.transparent = true
    torus2.material.transparent = true
    torus3.material.transparent = true
    torus4.material.transparent = true
    torus.material.opacity = 0.05
    torus2.material.opacity = 0.2
    torus3.material.opacity = 0.1
    torus4.material.opacity = 0.05

    let stars = []
    stars.length = 500

    function addParticles() {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(3, 3, 1),
            new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
        )
        const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000))

        particle.position.set(x,y,z)

        particle.rotation.x = 0;
        particle.rotation.y = 0;
        particle.rotation.z = 0;

        scene.add(particle)
        stars.push(particle)
    }
    stars.fill().forEach(addParticles)

    const ambientLight = new THREE.AmbientLight(0xffffff, 5)   

    scene.add(torus, torus2, torus3, torus4, dodecahedron, ambientLight)

    window.addEventListener("resize", function() {
        camera.aspect = this.window.innerWidth / this.window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    })

    window.addEventListener("wheel", function(e) {
        console.log("scrolled")
        torus.rotation.x += 0.1;
        torus.rotation.y += 0.1;
        
        torus2.rotation.x -= 0.1;
        torus2.rotation.y -= 0.1;

        torus3.rotation.x -= 0.1;
        torus3.rotation.y -= 0.1;
        
        torus4.rotation.x += 0.1;
        torus4.rotation.y += 0.1;
         
      }, true);

    function animate() {
        torus.rotation.x += 0.001;
        torus.rotation.y += 0.001;
        torus.rotation.z += 0.005;   

        torus2.rotation.x -= 0.01;
        torus2.rotation.y -= 0.01;
        torus2.rotation.z -= 0.005;   

        torus3.rotation.x += 0.01;
        torus3.rotation.y += 0.008;
        torus3.rotation.z += 0.005;   

        torus4.rotation.x -= 0.01;
        torus4.rotation.y += 0.01;
        torus4.rotation.z -= 0.005;   

        dodecahedron.rotation.x += 0.008;
        dodecahedron.rotation.y += 0.01;
        dodecahedron.rotation.z += 0.001;

        object.rotation.x += 0.01;
        object.rotation.y += 0.01;
        object.rotation.z += 0.001;
        
        interactionManager.update();

        renderer.render(scene, camera)

        requestAnimationFrame(animate)
    }
    animate()

