import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5AUthX3y_Yg3mX8x2YPXdFyay2_NUZy4",
    authDomain: "scheduler-b2cf7.firebaseapp.com",
    databaseURL: "https://scheduler-b2cf7-default-rtdb.firebaseio.com",
    projectId: "scheduler-b2cf7",
    storageBucket: "scheduler-b2cf7.appspot.com",
    messagingSenderId: "531357297260",
    appId: "1:531357297260:web:49c43ffe93024e012c8649",
    measurementId: "G-1XX9JJ3197"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
};