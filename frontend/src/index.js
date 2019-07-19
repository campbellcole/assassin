import RootContainer from "./js/components/RootContainer.jsx";

M.AutoInit();

var socket = io();

socket.on('log', (msg)=>console.log(msg));
