import React from 'react';
import { faker } from '@faker-js/faker';
import { Box, Link, Skeleton } from '@chakra-ui/core';
import { Table, Tr, Th, Td } from './Table';
import { format, parseISO } from 'date-fns';

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {/* <Box as="tr" key={faker.person.fullName()}>
          <Td fontWeight="medium">{faker.internet.userName()}</Td>
          <Td>{faker.internet.domainName()}</Td>
          <Td>
            <Link>View Feedback</Link>
          </Td>
          <Td>{faker.date.past()}</Td>
        </Box> */}

        {sites.map((site) => (
          <Box as="tr" key={site.id}>
            <Td fontWeight="medium">{site.name}</Td>
            <Td>{site.url}</Td>
            <Td>
              <Link>View Feedback</Link>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default SiteTable;
