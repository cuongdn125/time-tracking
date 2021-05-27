import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import { millisecondsToHuman } from '../util/TimerUtil';
import TimerButton from './TimerButton';


Timer.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    onEditPress: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
}

function Timer(props) {
    const {id, title, project, elapsed, onEditPress, onRemovePress,
         onStartPress, onStopPress, isRunning} = props;

    const handleRemovePress = () => {
        onRemovePress(id);
    }

    const handleStartPress = () => {
        onStartPress(id);
    }

    const handleStopPress = () => {
        onStopPress(id);
    }



    const elapseString = millisecondsToHuman(elapsed);
    return (
        <View style={styles.timerContainer}> 
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.project}>{project}</Text>
            <Text style={styles.elapsedTime}>{elapseString}</Text>
            <View style={styles.buttonGroup}>
                <TimerButton color='blue' small title='Edit' onPress={onEditPress}/>
                <TimerButton color='red' small title='Remove' onPress={handleRemovePress}/>
            </View>
            {(!isRunning) && <TimerButton color='#21BA45' small title='Start' onPress={handleStartPress} />}
            
            {(isRunning) &&   <TimerButton color='#DB2828'  small title='Stop' onPress={handleStopPress} />}
            
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        backgroundColor: 'white',
        borderColor: '#d6d7da',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        margin: 15,
        marginBottom: 0,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    elapsedTime: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default Timer;