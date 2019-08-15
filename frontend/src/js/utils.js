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

function sendPromoteUser(username, then) {
  sendRequest("admin/promote", username, then);
}

function sendDemoteUser(username, then) {
  sendRequest("admin/demote", username, then);
}

function sendRemoveUser(username, then) {
  sendRequest("admin/remove", username, then);
}

function userToString(user) {
  var s = "";
  if (!user.verified) s += "* ";
  if (1 === user.perm) s+= "+";
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
  sendDeverifyUser,
  sendPromoteUser,
  sendRemoveUser,
  sendDemoteUser
}
