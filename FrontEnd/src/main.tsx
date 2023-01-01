import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

//
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAevTr1QMwKr6we177_J2NF6-6hvmXNnMg',
	authDomain: 'sathyam-blog.firebaseapp.com',
	projectId: 'sathyam-blog',
	storageBucket: 'sathyam-blog.appspot.com',
	messagingSenderId: '230934452641',
	appId: '1:230934452641:web:3008b6bf1aced5196613e0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
