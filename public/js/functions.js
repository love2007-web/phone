let email = document.getElementById('email')
let username = document.getElementById('username')
let password = document.getElementById('password')

function signUp(ev) {
    ev.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    user.updateProfile({
        displayName: username.value,
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(() => {
       alert('Signup Successful');
       window.location.href = "./signin.html"
      }).catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}
export {signUp}