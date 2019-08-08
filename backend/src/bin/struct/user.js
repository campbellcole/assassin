/*

{
id: string
username: string,
password: bcrypt(string),
name: string,
email: string,
phone: string,
verified: bool
}

*/

import bcrypt from 'bcrypt';

class User {

  constructor(username, password, name, email, phone, verified) {
    this.username = username;
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
