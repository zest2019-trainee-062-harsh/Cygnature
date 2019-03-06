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
        general: { screen: General,
            navigationOptions: {
                tabBarLabel: 'General',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="md-home" color={tintColor} size={18} />
                )
            }
        },
        profile: { screen: Profile,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <Icon name="md-document" color={tintColor} size={18} />
                )
            }
        }, 
    },
    {
        tabBarOptions: {
            activeTintColor: 'white',
            style: {
                backgroundColor: '#6eab52'
            },
            indicatorStyle: {
                height: 0
            },
            labelStyle: {
                fontSize: 12,
                fontWeight: 'bold'
            },
            showIcon: true,
            //lazy:  true,
            
        },
        navigationOptions: () => ({ header: null })
    
    })
    
    