import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import database from "@react-native-firebase/database";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    goto_signup = () => {
        this.props.navigation.navigate('SignUpForm')
    }

    log_in = () => {
        database().ref('/').child('users').on('child_added', (data) => {
            let loginUser = {};
            loginUser = data.val();
            if (loginUser.email === this.state.email) {
                if (loginUser.password === this.state.password) {
                    this.props.navigation.navigate('DonorList');
                    this.setState({
                        email: '',
                        password: ''
                    })
                }
            }
        })
        if (this.state.email === '') {
            alert('Enter Your Email')
        }
        if (this.state.password === '') {
            alert('Enter Your Password')
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
                        <View style={styles.logoBg}>
                            <Image style={styles.logo} source={require('../../assets/blood-bank-logo.png')} />
                        </View>
                    </View>
                    <View style={styles.loginForm}>
                        <Text style={styles.formHeading}>LOGIN</Text>
                        <TextInput value={this.state.email} onChangeText={(e) => this.setState({ email: e })} style={styles.inputTitle} placeholder="Enter email" />
                        <TextInput value={this.state.password} onChangeText={(e) => this.setState({ password: e })} secureTextEntry style={styles.inputTitle} placeholder="Enter password" />
                        <TouchableOpacity onPress={() => this.log_in()} style={styles.btnLogin}>
                            <Text style={styles.btnLoginText}>Login</Text>
                        </TouchableOpacity>
                        <Text onPress={() => this.goto_signup()} style={styles.newUserText}>Register New User</Text>
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
        justifyContent: "center"
    },
    logo: {
        alignSelf: "center",
        width: 300,
        height: 120,
        margin: 5,
    },
    logoBg: {
        marginVertical: 10,
        paddingVertical: 20
    },
    loginForm: {
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: "red",
        marginTop: 10,
        marginHorizontal: 10
    },
    formHeading: {
        fontSize: 24,
        textDecorationLine: "underline",
        color: "red",
        textAlign: "center",
        fontWeight: "700"
    },
    inputTitle: {
        marginTop: 20,
        paddingHorizontal: 24,
        borderWidth: 2,
        borderColor: "red",
        fontSize: 18
    },
    btnLogin: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "red",
        borderRadius: 10
    },
    btnLoginText: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        padding: 10
    },
    newUserText: {
        color: "blue",
        textAlign: "center",
        fontSize: 20,
        textDecorationLine: "underline"
    },
});

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);