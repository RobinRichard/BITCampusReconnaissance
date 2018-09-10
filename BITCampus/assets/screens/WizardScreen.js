import React from 'react';
import { StyleSheet, Text, Switch, View, Linking, ActivityIndicator, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Wizard from '../Components/Wizard';
import Input from '../Components/Input';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      switchValue: true,
      answers:null
    };
  }
  componentWillMount() {
    Actions.Wizard({ title: this.props.title })

    AsyncStorage.getItem('user', (err, result) => {
      var user = JSON.parse(result)
      this.setState({
        userId: user[0]['id']
      }, function () {
        return fetch('http://10.0.2.2:8000/ajax/apiCategory?id=' + this.state.userId)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              questionData: responseJson['qusetion'].filter(data => data.section == this.props.section_id),
              answerData: responseJson['answers'],
            }, function () {
              var answerdata = this.state.answerData;
              var answerJson={}
              this.state.questionData.map(function (item) {
                var key = item.id
                answerJson[key] = answerdata.filter(data => data.question == item.id)[0]['answer_text'].toString()
              })
              this.setState({
                isLoading: false,
                answers:answerJson
              });
            });
          })
          .catch((error) => {
            alert(error)
          });
      });
    });
  }

  switchToggle(id){
     if (this.state.isLoading) {
    var json = this.state.answers.filter(data => data.id == id)[0]['answer_text'].toString

    // this.state.answers[id] = !this.state.answers[id]
    alert(json)
    return true
     }
   }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    else {
      return (
        <View style={styles.root}>
          <Wizard
            initialValues={this.state.answers}>
            {this.state.questionData.map(item => (
              <Wizard.Step key={item.id}>
                {({ onChangeValue, values }) => (
                  <View style={styles.container}>
                    <View style={{ padding: 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: '100', color: '#555151' }}>{item.question_text}</Text>
                    </View>
                    {item.question_type == '1' ? 
                      <Input onChangeValue={onChangeValue} placeholder={item.placeholder} name={item.id} value={values[item.id]} /> : null}
                    {item.question_type == '2' ? 
                      <View>
                        <Input  onChangeValue={onChangeValue} placeholder={item.placeholder} name={item.id} value={values[item.id]}/>
                        <Switch onChangeValue={onChangeValue}  name={item.id} value = {values[item.id].toString()=='true'?true:false} />
                      </View> : null}
                    {item.question_type == '3' ? 
                     <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('http://google.com')}>Google</Text> : null}
                  </View>)
                }
              </Wizard.Step>
            ))}
          </Wizard>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});