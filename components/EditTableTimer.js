import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

import Timer from './Timer';
import TimerForm from './TimerForm';

EditTableTimer.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
}

function EditTableTimer(props) {
    const [editFormOpen, setEditFormOpen] = useState(false);

    const {id, title, project, elapsed, isRunning, onFormSubmit, 
        onRemovePress, onStopPress, onStartPress} = props;

    const handleEditPress = () => {
        openForm();
    }

    const handleSubmit = (timer) => {
        onFormSubmit(timer);
        closeForm();
    }
    const handleFormClose = () => {
        closeForm();
    }

    const openForm = () => setEditFormOpen(true);
    const closeForm = () => setEditFormOpen(false);

    if(editFormOpen) {
        return (
            <TimerForm id={id} title={title} project={project} 
            onFormSubmit={handleSubmit} onFormClose={handleFormClose}/>
        );
    }
    return (
        <Timer id={id} title={title} project={project} elapsed={elapsed}
         isRunning={isRunning} onEditPress={handleEditPress} 
         onRemovePress={onRemovePress} onStartPress={onStartPress} onStopPress={onStopPress}/>
    );
    
}

export default EditTableTimer;