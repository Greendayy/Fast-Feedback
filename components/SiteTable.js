import React from 'react';
import NextLink from 'next/link';
import { Box, Link } from '@chakra-ui/core';
import { parseISO, format } from 'date-fns';

import { Table, Tr, Th, Td } from './Table';
import { createRandomSite } from '@/lib/db-faker';
import DeleteSitebutton from './DeleteSiteButton';

const SiteTable = ({ sites }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Site Link</Th>
            <Th>Feedback Link</Th>
            <Th>Date Added</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {/* <Box as="tr" key={createRandomSite().siteId}>
            <Td fontWeight="medium">{createRandomSite().siteName}</Td>
            <Td>
              <Link href={createRandomSite().siteUrl} isExternal>
                {createRandomSite().siteUrl}
              </Link>
            </Td>
            <Td>
              <NextLink
                href="/p/[siteId]"
                as={`/p/${createRandomSite().siteId}`}
                passHref
              >
                <Link color="blue.500" fontWeight="medium">
                  View Feedback
                </Link>
              </NextLink>
            </Td>
            <Td>{createRandomSite().siteAt}</Td>
          </Box> */}
          {sites.length>0&&sites.map((site) => (
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>
                <Link href={site.url} isExternal>
                  {site.url}
                </Link>
              </Td>
              <Td>
                <NextLink href="/p/[siteId]" as={`/p/${site.id}`} passHref>
                  <Link color="blue.500" fontWeight="medium">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{site.created_at?format(parseISO(site.created_at), 'PPpp'):''}</Td>
              {/* {format(parseISO(site.created_at), 'PPpp')} */}
              <Td>
                <DeleteSitebutton siteId={site.id} />
              </Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default SiteTable;
