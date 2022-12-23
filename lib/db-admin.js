import { compareDesc, compareAsc, parseISO } from 'date-fns';

import { db } from './firebase-admin';
import { supabase } from './supabase';

export async function getAllFeedback(siteId, route) {
  try {
    let ref = supabase
      .from('feedback')
      .eq('siteId', '==', siteId)
      .eq('status', '==', 'active');

    if (route) {
      ref = ref.eq('route', '==', route);
    }

    const snapshot = await ref.select();
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getSite(siteId) {
  const res = await supabase.from('sites').upsert(siteId).select();
  // const site = { id: doc.id, ...doc.data() };

  return res;
}

export async function getAllSites(siteId) {
  const res = await supabase
    .from('sites')
    .update(siteId)
    .eq('id', siteId)
    .select();
  return res;
}

export async function getUserSites(uid) {
  const snapshot = await supabase
    .from('sites')
    .eq('authorId', '==', uid)
    .select();

  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { sites };
}

export async function getAllFeedbackForSites(uid) {
  const { sites } = await getUserSites(uid);

  if (!sites.length) {
    return { feedback: [] };
  }

  const siteIds = sites.map((site) => site.id);
  const snapshot = await db
    .collection('feedback')
    .where('siteId', 'in', siteIds)
    .get();

  const feedback = [];

  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}
