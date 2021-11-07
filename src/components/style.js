import { StyleSheet } from "react-native";

// styling
const styles = StyleSheet.create({
    main_View:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    },
 mainContainer:{
     display:'flex',
     height:100,
     width:380,
    //  borderWidth: 4,
    //  borderColor: "#20232a",
     flexDirection:"row",
     backgroundColor: "rgb(23,45,62)",
   
 },
 text:{
     marginTop:15,
     paddingTop:5,
    height:70,
    width:50,
    // borderWidth: 4,
    // borderColor: "#20564a", 
 },

 firstBox:{
    marginTop:10,
    height:70,
    width:160,
    // borderWidth: 4,
    // borderColor: "#20224a", 
 },
 
 secondBox:{
    marginTop:10,
    height:70,
    width:160,
    // borderWidth: 4,
    // borderColor: "#20224a", 
 },

  
 Box:{
     display:"flex",
     flexDirection:"row",
     justifyContent:"center",
    marginTop:10,
    width:150,
    // borderWidth: 4,
    // borderColor: "#20224a", 
 }
})

export default styles;