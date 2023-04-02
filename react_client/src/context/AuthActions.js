export const LofinStart = (userCred) =>({
    type:"LOGIN_START",
});

export const LoginSucess = (user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
});

export const LoginFaliure = (error) =>({
    type:"LOGIN_FALIURE",
    payload:error
})



export const Follow = (userId)=>({
    type:"FOLLOW",
    payload:userId 
})

export const Unfollow = (userId)=>({
    type:"UNFOLLOW",
    payload:userId
})