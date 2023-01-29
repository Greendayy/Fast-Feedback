import React from 'react';
import { Box } from '@chakra-ui/core';

import { Table, Tr, Th } from './Table';
import FeedbackRow from './FeedbackRow';

const FeedbackTable = (props) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th minW="150px">Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {props.feedback.map((feedback) => (
            <FeedbackRow key={feedback.id} {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
// import React from 'react';
// import { Box, Code, IconButton, Switch } from '@chakra-ui/core';
// import RemoveButton from '@/components/RemoveButton';

// import { Table, Tr, Th, Td } from './Table';

// const FeedbackTable = ({ feedback }) => {
//   return (
//     <Box overflowX="scroll">
//       <Table w="full">
//         <thead>
//           <Tr>
//             <Th>Name</Th>
//             <Th>Feedback</Th>
//             <Th>Route</Th>
//             <Th>Visible</Th>
//             <Th>{''}</Th>
//           </Tr>
//         </thead>
//         <tbody>
//           {
//             //allfeedback.length > 0 &&
//             feedback?.map((feedback) => (
//               <Box as="tr" key={feedback.id}>
//                 <Td fontWeight="medium">{feedback.author}</Td>
//                 <Td>{feedback.text}</Td>
//                 <Td>
//                   <Code>{'/'}</Code>
//                 </Td>
//                 <Td>
//                   <Switch
//                     variantColor="green"
//                     defaultIsChecked={feedback.status === 'active'}
//                   />
//                 </Td>

//                 <Td>
//                   <RemoveButton feedbackId={feedback.id} />
//                 </Td>
//               </Box>
//             ))
//           }
//         </tbody>
//       </Table>
//     </Box>
//   );
// };

// export default FeedbackTable;
