import { ref, set } from "firebase/database";
import store from '../store/store';
import { db, PATH } from '../slices/persistedDataSlice';


function persistToFirebase(userID) {
    const rf = ref(db, PATH+userID);
    const state = store.getState();
    let persistedData = {};
    persistedData.playedTracks = state.playedHistory;
    persistedData.currentTrack = state.currentTrack;
    set(rf, persistedData);
}


export default persistToFirebase;








