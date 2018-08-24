import React from 'react';
import { StyleSheet, Text, View, Linking, TextInput } from 'react-native';
import Wizard from '../Components/Wizard';
import Input from '../Components/Input';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionList: this.props.questionList
    };

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
                  <Text>{el.title}</Text>
                   
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});