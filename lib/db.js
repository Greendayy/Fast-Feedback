import { supabase } from './supabase';
// import getStripe from './stripe';

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
  const res = await supabase.from('sites').delete().eq('id', siteId);
  return res;
}

export async function updateSite(id, newValues) {
  const res = await supabase.from('sites').update({ id, newValues }).select();
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
export async function updateFeedback(id, status) {
  console.log('updateFeedback', status);
  const res = await supabase
    .from('feedback')
    .update(status)
    .eq('id', id)
    .select();
  return res;
}
// export async function createCheckoutSession(uid) {
//   const checkoutSessionRef = await supabase
//     .from('users')
//     .doc(uid)
//     .collection('checkout_sessions')
//     .add({
//       price: process.env.NEXT_PUBLIC_PRICE_ID,
//       allow_promotion_codes: true,
//       success_url: window.location.origin,
//       cancel_url: window.location.origin
//     });

//   checkoutSessionRef.onSnapshot(async (snap) => {
//     const { sessionId } = snap.data();

//     if (sessionId) {
//       const stripe = await getStripe();

//       stripe.redirectToCheckout({ sessionId });
//     }
//   });
// }

// export async function goToBillingPortal() {
//   const functionRef = app
//     .functions('us-central1')
//     .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');

//   const { data } = await functionRef({
//     returnUrl: `${window.location.origin}/account`
//   });

//   window.location.assign(data.url);
// }

// export function getTrade(extent, range) {
//   let randomArr = [];
//   while (randomArr.length < extent) {
//     const num = Math.floor(Math.random() * range);
//     if (randomArr.indexOf(num) === -1) randomArr.push(num);
//   }
//   return randomArr;
// }
