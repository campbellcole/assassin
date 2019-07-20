/*

{
username: string,
password: sha256(string),
name: string,
email: string,
phone: string,
verified: bool
}

*/

class User {

  constructor(username, password, name, email, phone, verified) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.verified = verified;
  }

}

export default User;
