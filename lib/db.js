import AddSiteModal from '@/components/AddSiteModal';
import firebase from '@/lib/firebase';
import { supabase } from './supabase';

// export function updateUser(uid, data) {
//   return firestore.collection('users').doc(uid).update(data);
// }

//创建用户函数，接受用户id和关于用户的数据
export function createUser(uid, data) {
  //调用firestore
  return (
    supabase
      .from('users')
      .insert(uid)
      //设置信息将此id与其余信息结合起来，用它合并为true以确保保持该id唯一
      .select({ uid, ...data }, { merge: true })
  );
}

// export function createSite(data) {
//   //采集用户信息的表格名称合集
//   const site = firestore.collection('sites').doc();
//   site.set(data);
//   return site;
// }
//
// export function createSite({ anthorId, createdAt, name, url }) {
//   supabase
//     .from('sites')
//     .insert({ id: anthorId, created_at: createdAt, name: name, url: url })
//     .select();
// }
export const createSite = async (createSiteInput) => {
  const res = await supabase.from('sites').insert(createSiteInput).select();
  return res;
};

export async function deleteSite(siteId) {
  console.log('deleteSite', siteId);

  const res = await supabase.from('sites').delete().eq('id', siteId);
  return res;
}

export async function createFeedback(createFeedbackInput) {
  const res = await supabase
    .from('feedback')
    .insert(createFeedbackInput)
    .select();
  return res;
}

export async function deleteFeedback(feedbackId) {
  const res = await supabase.from('feedback').delete().eq('id', feedbackId);
  return res;
}
