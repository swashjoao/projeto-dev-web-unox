import { UserRepository } from "../repository/user-repository.js";

let proxId = 3;

class UserService{

    constructor(){
        this.userRepository = new UserRepository();
    }

    create(nome, email, role = "user"){
        const user = { id: proxId, nome, email, role };
        proxId++;
        this.userRepository.insert(user);
        return user;
    }

    login(email){
        return this.userRepository.getByEmail(email);
    }
};

export { UserService };