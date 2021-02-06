import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import database from "@react-native-firebase/database";

class DonorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      donorlist: [],
      inputBloodGroup: '',
      searchData: []
    }
  }
  goto_donorform = () => {
    this.props.navigation.navigate('DonorForm')
  }

  componentDidMount() {
    database().ref('/').child(`donorData`).on("child_added", (data) => {
      let alldata = data.val()
      this.setState({ donorlist: [alldata, ...this.state.donorlist] })
    })
  }

  searchBlood = () => {
    database().ref('/').child(`donorData`).on("child_added", (data) => {
      let searchBloodGroup = data.val()
      if (searchBloodGroup.bloodGroup === this.state.inputBloodGroup) {

        this.setState({
          searchData: [searchBloodGroup, ...this.state.searchData]
        })
      }
    })
    this.setState({
      searchData: []
    })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleBg}>
          <Text style={styles.title}>Blood Bank App</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.goto_donorform()} style={styles.btnDonate}>
            <Text style={styles.btnDonateText}>Donate Blood</Text>
          </TouchableOpacity>
          <TextInput
            onChange={() => this.searchBlood()}
            value={this.state.inputBloodGroup}
            onChangeText={(e) => this.setState({ inputBloodGroup: e })}
            style={styles.inputSearch}
            placeholder="Search by blood group" />
        </View>
        <View style={styles.list}>
          {(this.state.inputBloodGroup === '') ?
            this.state.donorlist.map((v, i) => (
              <View key={i} style={styles.card}>
                <View style={styles.bloodGroup}>
                  <Text style={styles.bloodGroupText}>{v.bloodGroup + v.rhFactor}</Text>
                </View>
                <View style={styles.donorInfo}>
                  <Text style={styles.donorName}>{v.dName}</Text>
                  <Text style={styles.donorDetail}>Age: {v.age}</Text>
                  <Text style={styles.donorDetail}>Gender: {v.gender}</Text>
                  <Text style={styles.donorDetail}>Phone No: {v.phoneNo}</Text>
                  <Text style={styles.donorDetail}>City: {v.city}</Text>
                </View>
              </View>
            ))
            :
            this.state.searchData.map((v, i) => (
              <View key={i} style={styles.card}>
                <View style={styles.bloodGroup}>
                  <Text style={styles.bloodGroupText}>{v.bloodGroup + v.rhFactor}</Text>
                </View>
                <View style={styles.donorInfo}>
                  <Text style={styles.donorName}>{v.dName}</Text>
                  <Text style={styles.donorDetail}>Age: {v.age}</Text>
                  <Text style={styles.donorDetail}>Gender: {v.gender}</Text>
                  <Text style={styles.donorDetail}>Phone No: {v.phoneNo}</Text>
                  <Text style={styles.donorDetail}>City: {v.city}</Text>
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
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
  },
  btnDonate: {
    backgroundColor: "#4d4d4d",
    margin: 5,
    borderWidth: 3,
    borderColor: "#404040",
    padding: 5,
    borderRadius: 8
  },
  btnDonateText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  inputSearch: {
    borderWidth: 2,
    margin: 5,
    paddingHorizontal: 10,
    fontSize: 18
  },
  card: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 8,
    margin: 5,
    flexDirection: "row"
  },
  bloodGroup: {
    flex: 2,
    backgroundColor: "red",
    borderRadius: 6,
    justifyContent: "center"
  },
  bloodGroupText: {
    color: "white",
    fontSize: 45,
    textAlign: "center"
  },
  donorInfo: {
    flex: 4,
    padding: 5,
    backgroundColor: "#ffebe6",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  donorName: {
    fontSize: 24,
    color: "red"
  },
  donorDetail: {
    color: "#404040",
    fontSize: 16
  }
});

const mapStateToProps = (state) => ({
})

const mapDispatchToProp = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProp)(DonorList);