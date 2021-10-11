import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Button, Icon, Spinner, useToast, VStack } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { GithubIcon, GitlabIcon } from '@cofe/icons';
import { post } from '@cofe/io';
import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';
import { Footer } from '@/components/Footer';
import { Root } from '@/components/Root';
import { supabase } from '@/utils/supabase';

const Login = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { push } = useRouter();
  const toast = useToast({
    status: 'error',
    duration: 1000,
    position: 'bottom-left',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    const callback = async (event, session) => {
      await post('/api/login', { event, session });

      if (session) {
        push('/');
      }
    };

    const _session = supabase.auth.session();

    if (_session) {
      callback('SIGNED_IN', _session);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(callback);

    return () => {
      authListener.unsubscribe();
    };
  }, [push]);

  const handleSignIn = async (provider) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signIn({
        provider,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: error.error_description || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Root>
      <Header />
      <VStack
        flex={1}
        p={8}
        maxW={80}
        marginX="auto"
        alignItems="stretch"
        justifyContent="center"
        gridGap={2}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Button
              variant="solid"
              colorScheme="teal"
              size="lg"
              onClick={() => {
                handleSignIn('github');
              }}
              leftIcon={<Icon as={GithubIcon} />}
            >
              使用 Github 账号登录
            </Button>
            <Button
              variant="solid"
              colorScheme="teal"
              size="lg"
              onClick={() => {
                handleSignIn('gitlab');
              }}
              leftIcon={<Icon as={GitlabIcon} />}
            >
              使用 Gitlab 账号登录
            </Button>
          </>
        )}
      </VStack>
      <Footer />
    </Root>
  );
};

export const getServerSideProps = compose(
  [withGsspColorMode],
  async (context: GetServerSidePropsContext) => {
    if (context.req.cookies['sb:token']) {
      const { user } = await supabase.auth.api.getUserByCookie(context.req);

      if (user) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }

    return {
      props: {},
    };
  },
);

export default Login;
