import React from 'react';
import ProfileForm from './profileForm/ProfileForm';
import { supabase } from 'src/auth/context/supabase/lib';

const Page = async () => {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id,category,slug,avatar_message,models');
  if (error) {
    console.error(error);
    return <h2>Something went wrong!</h2>;
  }

  return <ProfileForm categories={categories} />;
};

export default Page;
