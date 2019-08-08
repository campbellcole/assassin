function getJSON(command, args, then) {
  sendRequest(command, args, (req) => {
    then(JSON.parse(req.responseText));
  });
}

function sendRequest(command, args, then) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (4 === req.readyState && 200 === req.status) {
      then(req);
    }
  };
  req.open("GET", window.location.href + command + "/" + args, true);
  req.send();
}

function sendVerifyUser(username, then) {
  sendRequest("admin/verify", username, then);
}

function userToString(user) {
  var s = "";
  s += user.username;
  s += " (" + user.name +") ";
  if (!user.verified) s += "*";
  return s;
}

function userFromUsername(username, then) {
  getJSON("admin/user", username, then);
}

function logout() {
  sendRequest("login/logout", "", () => { window.location = window.location });
}

export {
  getJSON,
  sendRequest,
  userToString,
  userFromUsername,
  logout,
  sendVerifyUser
}
