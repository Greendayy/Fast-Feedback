import firebase from '@/lib/firebase';

//创建访问firestore
const firestore = firebase.firestore();

// export function updateUser(uid, data) {
//   return firestore.collection('users').doc(uid).update(data);
// }

//创建用户函数，接受用户id和关于用户的数据
export function createUser(uid, data) {
  //调用firestore
  return (
    firestore
      .collection('users')
      .doc(uid)
      //设置信息将此id与其余信息结合起来，用它合并为true以确保保持该id唯一
      .set({ uid, ...data }, { merge: true })
  );
}

export function createSite(data) {
  //采集用户信息的表格名称合集
  const site = firestore.collection('sites').doc();
  site.set(data);
  return site;
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}
