const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName, nickName;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}
  
  function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
      addMessage(`You : ${value}`);
    });
    input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room : ${roomName}`;
  span = room.querySelector("span");
  span.innerText = `My nickname : ${nickName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();

  const inputRoomname = form.querySelector("#roomname");
  const inputNickname = form.querySelector("#nickname");

  roomName = inputRoomname.value;
  nickName = inputNickname.value;

  //socket.emit("enter_room", inputRoomname.value, inputNickname.value, showRoom);
  socket.emit("enter_room", roomName, nickName, showRoom);
  inputRoomname.value = "";
  inputNickname.value = ""
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
    addMessage(`${user} joined!`);
});
  
socket.on("bye", (left) => {
    addMessage(`${left} left ㅠㅠ`);
});
  
socket.on("new_message", addMessage);