export class User {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.passwordConfirmation = "";
  }

  clean(): void {
    this.name = "";
    this.email = "";
    this.password = "";
    this.passwordConfirmation = "";
  }

  clone(): User {
    var user: User = new User();
    user.copyFrom(this);

    return user;
  }

  copyFrom(user: User): void {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.passwordConfirmation = user.passwordConfirmation;
  }

}