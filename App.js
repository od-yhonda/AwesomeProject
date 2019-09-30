/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
 
 /* 必要なモジュールを読み込むための構文
 * 
 * import React, {Component} from 'react';
 * import 名前, { プロパティ } from 'インポート元';
 *         ↑         ↑ React.Component → Component と定義
 *        ReactはReactと定義しないといけない 
 */
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import TodoInput from './src/component/TodoInput';
import TodoItem from './src/component/TodoItem';

type Props = {};

export default class App extends Component<Props> { 

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  
  delete = (index) => () => {
    const list = [].concat(this.state.list);
    list.splice(index, 1);

    this.setState({
      list
    });
  }

  done = (index) => () => {
    const list = [].concat(this.state.list);
    list[index].done = !list[index].done;

    this.setState({
      list
    });
  }

  onPress = (text) => {
    console.log(text);
    const list = [].concat(this.state.list);

    list.push({
      key: Date(),
      text: text,
      done: false,
    });
    
    this.setState({
      list,
    });
}

render() {

  const { list, } = this.state; 

    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <TodoInput onPress={this.onPress}/>
          <View style={styles.todoListContainer}>
          <FlatList 
              style={styles.todoList}
              data={list}
              renderItem={({item, index}) => (
                <TodoItem onDone={this.done(index)} onDelete={this.delete(index)} {...item}/>
                )
              }
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#333',
    paddingTop: 40
  },
  main: {
    flex: 1,
    maxWidth: 400,
    alignItems: 'center'
  },
  todoListContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  todoList: {
    paddingLeft: 10,
    paddingRight: 10,
  }
});