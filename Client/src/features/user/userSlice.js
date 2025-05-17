import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{activeUser:null},
    reducers:{
        setActiveUser:(state,action)=>{
            state.activeUser=action.payload
        },
        setUserLogout:(state)=>{
            state.activeUser=null
        }
    }
})

export const{setActiveUser,setUserLogout}=userSlice.actions
export default userSlice.reducer