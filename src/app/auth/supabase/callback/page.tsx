'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from 'src/auth/context/supabase';
import { supabase } from 'src/auth/context/supabase/lib';
import { paths } from 'src/routes/paths';

const Page = () => {
  const context = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const saveUser = async () => {
      const { data, error } = await supabase
        .from('clients')
        .upsert({
          id: context?.user?.id,
          name: context?.user?.user_metadata?.display_name,
          email: context?.user?.user_metadata?.email,
        })
        .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        router.replace(paths.auth.supabase.guideProfile);
      }
    };
    saveUser();
  }, [context]);

  return null;
};

export default Page;
