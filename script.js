let camera = document.getElementById('camera');
let display = document.getElementById('screen');
let canvas = document.getElementById('canvas')
camera.style.display = 'none'

function home() {
    camera.style.display = 'none';
    display.style.display = 'block'
}
let video = document.getElementById('video');
async function openCamera() {
        let theCam = await navigator.mediaDevices.getUserMedia({audio:false, video:true})
        video.srcObject = theCam
        display.style.display = 'none'
        camera.style.display = 'block'
    };

    let shutterButton = document.getElementById('shutter')
    shutterButton.addEventListener("click", (()=>{
        canvas.getContext("2d").drawImage(video, 0,0, canvas.width, canvas.height);
        let imageLink = canvas.toDataURL('image/jpg');
        console.log(imageLink);
      
      }))