// let toSignUp = document.getElementById("toSignUp")
    // document.getElementById("toSignup").addEventListener("click", (event)=>{
    //     event.preventDefault()
    //     window.location.href = "signup.html"
    // })
    function toSignUp(ev){
        event.preventDefault()
        window.location.href = "signup.html"
    }
    let email = document.getElementById("email");
    let pass = document.getElementById("password");
    function signin(ev){
        ev.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            alert("User information correct")
            window.location.href = "./index.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }