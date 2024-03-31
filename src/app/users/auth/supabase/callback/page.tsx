'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'src/auth/context/supabase';
import { supabase } from 'src/auth/context/supabase/lib';

const Page = () => {
  const context = useContext(AuthContext);
  // console.log(context?.user);
  const router = useRouter();

  const userId = context?.user?.id;
  const userData = context?.user?.user_metadata;

  useEffect(() => {
    const saveUser = async () => {
      const { data, error } = await supabase
        .from('clients')
        .upsert({
          id: userId,
          name: userData?.display_name,
          email: userData?.email,
        })
        .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        router.replace('/');
      }
    };
    saveUser();
  }, [context]);

  return null;
};

export default Page;
