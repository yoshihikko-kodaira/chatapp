import {
  Avatar,
  Button,
  chakra,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { FirebaseError } from '@firebase/util';
import { getAuth, signOut } from 'firebase/auth';

import { useAuthContext } from '../../feature/auth/provider/AuthProvider';
import { useRouter } from '../../hooks/useRouter/useRouter';
import { Navigate } from '../Navigate/Navigate';

export const Header = () => {
  const { user } = useAuthContext();
  const toast = useToast();
  const { push } = useRouter();

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top',
      });
      push((path) => path.signin.$url());
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e);
      }
    }
  };

  const handleprofile = () => {
    push((path) => path.profile.$url());
  };

  return (
    <chakra.header py={4} bgColor={'black'}>
      <Container maxW={'container.lg'}>
        <Flex>
          <Navigate href={(path) => path.$url()}>
            <chakra.a
              _hover={{
                opacity: 0.8,
              }}
            >
              <Heading color={'white'}>Firebase Realtime Chat</Heading>
            </chakra.a>
          </Navigate>
          <Spacer aria-hidden />
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar flexShrink={0} width={10} height={10} />
              </MenuButton>

              <MenuList py={0}>
                <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
                <MenuItem onClick={handleprofile}>プロフィール設定</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Navigate href={(path) => path.signin.$url()}>
              <Button as={'a'} colorScheme={'teal'}>
                サインイン
              </Button>
            </Navigate>
          )}
        </Flex>
      </Container>
    </chakra.header>
  );
};
