let username = document.getElementById("user")
let currUser;
let avater;
const usered = firebase.auth().currentUser;
console.log(usered);
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    username.innerHTML = user.displayName
    currUser = user.displayName;
    avater = user.photoURL;
    console.log(user);
  } else {
    window.location.href = "./signin.html"
  }
});
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.href = "login.html"
  }).catch((error) => {
    // An error happened.
  });
}

let inpVal = document.getElementById("chatVal");

async function sendChat() {
  console.log(currUser);
  await db.collection("chats").doc().set({
    name: currUser,
    content: inpVal.value,
    time: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  inpVal.value = ""
}
async function fetchChat() {
  await db.collection("chats").orderBy("time", "asc")
    .onSnapshot((doc) => {
      document.getElementById("screen").innerHTML = ""
      doc.forEach(el => {
        console.log(el.id);
        console.log(el.data()); // Add this line
        let avater = ""; // Add this line
        db.collection("users").doc(el.data().name)
          .get()
          .then(doc => {
            avater = doc.data().avater;
            console.log(avater); // Add this line
          })
          .catch(error => console.log(error));

        if (el.data().name == currUser) {
          document.getElementById("screen").innerHTML += `
            <div onmousedown="startTimer()" onmouseup="stopTimer()" style="margin-left:auto; position: relative;" id="mssg${el.id}" class='screen'>
              <img src="${el.data().photoURL}" style="border-radius: 20px; position: absolute; top: -4px; left: -4px;" width="16" height="16" />
              <small>${el.data().content}
                <small>${el.data().time.toDate().getHours()}:</small>
                <small>${el.data().time.toDate().getMinutes()}</small>
              </small>
              <br />
              <div id="modal" class="modalyes">
                    <div class="modal-contentyes">
                        <button onclick="del('${el.id}')">
                            <span class="material-symbols-outlined">
                            delete
                            </span>
                        </button>
                        <p>Delete</p>
                    </div>
	            </div>
            </div>
          `
        } else {
          document.getElementById("screen").innerHTML += `
            <div style="position: relative;" class='bg-danger rounded m-1 screen'>
              <img src="${el.data().photoURL}" style="border-radius: 20px; position: absolute; top: -4px; right: -4px;" width="16" height="16" />
              <small >${el.data().content}
                <small>${el.data().time.toDate().getHours()}:</small>
                <small>${el.data().time.toDate().getMinutes()}</small>
              </small><br />
            </div>
          `
        }
      })
    });
}

fetchChat()
var holdTimer;

function startTimer() {
  holdTimer = setTimeout(function () {
    document.getElementById('modal').style.display = 'block'
    console.log("User has held down on element");
  }, 1000); // Change this value to adjust the hold duration
}

function stopTimer() {
  clearTimeout(holdTimer);
}


function del(id) {
  let divContainer = document.getElementById(`mssg${id}`)
  divContainer.innerHTML = "This message was deleted"
  console.log(divContainer);
  try {
    db.collection("chats").doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  } catch (error) {
    console.log(error);
  }
}
// creates a random color for the usernames
function getRandomColor() {
var r = Math.floor(Math.random() * 256).toString(16);
var g = Math.floor(Math.random() * 256).toString(16);
var b = Math.floor(Math.random() * 256).toString(16);
return "#" + r + g + b;
}
