import { useRef } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, Textarea, Button } from '@chakra-ui/core';
import useSWR, { mutate } from 'swr';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import fetcher from '@/utils/fetcher';
import Feedback from '@/components/Feedback';
import DashboardShell from '@/components/DashboardShell';
import SiteHeader from '@/components/SiteHeader';
import LoginButtons from '@/components/LoginButtons';

const FeedbackPage = () => {
  const { user } = useAuth();
  const inputEl = useRef(null);
  const router = useRouter();
  const siteAndRoute = router.query?.site;
  const siteId = siteAndRoute ? siteAndRoute[0] : null;
  const route = siteAndRoute ? siteAndRoute[1] : null;
  const feedbackApi = route
    ? `/api/feedback/${siteId}/${route}`
    : `/api/feedback/${siteId}`;
  console.log('site page:', user, feedbackApi);
  const { data: site } = useSWR(
    user ? [`/api/site/${siteId}`, user.token] : null,
    fetcher
  );
  const { data: feedbackData } = useSWR(
    user ? [feedbackApi, user.token] : null,
    fetcher
  );
  console.log('site detail page', siteId, site, feedbackData);
  const allFeedback = feedbackData;

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      siteAuthorId: site.author_id,
      route: route || '/',
      author: user.name,
      authorId: user.uid,
      text: inputEl.current.value.replace('\n', '\n\n'),
      created_at: new Date().toISOString(),
      provider: user.provider,
      status: 'active'
    };

    inputEl.current.value = '';
    createFeedback(newFeedback);
    mutate(
      feedbackApi,
      async (data) => ({
        feedback: [newFeedback, ...data.feedback]
      }),
      false
    );
  };

  const LoginOrLeaveFeedback = () =>
    user ? (
      <Button
        type="submit"
        // isDisabled={!siteData || !feedbackData}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        mt={4}
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        Leave Feedback
      </Button>
    ) : (
      <LoginButtons />
    );

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={site?.author_id == user?.uid}
        site={site}
        siteId={siteId}
        route={route}
      />
      <Box
        display="flex"
        mx={4}
        flexDirection="column"
        width="full"
        maxWidth="700px"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={8}>
            <Textarea
              ref={inputEl}
              id="comment"
              placeholder="Leave a comment"
              isDisabled={!user}
              h="100px"
            />
            {/* {!user && */}
            <LoginOrLeaveFeedback />
            {/* } */}
          </FormControl>
        </Box>
        {allFeedback &&
          allFeedback.map((feedback, index) => (
            <Feedback
              key={feedback.id}
              settings={site?.settings}
              isLast={index === allFeedback.length - 1}
              {...feedback}
            />
          ))}
      </Box>
    </DashboardShell>
  );
};

export default FeedbackPage;
