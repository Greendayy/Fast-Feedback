import { compareDesc, compareAsc, parseISO } from 'date-fns';

import { supabase } from './supabase';

export async function getAllFeedback() {
  const { data: feedback, error } = await supabase
    .from('feedback')
    .select()

  console.log('getAllFeedback:', feedback, error);

  return feedback;
}

export async function getFeedback(siteId, route) {
  console.log("getFeedback", siteId);
  const { error, data } = await supabase.from('feedback').select()
  .eq('site_id', siteId)
  .eq('status', 'active');
  // const site = { id: doc.id, ...doc.data() };
  if (error) throw Error(error);
  console.log("getFeedback", data, error);
  return data;
}

export async function getSite(siteId) {
  console.log("getSiteById", siteId);
  const { error, data } = await supabase.from('sites').select().eq('id', siteId);
  // const site = { id: doc.id, ...doc.data() };
  if (error) throw Error(error);
  console.log("getSiteById", data, error);
  return data;
}

export async function getAllSites() {

  const { data: sites, error } = await supabase
    .from('sites')
    .select()

  console.log('getAllSites:', sites, error);

  return sites;
}

export async function getUserSites(uid) {
  const res = await supabase.from('sites').select().eq('author_id', uid);

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
    .select()
    .eq('site_id', siteIds);

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}
