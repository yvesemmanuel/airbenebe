import { v4 } from 'uuid';

import User from '../models/User';

type CreateUserType = {
    name: string,
    email: string,
    password: string,
}

class UserRepository {
    private users: User[] = [];
    private static instance: UserRepository;

    public create({
        name,
        email,
        password,
    }: CreateUserType): User {
        const user = new User();

        user.id = v4();
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public findByEmail(email: string): User | undefined {
        const foundUser = this.users.find(user => user.email == email);

        return foundUser;
    }

    public findById(id: string): User | undefined {
        const foundUser = this.users.find(user => user.id == id);

        return foundUser;
    }

    public delete(id: string): void {
        const filtered = this.users.filter(user => user.id !== id);
        this.users = filtered;
    };

    public update(id: string, password: string): User | undefined {
        const foundUser = this.users.find(user => user.id == id);

        if (foundUser) {
            foundUser.password = password

            return foundUser;
        }

        return undefined;
    }

    public login(email: string, password: string): boolean {
        const user = this.findByEmail(email);

        if (user && user.password == password) {
            return true
        };

        return false;
    }

    public findAll(): User[] {
        return this.users;
    }

    public getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }
}

export default UserRepository