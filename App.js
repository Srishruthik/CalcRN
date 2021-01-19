import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity,TextInput,Alert, Dimensions,ScrollView } from 'react-native';
let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;
TouchableOpacity.defaultProps = { activeOpacity: 0.7 };
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            equation: "",
            result: "",
            isDone:false,//determines if = is pressed and showed output
            isClickedNum:false,//Can only press the ops ones
          
        }
    }
    calculateTotal = () => {
 
     /* 
      symbols: ÷

      This function calculates



     
     */
     try{
        let calc = eval(this.state.equation)
        this.setState({
            result:calc,
            equation:"",
            isDone:true
        })
     }catch(error){
       Alert.alert(error.message)
     }
        
    }
    
onButtonPressed = (val,operations) => {

        /* 
        
        handles the when a button is called


        
        */
   
   if(this.state.isDone){
       this.setState({
        isDone:false,
        result:"",
     

       })
    
}



   if(val === "C"){

      this.setState({
           result:"",
           equation:""
       })
   }else{

   if(operations === "÷"){
     
       if(operations === "="){
            this.calculateTotal()
        }else{
        this.setState({
            equation: this.state.result+this.state.equation+("/"),
        disabled:false
        })}
   }else if(operations === "x"){
        if(operations === "="){
            this.calculateTotal()
        }else{
        this.setState({
            equation: this.state.result+this.state.equation+("*"),
        disabled:false
        })}
   }
   else{
        if(operations === "="){
            this.calculateTotal()
        }else{
        this.setState({
            equation: this.state.result+this.state.equation+(val)+(operations === undefined ?"":operations),
            disabled:false
        })

}


}
}
}
deleteNum = () => {
  //  console.log("Am i working")
  
 
    this.setState({
        equation:  this.state.equation.substring(0, this.state.equation.length - 1)
    })
}





    render() {
        let operations = ["÷", "x", "-", "+","="]

        let nums = [
         
            ["7", "8", "9"],
            ["4", "5", "6"],
            ["1", "2", "3"],
            ["0", ".","C" ],
        ]
        let rows = []
        for (let i = 0; i < 4; i++) {//col
            let row = []
            for (let j = 0; j < 3; j++) {//row
                row.push(
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity style={styles.buttonCalcNumStyle}
                        onPress={() => this.onButtonPressed(nums[i][j])}
                      
                        >
                            <Text style={{textAlign:'center',fontSize:40,color:'white'}}>{nums[i][j]}</Text>
                        </TouchableOpacity>
                    </View>

                )
            }
            rows.push(<View style={styles.numbersRow}>{row}</View>)
        }



        return (
            <SafeAreaView style={styles.container}>
              <GestureRecognizer style={{flex:1.5}} onSwipeRight={this.deleteNum}>
                    <ScrollView contentContainerStyle={styles.equationContainer}>
                        <Text adjustsFontSizeToFit={true}  numberOfLines={1}  keyboardType="decimal-pad" style={{color:'white',fontSize:0.2*deviceWidth,textAlign:"right"}}>{this.state.equation}{this.state.result}</Text> 
                    </ScrollView>
                </GestureRecognizer>
         
                <View style={styles.mainContainer}>

                    <View style={styles.buttonContainer}>
                        <View>{rows}</View>
                    </View>

                    <View style={styles.operationContainer}>

                        {operations.map((operations, index) => {
                            return (
                                <View style={styles.eachOperationStyle}>
                                    <TouchableOpacity   disabled={this.state.isClickedNum} onPress={() => this.onButtonPressed("",operations)} style={styles.btnBox}>
                                        <Text style={styles.operationTxt}>
                                            {operations}
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            )
                        })}
                    </View>
                </View>
            </SafeAreaView>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'

    },
    extra: {
        flex: 0.5,
        backgroundColor: 'black'
    },
    equationContainer: {
        flex: 1.4,
        backgroundColor: 'black',
        justifyContent: "flex-end"
    },
    mainContainer: {
        flex: 4,
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 3,
        backgroundColor: 'white',
        flexDirection: "row"
    },
    operationContainer: {
        flex: 1,
        // backgroundColor:'orange',
        justifyContent: 'center'
    },
    eachOperationStyle: {
        flex: 1,

        justifyContent: 'center',

    },
    btnBox: {
        height: '70%',
        width: '80%',
        backgroundColor: 'rgb(226,150,10)',
        alignSelf: 'center',
        borderRadius: 300,
        justifyContent: 'center',

    },
    operationTxt: {
        textAlign: 'center',
        fontSize: 40,
        color: 'white'
    },
    buttonStyle: {
       backgroundColor: 'black',
        justifyContent: "center",

        height:deviceHeight/6,
        width: deviceWidth / 4,
       
    },
    numbersRow: {
        flexDirection: "row",
        //flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
     
    },
    buttonCalcNumStyle: {
        alignSelf:'center',
        height: '57%',
        width: '82%',
        backgroundColor:'rgb(44,44,44)',
        borderRadius:300,
        justifyContent:'center',
    }
});