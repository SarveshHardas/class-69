import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            domState:"normal",
            hasCameraPermissions:null,
            scanned:false,
            scannedData:"",
        }
    }


    getCameraPermission = async (domState)=>{
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState(
            {
                domState:domState,
                hasCameraPermissions:status==="granted",
                //status===granted is true when user has granted permission
                //status===granted is false when user has not granted permission
                scanned:false,
            }
        )
    }

    handleBarCodeScanned = async ({type,data}) =>{
        this.setState({
            domState:"normal",
            scanned:true,
            scannedData:data,
        })
    } 

    render(){
        const {domState,scanned,hasCameraPermissions,scannedData}=this.state;
        if(domState==="scanner")
        {
            return(
                <BarCodeScanner 
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }

        return(
            <View style={styles.container}>
                <Text style={styles.text}>
                    {
                        hasCameraPermissions ? scannedData : "request for Camera Permissions"
                    }
                </Text>
                <TouchableOpacity onPress={()=>{
                    this.getCameraPermission("scanner")
                }}
                style={styles.buttonStyle}
                >
                    <Text style={styles.bText}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"blue"
    },
    text:{
        color:'white',
        fontSize:15,
    },
    buttonStyle:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
        borderRadius:15,
        width:"43%",
        height:55
    },
    bText:{
        color:'black',
        fontSize:24,
    },
})