import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  useDisclosure
} from '@chakra-ui/core';

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { database } from 'firebase';
import fetcher from '@/utils/fetcher';
import { useRangeSlider } from '@chakra-ui/react';
import { supabase } from '@/lib/supabase';
import { id } from 'date-fns/locale';
import Router from 'next/router';

const AddSiteModal = ({ children }) => {
  const initialRef = useRef();
  const toast = useToast();
  const auth = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  console.log('begin create site');
  const onCreateSite = async ({ name, url }) => {
    const newSite = {
      author_id: auth.user.uid,
      created_at: new Date(),
      name,
      url
    };
    const { data, error } = await createSite(newSite);
    console.log("createSite res", data, error);
    if (error) {
      toast({
        title: 'Failed!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    if (data) {
      toast({
        title: 'Success!',
        description: "We've added your site.",
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      mutate(
        ['/api/sites', auth.user.token], async (old) => {
          console.log("cache old:", old);
          return { sites: [{ ...data }, ...old.sites] }
        });
      onClose();
      // Router.reload('/dashboard');
    }
    // console.log('id', id);


  };

  return (
    <>
      <Button
        isDisabled={!auth.user}
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
      >
        {children}
        {/* + Add Site */}
      </Button>
      <Modal
        maxWidth="50px"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                id="site-input"
                placeholder="My site"
                name="name"
                ref={register({
                  required: 'Required'
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                id="link-input"
                placeholder="https://website.com"
                name="url"
                ref={register({
                  required: 'Required'
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              id="create-site-button"
              backgroundColor="#99FFFE"
              color="#194D4C"
              fontWeight="medium"
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
