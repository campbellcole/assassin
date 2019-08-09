function getJSON(command, args, then) {
  sendRequest(command, args, (req) => {
    then(JSON.parse(req.responseText));
  });
}

function sendRequest(command, args, then) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = () => {
    if (4 === req.readyState) {
      if (200 === req.status) then(req);
      else then(req.status);
    }
  };
  req.open("GET", window.location.href + command + "/" + args, true);
  req.send();
}

function sendVerifyUser(username, then) {
  sendRequest("admin/verify", username, then);
}

function sendDeverifyUser(username, then) {
  sendRequest("admin/deverify", username, then);
}

function userToString(user) {
  var s = "";
  if (!user.verified) s += "* ";
  s += user.username;
  s += " (" + user.name +") ";
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
  sendVerifyUser,
  sendDeverifyUser
}
