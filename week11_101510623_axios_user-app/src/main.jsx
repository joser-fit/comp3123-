import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import PersonList from './PersonList.jsx';

createRoot(document.getElementById('root')).render(
  <PersonList />
);
