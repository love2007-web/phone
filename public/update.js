function pickFile(e){
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    reader.addEventListener("load", (e)=>{
        console.log(e);
    })
    if (file) {
        reader.readAsDataURL(file);
    }
}
let avater = document.getElementById("avater");
// const user = firebase.auth().currentUser;
// console.log(user);
let thisUser;
firebase.auth().onAuthStateChanged((user) => {
if (user) {
  var uid = user.uid;
  thisUser = user
  console.log(user);
} else {
  window.location.href = "./signin.html"
}
});
function updateProfile(ev){
    ev.preventDefault();
    console.log(thisUser);
    let file = avater.files[0]
    let imgName = avater.files[0].name
    
    var uploadTask = storage.child(imgName).put(file);
        uploadTask.on('state_changed', 
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.log(error);
        }, 
        () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            thisUser.updateProfile({
            photoURL: downloadURL
            }).then(() => {
            console.log("Profile successfully updated");
            window.location.href = 'index.html'
            }).catch((error) => {
            console.log(error.message);
            });  
            });
            
        });

}
