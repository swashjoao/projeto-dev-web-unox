let userList = [
    { id: 1, nome: "Admin", email: "admin@sistema.com", role: "admin" },
    { id: 2, nome: "teste", email: "teste@email.com", role: "user" }
];

class UserRepository{

    insert(user){
        userList.push(user);
    }

    getByEmail(email){
        return userList.find(user => user.email === email);
    }
};

export { UserRepository };