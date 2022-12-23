import React from 'react';
import { Box, Code, IconButton, Switch } from '@chakra-ui/core';
import RemoveButton from '@/components/RemoveButton';

import { Table, Tr, Th, Td } from './Table';

const FeedbackTable = ({ allfeedback }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th>{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {
            //allfeedback.length > 0 &&
            allfeedback?.map((feedback) => (
              <Box as="tr" key={feedback.id}>
                <Td fontWeight="medium">{feedback.author}</Td>
                <Td>{feedback.text}</Td>
                <Td>
                  <Code>{'/'}</Code>
                </Td>
                <Td>
                  <Switch
                    variantColor="green"
                    defaultIsChecked={feedback.status === 'active'}
                  />
                </Td>

                <Td>
                  <RemoveButton feedbackId={feedback.id} />
                </Td>
              </Box>
            ))
          }
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
