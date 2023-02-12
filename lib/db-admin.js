import { compareDesc, compareAsc, parseISO } from 'date-fns';

import { supabase } from './supabase';

export async function getAllFeedback(siteId) {
  console.log('siteId:', siteId);
  const res = await supabase
    .from('feedback')
    .select()
    .eq('site_id', siteId)
    .eq('status', 'active');

  return res;
  // .sort((a, b) =>
  //   compareAsc(parseISO(a.created_at), parseISO(b.created_at))
  // );
}

export async function getSite(siteId) {
  console.log("getSiteById", siteId);
  const {error,data} = await supabase.from('sites').select().eq('id', siteId);
  // const site = { id: doc.id, ...doc.data() };
  if(error) throw Error(error);
  console.log("getSiteById", res,siteId);
  return data;
}

export async function getAllSites(siteId) {
  console.log('siteId:', siteId);
  const res = await supabase
    .from('sites')
    .update(siteId)
    .eq('id', siteId)
    .select();

  return res;
}

export async function getUserSites(uid) {
  const res = await supabase.from('sites').eq('author_id', uid).select();

  return res.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );
}

export async function getAllFeedbackForSites(uid) {
  const { sites } = await getUserSites(uid);

  if (!sites.length) {
    return { feedback: [] };
  }

  const siteIds = sites.map((site) => site.id);
  const snapshot = await supabase
    .from('feedback')
    .eq('site_id', siteIds)
    .select();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}
