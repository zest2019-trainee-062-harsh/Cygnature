import React, {Component} from 'react'
import {View,  Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';
 
class customtext extends Component {

    static propTypes = {
        content: PropTypes.string.isRequired,
        textStyles: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.number,
          PropTypes.shape({}),
        ]).isRequired,
        buttonStyles: PropTypes.oneOfType([
          PropTypes.array,
          PropTypes.number,
          PropTypes.shape({}),
        ]).isRequired,
      }

      render = () => {
        const { textStyles, buttonStyles, content } = this.props;
        
        return (
          <TouchableOpacity style={buttonStyles} onPress={this.change} >
            <Text style={textStyles}>{content}</Text>
          </TouchableOpacity>
        );
      }
}

export default customtext