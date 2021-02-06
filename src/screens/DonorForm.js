import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import database from '@react-native-firebase/database';

class DonorForm extends Component {
    constructor() {
        super();
        this.state = {
            dName: "",
            age: "",
            gender: '',
            bloodGroup: '',
            rhFactor: '',
            phoneNo: '',
            city: ''

        }
    }

    sendDonorData = () => {
        let donorData = {
            dName: this.state.dName,
            age: this.state.age,
            gender: this.state.gender,
            bloodGroup: this.state.bloodGroup,
            rhFactor: this.state.rhFactor,
            phoneNo: this.state.phoneNo,
            city: this.state.city
        }
        if (this.state.dName !== "" && this.state.age !== "" && this.state.gender !== "" && this.state.bloodGroup !== "" && this.state.rhFactor !== "" && this.state.phoneNo !== "" && this.state.city !== "") {
            database().ref('/').child('donorData').push(donorData).then(() => {
                alert("you have succesfully entered donor details.")
                this.props.navigation.navigate('DonorList')
            })
        }
        else {
            alert("fill all the fields.");
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
                        <Text style={styles.formHeading}>Blood Donation Form</Text>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput value={this.state.dName} onChangeText={(e) => this.setState({ dName: e })} style={styles.inputTitle} placeholder="Enter your full Name" />
                        <Text style={styles.label}>Age</Text>
                        <TextInput value={this.state.age} onChangeText={(e) => this.setState({ age: e })} style={styles.inputTitle} placeholder="Enter your age (must be 18 or >18)" />
                        <Text style={styles.label}>Gender</Text>
                        <TextInput value={this.state.gender} onChangeText={(e) => this.setState({ gender: e })} style={styles.inputTitle} placeholder="Enter your gender" />
                        <View style={styles.picker}>
                            <View style={{ marginRight: 5 }}>
                                <Text style={styles.label}>Blood Group</Text>
                                <View style={styles.pickerBlood}>
                                    <Picker
                                        selectedValue={this.state.bloodGroup}
                                        style={styles.pickerBloodGroup}
                                        onValueChange={(e) => this.setState({ bloodGroup: e })}
                                    >
                                        <Picker.Item label="" value="" />
                                        <Picker.Item label="A" value="A" />
                                        <Picker.Item label="B" value="B" />
                                        <Picker.Item label="AB" value="AB" />
                                        <Picker.Item label="O" value="O" />
                                    </Picker>
                                </View>
                            </View>
                            <View style={{ marginLeft: 5 }}>
                                <Text style={styles.label}>Rh Factor</Text>
                                <View style={styles.pickerSign}>
                                    <Picker
                                        selectedValue={this.state.rhFactor}
                                        style={styles.pickerBloodSign}
                                        onValueChange={(e) => this.setState({ rhFactor: e })}
                                    >
                                        <Picker.Item label="" value="" />
                                        <Picker.Item label="+" value="+" />
                                        <Picker.Item label="-" value="-" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.label}>Phone No.</Text>
                        <TextInput value={this.state.phoneNo} onChangeText={(e) => this.setState({ phoneNo: e })} style={styles.inputTitle} placeholder="Enter your phone no." />
                        <Text style={styles.label}>City</Text>
                        <TextInput value={this.state.city} onChangeText={(e) => this.setState({ city: e })} style={styles.inputTitle} placeholder="Enter your city" />
                        <TouchableOpacity onPress={() => this.sendDonorData()} style={styles.btnDonate}>
                            <Text style={styles.btnDonateText}>Add Donor</Text>
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
        fontSize: 15
    },
    inputTitle: {
        marginTop: 5,
        paddingLeft: 5,
        borderWidth: 2,
        borderColor: "red",
        fontSize: 15
    },
    btnDonate: {
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: "red",
        borderRadius: 10
    },
    btnDonateText: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        padding: 10
    },
    picker: {
        flexDirection: "row",
    },
    pickerBlood: {
        flex: 1,
        alignItems: "flex-start",
        borderColor: "red",
        borderWidth: 2,
        marginTop: 5,
    },
    pickerBloodGroup: {
        width: 150,
        height: 50,
    },
    pickerSign: {
        flex: 1,
        alignItems: "flex-start",
        borderColor: "red",
        borderWidth: 2,
        marginTop: 5
    },
    pickerBloodSign: {
        width: 150,
        height: 50,
    }
});

export default DonorForm;