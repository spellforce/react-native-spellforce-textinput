import React, { PropTypes, Component } from 'react';
import {
    Animated,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
} from 'react-native';

import BaseInput from './BaseInput';

const PADDING = 16;
const ICON_WIDTH = 50;

export default class Sample extends BaseInput {

    static propTypes = {
      /*
       * This is the icon component you are importing from react-native-vector-icons.
       * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
       * iconClass={FontAwesomeIcon}
       */
        iconClass: PropTypes.func.isRequired,
      /*
       * Passed to react-native-vector-icons library as name prop
       */
        iconName: PropTypes.string.isRequired,
      /*
       * Passed to react-native-vector-icons library as color prop.
       * Also used as textInput color.
       */
        iconColor: PropTypes.string,
        passiveIconColor: PropTypes.string,
        height: PropTypes.number,
        iconSize:PropTypes.number,
    };

    static defaultProps = {
        height: 40,
        iconSize:20,
        iconColor: '#00aeef',
        passiveIconColor: '#a3a3a3',
        animationDuration: 300,
    };

    render() {
        const {
            iconClass,
            iconColor,
            passiveIconColor,
            iconName,
            iconSize,
            label,
            style: containerStyle,
            inputStyle,
            height: inputHeight,
            labelStyle,
        } = this.props;
        const { focusedAnim, value } = this.state;
        const AnimatedIcon = Animated.createAnimatedComponent(iconClass);
        const ANIM_PATH = PADDING + inputHeight;
        const NEGATIVE_ANIM_PATH = ANIM_PATH * -1;

        return (
            <View style={[styles.container,containerStyle]} onLayout={this._onLayout}>
              <TouchableWithoutFeedback onPress={this.focus}>
                <AnimatedIcon
                    name={iconName}
                    color={iconColor}
                    size={iconSize}
                    style={{
                        position: 'absolute',
                        left: PADDING,
                        bottom: focusedAnim.interpolate({
                            inputRange: [0, 0.5, 0.51, 0.7, 1],
                            outputRange: [(inputHeight-iconSize)/2, ANIM_PATH, NEGATIVE_ANIM_PATH, NEGATIVE_ANIM_PATH, (inputHeight-iconSize)/2],
                        }),
                        color: focusedAnim.interpolate({
                            inputRange: [0, 0.5, 1],
                            outputRange: [passiveIconColor, iconColor, iconColor],
                        }),
                    }}
                />
              </TouchableWithoutFeedback>
              <TextInput
                  ref="input"
                  {...this.props}
                  style={[styles.textInput, {
                      marginLeft: ICON_WIDTH,
                      color: iconColor,
                  }, inputStyle]}
                  value={value}
                  placeholder={label}
                  onBlur={this._onBlur}
                  onFocus={this._onFocus}
                  onChange={this._onChange}
                  underlineColorAndroid={'transparent'}
              />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'white',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor:"gray"
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    textInput: {
        color: 'black',
        fontSize: 12,
    },
});
