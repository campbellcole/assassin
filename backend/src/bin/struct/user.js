/*

{
username: string,
perm: int
password: bcrypt(string),
name: string,
email: string,
phone: string,
verified: bool
}

*/

import bcrypt from 'bcrypt';

class User {

  constructor(username, perm, password, name, email, phone, verified) {
    this.username = username;
    this.perm = perm;
    this.password = password;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.verified = verified;
  }

  validPassword(password, then) {
    bcrypt.compare(password, this.password, (err, res) => then(err, res));
  }

}

export default User;
