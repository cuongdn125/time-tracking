import React, { useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

ToggleableTimerForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
}

function ToggleableTimerForm(props) {
    const [isOpen, setIsOpen] = useState(false);

    const { onFormSubmit } = props;

    const handleFormOpen = () => setIsOpen(true);
    const handleFormClose = () => setIsOpen(false);
    const handleFormSubmit = (timer) => {
        onFormSubmit(timer);
        setIsOpen(false);
    }
    return (
        <View style={[styles.container, !isOpen && styles.buttonPadding]}>
            {isOpen ? (<TimerForm onFormClose={handleFormClose} onFormSubmit={handleFormSubmit} />) : (<TimerButton title='+' color='black' onPress={handleFormOpen}/>)}
        </View>
    );
}

const styles= StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    buttonPadding: {
        paddingHorizontal: 15,
    }
});

export default ToggleableTimerForm;