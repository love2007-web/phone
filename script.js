let camera = document.getElementById('camera');
let display = document.getElementById('screen');
camera.style.display = 'none'
let video = document.getElementById('video');
async function openCamera() {
        let theCam = await navigator.mediaDevices.getUserMedia({audio:false, video:true})
        video.srcObject = theCam
        display.style.display = 'none'
        camera.style.display = 'block'
    };

    
    
    