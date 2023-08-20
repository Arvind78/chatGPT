import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     user:null,
     sucess:false,
  }

  const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
       signupSccuess :(state,action)=>{
        state.user = action.payload
        state.sucess=true
       },
       loginSccuess :(state,action)=>{
        state.user = action.payload
        state.sucess=true
       },
       logout :(state)=>{
        state.user = null
        state.sucess=false
       },
       updateSccuess :(state,action)=>{
        state.user = action.payload
        state.sucess=true
       }

    }
  })

  export const {signupSccuess,loginSccuess,updateSccuess,logout} =userSlice.actions;

  export default userSlice.reducer;