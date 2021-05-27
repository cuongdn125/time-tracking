import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';

TimerButton.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    small: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
}
TimerButton.defaultProps = {
    small: false,
}

function TimerButton(props) {
    const {title, color, small, onPress} = props;
    return (
        <TouchableOpacity style={[styles.button, {borderColor: color}]} onPress={onPress}>
            <Text style={[
                styles.buttonText,
                small ? styles.small: styles.large,
                {color},
            ]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        minWidth: 100,
        borderWidth: 2,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    small: {
        fontSize: 14,
        padding: 5,
    },
    large: {
        fontSize: 16,
        padding: 10,
    },
});

export default TimerButton;