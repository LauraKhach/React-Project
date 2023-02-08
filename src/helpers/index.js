export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    const parsedUsers = JSON.parse(user || null);
    
    return parsedUsers;
}

export const getUsers = () => {
    const users = localStorage.getItem("users");
    const parsedUsers = JSON.parse(users || null);

    return (parsedUsers || []);
}

export const getUserById = (id) => {
    const users = getUsers();
    const user = users.find((user) => user?.id === id); 

    return user;
}