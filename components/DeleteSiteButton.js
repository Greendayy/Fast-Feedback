import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
  useToast
} from '@chakra-ui/core';

import { deleteSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const DeleteSitebutton = ({ siteId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const auth = useAuth();
  const toast = useToast();

  const onClose = () => setIsOpen(false);
  const onDelete = async () => {
    const {error} = await deleteSite(siteId);
    console.log("deleteSite res",error);
    if (!error) {
      toast({
        title: 'Success!',
        description: "We've delete your site.",
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      mutate(
        ['/api/sites', auth.user.token],
        async (data) => {
          return {
            sites: data.sites.filter((site) => site.id !== siteId)
          };
        }
      );
      onClose();
    } else {
      toast({
        title: 'Failed!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }

  };

  return (
    <>
      <IconButton
        aria-label="Delete site"
        icon="delete"
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Site
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? This will also delete all feedback left on the site.
            You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              fontWeight="bold"
              variantColor="red"
              onClick={onDelete}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSitebutton;
