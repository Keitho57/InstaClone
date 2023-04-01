import { doc, getFirestore, getDoc, DocumentData } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { CONSTANTS } from '../constants';
import { DispatchType, UserAction } from '../../types/user';

export function fetchUser() {
  return (dispatch: DispatchType) => {
    const auth = getAuth();
    const userDocRef = doc(getFirestore(), 'users', auth.currentUser!.uid);
    getDoc(userDocRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const action: UserAction = {
            type: CONSTANTS.USER_STATE_CHANGE,
            currentUser: snapshot.data(),
          };
          console.log('snapshot', snapshot);
          dispatch(action);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error);
      });
  };
}
