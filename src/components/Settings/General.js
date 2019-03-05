import React, {Component} from 'react'
import {View, Text} from 'react-native'

import  { createMaterialTopTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import  Profile from '../Settings/Profile.js'
 
class General extends Component {
     render() {
         return (
             <View>
                <Text> Settings </Text>
             </View>
                )
         }
     }
     export default createMaterialTopTabNavigator({
        dashboard: { screen: General,
            navigationOptions: {
                tabBarLabel: 'General',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="md-home" color={tintColor} size={24} />
                )
            }
        },
        documents: { screen: Profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="md-document" color={tintColor} size={24} />
                )
            }
        }, 
    },
    {
        tabBarOptions: {
            activeTintColor: 'orange',
            inactiveTintColor: 'grey',
            style: {
                backgroundColor: 'green'
            },
            indicatorStyle: {
                height: 0
            },
            showIcon: true
        },
        navigationOptions: () => ({ header: null })
    
    })
    
    