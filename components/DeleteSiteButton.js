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

const DeleteSitebutton = ({ site }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const auth = useAuth();
  const toast = useToast();

  // 检查当前用户是否是站点的创建者
  const isOwner = auth.user && site.author_id === auth.user.uid;

  const onClose = () => setIsOpen(false);
  const onDelete = async () => {
    // 再次检查权限
    if (!isOwner) {
      toast({
        title: 'Permission Denied!',
        description: 'You can only delete sites that you created.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    const { error } = await deleteSite(site.id, auth.user.uid);
    console.log('deleteSite res', error);
    if (!error) {
      toast({
        title: 'Success!',
        description: "We've delete your site.",
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      mutate(['/api/sites', auth.user.token], async (data) => {
        return {
          sites: data.sites.filter((s) => s.id !== site.id)
        };
      });
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

  // 如果不是所有者，不显示删除按钮
  if (!isOwner) {
    return null;
  }

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
