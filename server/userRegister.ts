import { User } from "../airbenebe/src/app/interfaces/User";

export class UserRegister {
  users: User[] = [];

  create(user: User): User {
    var result = null;
    if (this.notRegisteredEmail(user.email)) {
      if (this.correctPassword(user)) {
        result = new User();
        result.copyFrom(user);
        this.users.push(result);
      }
    }
    
    return result;
  }

  updateUser(user: User): User {
    var result: User = this.users.find(u => u.email == user.email);

    if (result) result.copyFrom(user);
    return result;
  }

  correctPassword(user: User) {
    return user.password === user.passwordConfirmation;
  }

  notRegisteredEmail(email: string): boolean {
    return !this.users.find(user => user.email == email);
  }

  invalidEmail(user: User) {

    var validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return !user.email.match(validEmail);
  }

  getUsers(): User[] {
    return this.users;
  }
}