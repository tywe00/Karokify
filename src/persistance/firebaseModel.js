import { initializeApp } from 'firebase/app';
import firebaseConfig from "./firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import store from '../store/store';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const PATH = "Karokify/Users";

const rf = ref(db, PATH+"/0001");

function persistToFirebase() {
    const state = store.getState();
    const playedHistory = state.playedHistory;
    set(rf, playedHistory);
}

export default persistToFirebase;








