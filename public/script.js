const socket = io();

const sendBtn = document.querySelector(".sendArea button");
const input = document.querySelector(".sendArea input");
const loginBtn = document.querySelector(".login button");
const userName = document.querySelector(".login input");
const chat = document.querySelector(".container");
const login = document.querySelector(".login");
const mssArea = document.querySelector(".mssArea");

chat.style.display = "none";

sendBtn.addEventListener("click", () => {
  if (!input.value.trim()) return;
  console.log(input.value);
  socket.emit("send-mss", input.value);
  input.value = "";
});

loginBtn.addEventListener("click", () => {
  if (!userName.value.trim()) return;
  socket.emit("newUser", userName.value);
  login.style.display = "none";
  chat.style.display = "flex";
});

socket.on("join-user",({users,totalUsers})=>{
    document.querySelector(".userCount").innerText = `Active Users : ${totalUsers}`
    console.log(users)
    document.querySelector(".users").innerHTML = ""
    users.forEach((e)=>{
        const span = document.createElement("span")
        span.innerText = e
        document.querySelector(".users").appendChild(span)
    })
    
})

socket.on("left-user",({users,totalUsers})=>{
    document.querySelector(".userCount").innerText = `Active Users : ${totalUsers}`
    console.log(users)
    document.querySelector(".users").innerHTML = ""
    users.forEach((e)=>{
        const span = document.createElement("span")
        span.innerText = e
        document.querySelector(".users").appendChild(span)
    })
    
})

socket.on("recive-mss", ({ message, userId, userName }) => {
  console.log(`${userName} send ${message}`);
  const mss = document.createElement("div");
  if (userId == socket.id) {
    mss.classList.add("self");
    mss.innerText = message;
  } else {
    mss.classList.add("other");
    // Build with textContent so names/messages can't inject HTML (XSS)
    const name = document.createElement("b");
    name.textContent = userName;
    const text = document.createElement("span");
    text.textContent = message;
    mss.append(name, " : ", text);
  }
  console.log(mss);

  mssArea.appendChild(mss);
});

socket.on("notify", (message) => {
  console.log(message);
});
