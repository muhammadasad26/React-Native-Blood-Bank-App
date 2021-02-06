import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import database from "@react-native-firebase/database";

class SignUpForm extends Component {
    constructor(props) {
        super();
        this.state = {
            fname: "",
            email: "",
            password: "",
            passwordAgain: ""
        }
    }
    sendData = () => {
        let user = {
            fname: this.state.fname,
            email: this.state.email,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain
        }
        if (this.state.fname !== "" && this.state.email !== "" && this.state.password !== "" && this.state.passwordAgain !== "") {
            if (this.state.password === this.state.passwordAgain) {
                database().ref('/').child('users').push(user).then(()=>{
                    alert("you have successfully signup.")
                })
                this.props.navigation.navigate("Home");
            }
            else {
                alert("Password does not match.");
            }
        }
        else {
            alert("Fill all the fields.");
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <View style={styles.titleBg}>
                            <Text style={styles.title}>Blood Bank App</Text>
                        </View>
                    </View>
                    <View style={styles.signupForm}>
                        <Text style={styles.formHeading}>Signup Account</Text>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput value={this.state.fname} onChangeText={(e) => this.setState({ fname: e })} style={styles.inputTitle} placeholder="Enter full Name" />
                        <Text style={styles.label}>Email</Text>
                        <TextInput value={this.state.email} onChangeText={(e) => this.setState({ email: e })} style={styles.inputTitle} placeholder="Enter email" />
                        <Text style={styles.label}>New Password</Text>
                        <TextInput secureTextEntry value={this.state.password} onChangeText={(e) => this.setState({ password: e })} style={styles.inputTitle} placeholder="Enter password" />
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput secureTextEntry value={this.state.passwordAgain} onChangeText={(e) => this.setState({ passwordAgain: e })} style={styles.inputTitle} placeholder="Enter password again" />
                        <TouchableOpacity onPress={() => this.sendData()} style={styles.btnSignup}>
                            <Text style={styles.btnSignupText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f2f2f2",
        flex: 1
    },
    title: {
        fontSize: 34,
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        fontWeight: "700"
    },
    titleBg: {
        backgroundColor: "red",
        justifyContent: "center",
        paddingVertical: 10
    },
    logo: {
        alignSelf: "center",
        width: 300,
        height: 120,
        margin: 5,
    },
    logoBg: {
        marginVertical: 5,
        paddingVertical: 15,
    },
    signupForm: {
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: "red",
        marginTop: 20,
        marginHorizontal: 10
    },
    formHeading: {
        fontSize: 28,
        textDecorationLine: "underline",
        color: "red",
        textAlign: "center",
        fontWeight: "700"
    },
    label: {
        color: 'red',
        paddingTop: 10,
        paddingLeft: 5,
        fontSize: 17
    },
    inputTitle: {
        marginTop: 5,
        paddingLeft: 5,
        borderWidth: 2,
        borderColor: "red",
        fontSize: 15,
        borderRadius: 8

    },
    btnSignup: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "red",
        borderRadius: 10
    },
    btnSignupText: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        padding: 10
    },
});

export default SignUpForm;