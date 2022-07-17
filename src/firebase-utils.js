import { db } from '../src/firebase-config'
import { collection, doc, getDoc, addDoc } from 'firebase/firestore';

export const menuCollectionRef = collection(db, 'menu-items');
const ordersCollectionRef = collection(db, 'order-items');

export const getItemsById = (id) => {
  const docRef = doc(db, 'menu-items', id);
  const docSnap = getDoc(docRef).then((item) => {
        return {
            id: item.id,
            data: item.data()
  }}).catch((err) => {console.log(err.message)});
  return docSnap;
};

export const sendOrderInFirebase = (newOrder) => {
  try {
    const savingOrder = addDoc(ordersCollectionRef, newOrder);
    return savingOrder;
  } catch (error) {
    console.log('error al guardar pedido del cliente en firebase');
    throw new Error(error);
  }
};




