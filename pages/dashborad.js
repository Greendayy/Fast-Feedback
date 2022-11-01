//任何需要身份验证状态的组件
import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Code, Flex, Text, Icon } from '@chakra-ui/core';
import EmptyState from '@/components/EmptyState';

export default function Dashborad() {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }
  return <EmptyState />;
}
