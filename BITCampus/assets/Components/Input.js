import React, { PureComponent } from 'react';
import { TextInput,Text,View, StyleSheet } from 'react-native';
import { Textarea } from 'native-base'
class Input extends PureComponent {
  _onChangeText = text => {
    this.props.onChangeValue(this.props.name, text);
  };

  render() {
    const { onChangeValue, name, ...rest } = this.props;
    return (
      <View style={styles.root}>
       <Textarea rowSpan={5} bordered
        {...rest}
        onChangeText={this._onChangeText}
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    width: '100%',
    height:200,
    padding:10
  },
  textarea:{
    width:'100%',
    flex:1,
  }
});

export default Input;
