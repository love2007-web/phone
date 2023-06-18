let camera = document.getElementById('camera');
let display = document.getElementById('screen');
let canvas = document.getElementById('canvas')
camera.style.display = 'none'
let theCam;

function home() {
    camera.style.display = 'none';
    display.style.display = 'block'
}
let video = document.getElementById('video');

async function openCamera() {
  try {
    theCam = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    video.srcObject = theCam;
    display.style.display = 'none';
    camera.style.display = 'block';
  } catch (error) {
    console.error('Failed to access camera:', error);
    // Handle the error gracefully, e.g., display an error message to the user
  }
}

function releaseCamera() {
  if (theCam) {
    theCam.getTracks().forEach(track => track.stop());
    theCam = null;
  }
}

let shutterButton = document.getElementById('shutter');
shutterButton.addEventListener('click', () => {
  if (!theCam) {
    console.error('Camera stream not available');
    return;
  }
  
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  let imageLink = canvas.toDataURL('image/jpg');
  console.log(imageLink);

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Remove the previous image if it exists
  let previousImage = document.getElementById('captured-image');
  if (previousImage) {
    previousImage.remove();
  }

  // Create a new <img> element to display the captured image
  let capturedImage = document.createElement('img');
  capturedImage.id = 'captured-image';
  capturedImage.src = imageLink;
  document.body.appendChild(capturedImage);
});

// Example usage: Release the camera stream when closing the camera view
let closeButton = document.getElementById('close');
closeButton.addEventListener('click', () => {
  releaseCamera();
  display.style.display = 'block';
  camera.style.display = 'none';
});
