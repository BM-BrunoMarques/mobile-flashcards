import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

// IF I ACCESS THIS.PROPS
class Home extends React.Component {
  render() {
    console.log('PROPS', this.props)
    return (
      <View>
        <ScrollView>
          <Text>
            {this.props.allDecks
              ? Object.keys(this.props.allDecks).map((K) => {
                return <Text>{K}</Text>
              })
              : null
            }
          </Text>
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps({ allDecks }) {
  return {
    allDecks: allDecks
  }
}

export default connect(mapStateToProps)(Home)