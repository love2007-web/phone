import { firebaseConfig } from "./setup.js";
import { signUp } from "./functions.js";
const app = firebase.initializeApp(firebaseConfig);
document.getElementById("dan").addEventListener("click", ()=>{
    console.log(app);
})
document.getElementById('signup').addEventListener("click", signUp);
document.getElementById('toSignIn').addEventListener("click", ())