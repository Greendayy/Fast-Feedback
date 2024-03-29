import React from 'react';
import { Box, Divider, Heading, Text } from '@chakra-ui/core';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, created_at }) => (
  <Box borderRadius={4} maxWidth="700px" w="full">
    <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
      {author}
    </Heading>
    <Text color="gray.500" mb={4} fontWeight="xs">
      {format(parseISO(created_at), 'PPpp')}
    </Text>
    <Text color="gray.900">{text}</Text>
    <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8}></Divider>
  </Box>
);

export default Feedback;
