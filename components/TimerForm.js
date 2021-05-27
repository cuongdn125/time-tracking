import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

import TimerButton from './TimerButton';

TimerButton.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    project: PropTypes.string,
    onFormSubmit: PropTypes.func,
    onFormClose: PropTypes.func,
}
TimerButton.defaultProps = {
    id: null,
    title: '',
    project: '',
}

function TimerForm(props) {
    const {id, title, project, onFormClose, onFormSubmit} = props;
    const submitText = id ? 'Update' : 'Create';

    const [titleTF, setTitleTF] = useState(id ? title : '');
    const [projectTF, setProjectTF] = useState(id ? project : '');

    const handleTitleTextChange = (title) => {
        setTitleTF(title);
    }

    const handleProjectTextChange = (project) => {
        setProjectTF(project);
    }

    const handleSubmit = () => {
        onFormSubmit({id, titleTF, projectTF});
    }

    return (
        <View style={styles.formContainer} >
            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Title</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        value={titleTF}
                        onChangeText={handleTitleTextChange}
                    />
                </View>
            </View>

            <View style={styles.attributeContainer}>
                <Text style={styles.textInputTitle}>Project</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        underlineColorAndroid="transparent"
                        value={projectTF}
                        onChangeText={handleProjectTextChange}
                    />
                </View>
            </View>

            <View style={styles.buttonGroup} >
                <TimerButton small color="#21BA45" title={submitText} onPress={handleSubmit}/>
                <TimerButton small color="#DB2828" title="Cancel" onPress={onFormClose} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        margin: 15,
        marginBottom: 0,
        backgroundColor: "white",
        borderColor: "#D6D7DA",
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
    },
    attributeContainer: {
        marginVertical: 8,
    },
    textInputContainer: {
        borderColor: '#D6D7DA',
        borderWidth: 1,
        borderRadius: 2,
        marginBottom: 5,
    },
    textInput: {
        height: 30,
        padding: 5,
        fontSize: 12,
    },
    textInputTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default TimerForm;
