import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';

import ToggleableTimerForm from './components/ToggleableTimerForm';
import EditTableTimer from './components/EditTableTimer';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { newTimer } from './util/TimerUtil';

export default function App() {
  const [timers, setTimers] = useState([
    {
      title: 'Mow the lawn',
      project: 'House Chores',
      id: uuidv4(), 
      elapsed: 5456099,
      isRunning: false,
    },
    {
      title: 'Bake squash',
      project: 'Kitchen Chores',
      id: uuidv4(), 
      elapsed: 1273998,
      isRunning: true,
    },
  ]);

  const handleCreateFormSubmit = (timer) => {
    const oldTimer = [newTimer(timer) ,... timers];
    // console.log(timer);
    setTimers(oldTimer);
  }

  const handleFormSubmit = (timer) => {
    const oldTimers = [... timers];
    const newTimers =oldTimers.map(t => {
      if(timer.id === t.id){
        return ({
          ... t,
          title: timer.titleTF, 
          project: timer.projectTF,
        })
      }
      return t;
    })
    setTimers(newTimers);
  }

  const handleRemovePress = (timerId) => {
    const oldTimers = [... timers];
    const newTimers = oldTimers.filter(timer => timer.id !== timerId);
    setTimers(newTimers);
  }

  const toggeTimer = (timerId) => {
    const oldTimers = [... timers];
    const newTimers = oldTimers.map(timer => {
      const {id, isRunning } = timer;
      if(id === timerId) {
        return {
          ... timer, isRunning: !isRunning,
        }
      }
      return timer;
    })
    setTimers(newTimers);
  }

  useEffect(() => {
    const TIME_INTERVAL = 1000;
    const intervalId = setInterval(() => {
      const oldTimers = [... timers];
      const newTimers = oldTimers.map(timer =>{
        const {elapsed, isRunning} = timer;
        return {
          ...timer,
          elapsed: isRunning ? elapsed + TIME_INTERVAL : elapsed,
        };
      });
      setTimers(newTimers);
    }, TIME_INTERVAL);
    return () => {clearInterval(intervalId)}
  });
  

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <KeyboardAvoidingView behavior='padding' style={styles.listContainer} >
        <ScrollView style={styles.timeList}>
          <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
          {timers.map((timer) => (
            <EditTableTimer 
              key={timer.id}
              id={timer.id}
              title={timer.title}
              project={timer.project}
              elapsed={timer.elapsed}
              isRunning={timer.isRunning}
              onFormSubmit={handleFormSubmit}
              onRemovePress={handleRemovePress}
              onStopPress={toggeTimer}
              onStartPress={toggeTimer}
            />
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 45,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  }
});
