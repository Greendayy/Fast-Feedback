import { useRef, useState } from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Heading,
  Box,
  Button,
  Flex,
  Text,
  Badge,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select
} from '@chakra-ui/core';
import QRCode from 'qrcode';

import { useAuth } from '@/lib/auth';
import { getTrade } from '@/lib/db';
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';
import { useForm } from 'react-hook-form';

const FeedbackUsage = () => (
  <StatGroup>
    <Stat>
      <StatLabel color="gray.700">Feedback</StatLabel>
      <StatNumber fontWeight="medium">∞</StatNumber>
      <StatHelpText>10,000 limit</StatHelpText>
    </Stat>

    <Stat>
      <StatLabel color="gray.700">Sites</StatLabel>
      <StatNumber fontWeight="medium">1/∞</StatNumber>
      <StatHelpText>Unlimited Sites</StatHelpText>
    </Stat>
  </StatGroup>
);

const SettingsTable = ({ stripeRole, children }) => (
  <Box
    backgroundColor="white"
    mt={8}
    borderRadius={[0, 8, 8]}
    boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
  >
    <Flex
      backgroundColor="gray.50"
      borderTopLeftRadius={[0, 8, 8]}
      borderTopRightRadius={[0, 8, 8]}
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center" w="full">
        <Text
          textTransform="uppercase"
          fontSize="xs"
          color="gray.500"
          fontWeight="medium"
          mt={1}
        >
          Settings
        </Text>
        <Badge h="1rem" variantColor="blue">
          {stripeRole}
        </Badge>
      </Flex>
    </Flex>
    <Flex direction="column" p={6}>
      {children}
    </Flex>
  </Box>
);

const Account = () => {
  const { user, signout } = useAuth();
  const [isBillingLoading, setBillingLoading] = useState(false);
  const auth = useAuth();
  // const initialRef = useRef();
  // const { handleSubmit, register } = useForm();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const toast = useToast();

  // const goToBillingPortal = () => {
  //   QRCode.toCanvas(canvas, `${getTrade}+''`, function (error, data) {
  //     if (error) {
  //       toast({
  //         title: 'Failed!',
  //         description: error.message,
  //         status: 'error',
  //         duration: 5000,
  //         isClosable: true
  //       });
  //     }
  //     if (data) {
  //       toast({
  //         title: 'Success!',
  //         description: 'Please scan the QR code!',
  //         status: 'success',
  //         duration: 5000,
  //         isClosable: true
  //       });
  //       onClose();
  //     }
  //   });
  // };

  return (
    <DashboardShell>
      <Flex
        direction="column"
        maxW="600px"
        align={['left', 'center']}
        margin="0 auto"
      >
        <Flex direction="column" align={['left', 'center']} ml={4}>
          <Avatar
            w={['3rem', '6rem']}
            h={['3rem', '6rem']}
            mb={4}
            src={user?.photoUrl}
          />
          <Heading letterSpacing="-1px">{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Flex>
        <SettingsTable stripeRole={user?.stripeRole}>
          <FeedbackUsage />
          <Text my={4}>
            Fast Feedback uses Stripe to update, change, or cancel your
            subscription. You can also update card information and billing
            addresses through the secure portal.
          </Text>
          <Flex justify="flex-end">
            <Button variant="ghost" ml={4} onClick={() => signout()}>
              {user ? 'Log Out' : 'Log In'}
            </Button>
            {/* <NextLink href="/billing" passHref> */}
            <NextLink
              href="https://buy.stripe.com/test_bIY02r0am3fTgaAdQQ"
              passHref
            >
              <Button
                // onClick={onOpen}
                isDisabled={!auth.user}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                ml={4}
                isLoading={isBillingLoading}
                _hover={{ bg: 'gray.700' }}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)'
                }}
              >
                Manage Billing
              </Button>
            </NextLink>
            {/* </NextLink> */}

            {/* <Modal
              maxWidth="50px"
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent
                as="form"
                onSubmit={handleSubmit(goToBillingPortal)}
              >
                <ModalHeader fontWeight="bold">Billing Portal</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Select placeholder="Subscription Item">
                    <option
                      value="7 days free trial"
                      ref={register({
                        required: 'Required'
                      })}
                    >
                      7 days free trial
                    </option>
                    <option
                      value="monthly subscription"
                      ref={register({
                        required: 'Required'
                      })}
                    >
                      monthly subscription
                    </option>
                    <option
                      value="annually"
                      ref={register({
                        required: 'Required'
                      })}
                    >
                      annually subscription
                    </option>
                  </Select>
                </ModalBody>

                <ModalFooter>
                  <Button onClick={onClose} mr={3} fontWeight="medium">
                    Cancel
                  </Button>
                  <Button
                    id="Paid"
                    backgroundColor="#99FFFE"
                    color="#194D4C"
                    fontWeight="medium"
                    type="submit"
                    Loading={() => setBillingLoading(true)}
                  >
                    Paid
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal> */}
          </Flex>
          {/* <Flex margin="0 auto" marginTop="10px">
            <canvas id="canvas"></canvas>
          </Flex> */}
        </SettingsTable>
      </Flex>
    </DashboardShell>
  );
};

const AccountPage = () => (
  <Page name="Account" path="/account">
    <Account />
  </Page>
);

export default AccountPage;
