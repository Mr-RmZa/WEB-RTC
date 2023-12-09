const socket = io("localhost:3000");

const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

socket.on("update-user-list", ({ users }) => {
  console.log(users);
  const activeUserContainer = document.getElementById("active-user-container");

  users.forEach((socketId) => {
    const userExist = document.getElementById(socketId);

    if (!userExist) {
      const userContainer = document.createElement("div");

      const username = document.createElement("p");

      userContainer.setAttribute("class", "active-user");
      userContainer.setAttribute("id", socketId);
      username.setAttribute("class", "username");
      username.innerHTML = `کاربر : ${socketId}`;

      userContainer.appendChild(username);

      activeUserContainer.appendChild(userContainer);
    }
  });
});

navigator.getUserMedia(
  { video: true, audio: true },
  (stream) => {
    const localVideo = document.getElementById("local-video");

    if (localVideo) {
      localVideo.srcObject = stream;
    }
  },
  (error) => {
    console.log(error.message);
  }
);
