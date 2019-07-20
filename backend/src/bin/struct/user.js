/*

{
username: string,
pass: sha256(string),
name: string,
email: string,
phone: string,
verified: bool
}

*/

class User {

  constructor(username, pass, name, email, phone, verified) {
    this.username = username;
    this.pass = pass;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.verified = verified;
  }

}

export default User;
