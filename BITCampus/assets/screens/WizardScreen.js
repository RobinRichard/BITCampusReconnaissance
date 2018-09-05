import React from 'react';
import { StyleSheet, Text, View, Linking, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Wizard from '../Components/Wizard';
import Input from '../Components/Input';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

  }
  componentWillMount() {
    Actions.Wizard({ title: this.props.title })
    return fetch('http://10.0.2.2:8000/api/questionList.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson.filter(data => data.section == this.props.section_id),
        }, function () {
          // alert(this.state.dataSource['studentFirstName']);
        });
      })
      .catch((error) => {
        alert(error)
      });

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
            initialValues={{

            }}
          >
            {this.state.data.map(el => (
              <Wizard.Step key={el.id}>
                {({ onChangeValue, values }) => (
                  <View style={styles.container}>
                    <View style={{ padding: 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: '100', color: '#555151' }}>{el.question_text}</Text>
                    </View>
                    {el.question_type == '1' ? <Input onChangeValue={onChangeValue} placeholder={el.placeholder} name={el.id}/> : null}
                    {el.question_type == '2' ? <Text>camera</Text> : null}
                    {el.question_type == '3' ? <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('http://google.com')}>Google</Text> : null}
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