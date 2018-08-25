import React from 'react';
import { StyleSheet, Text, View, Linking, TextInput } from 'react-native';

import { Actions } from 'react-native-router-flux';
import Wizard from '../Components/Wizard';
import Input from '../Components/Input';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionList: this.props.questionList,
      title:this.props.title
    };

  }
  componentWillMount() {
       
    Actions.Wizard({ title: this.state.title })
}
  render() {
    return (
      <View style={styles.root}>
        <Wizard
          initialValues={{
            username: '',
            email: '',
            avatar: '',
          }}
        >
          {this.state.questionList.map(el => (
            <Wizard.Step key={el.name}>
              {({ onChangeValue, values }) => (
                <View style={styles.container}>
                <View style={{ padding:10}}>
                  <Text style={{fontSize:16,fontWeight:'100', color: '#555151'}}>{el.title}</Text>
                  </View>
                  {el.type == 'text' ?
                    <Input
                      onChangeValue={onChangeValue}
                      placeholder={el.placeholder}
                      value={values[el.name]}
                      name={el.name}
                    /> : null}
                  {el.type == 'link' ?
                    <Text style={{ color: 'blue' }}
                      onPress={() => Linking.openURL('http://google.com')}>
                      Google
                  </Text> : null}
                  {el.type == 'task' ?
                    <Text>Task</Text> : null}
                </View>
              )}
            </Wizard.Step>
          ))}
        </Wizard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor:'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});