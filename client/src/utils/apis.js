const apis = ()=>{
    const local = 'http://localhost:5050/'

    const list = {
        registerUser: `${local}user/register`,
        loginUser: `${local}user/login`,
        userProfile: `${local}user/getuser`,
        userLogout: `${local}user/logout`,
    };

    return list;
};

export default apis;