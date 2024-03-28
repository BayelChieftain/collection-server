export class UserDto {
    email;
    id;
    username;

    constructor({ email, _id, username }) {
        this.email = email;
        this.id = _id;
        this.username = username;
    }
}
