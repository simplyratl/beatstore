import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCfWh7LfgcA1GkPt1WnsfH7N13W4fhe9MU',
    authDomain: 'beatstore-a7a21.firebaseapp.com',
    projectId: 'beatstore-a7a21',
    storageBucket: 'beatstore-a7a21.appspot.com',
    messagingSenderId: '1095447467119',
    appId: '1:1095447467119:web:6116fd9acf7acc9d0d299a',
    measurementId: 'G-J7J7Q8D4DK',
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export default storage;
