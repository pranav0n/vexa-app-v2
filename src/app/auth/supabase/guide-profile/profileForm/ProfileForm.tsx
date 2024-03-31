'use client';
import * as Yup from 'yup';
import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

import { fData } from 'src/utils/format-number';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import Label from 'src/components/label/label';
import { AuthContext } from 'src/auth/context/supabase';
import { supabase } from 'src/auth/context/supabase/lib';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type UserType = {
  displayName: string;
  email: string;
  photoURL: any;
  phoneNumber: string;
  avatarMessage: string;
  about: string;
};

interface Props {
  categories: any;
}

export default function ProfileForm({ categories }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [specialization, setSpecialization] = useState<any>([]);
  const [guideModels, setGuideModels] = useState<any>([]);
  const [clientModels, setClientModels] = useState<any>([]);
  const router = useRouter();

  const handleSpecialization = (
    event: React.MouseEvent<HTMLElement>,
    newSpecialization: string[]
  ) => {
    setSpecialization(newSpecialization);
  };

  const context = useContext(AuthContext);
  const user = context?.user?.user_metadata;

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    photoURL: Yup.mixed<any>().nullable().required('Avatar is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    avatarMessage: Yup.string().required('Avatar Message is required'),
    about: Yup.string().required('About is required'),
  });

  const defaultValues: UserType = {
    displayName: user?.display_name || '',
    email: user?.email || '',
    photoURL: null,
    phoneNumber: '',
    avatarMessage: '',
    about: '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      const newData = { ...data, specialization };
      specialization?.map(async (option: any) => {
        const category = categories?.find((item: any) => item?.category === option);
        const { data: model, error } = await supabase
          .from('models')
          .insert({
            category_id: category?.id,
            category: category?.category,
            counselor_id: context?.user?.id,
            email: newData?.email,
            model_message: category?.avatar_message,
            welcome_message: newData?.avatarMessage,
          })
          .select()
          .single();
        if (model) {
          const newCategoryModel = category?.models
            ? [...category?.models, model?.id]
            : [model?.id];
          const { data: cat, error: e } = await supabase
            .from('categories')
            .update({ models: newCategoryModel })
            .eq('id', category?.id)
            .select()
            .single();
          if (e) {
            console.error(e);
          }
          const newGuideModel = guideModels ? [...guideModels, model?.id] : [model?.id];
          setGuideModels(newGuideModel);
          const newClientModel = clientModels
            ? [...clientModels, { model_id: model?.id, category: category?.id }]
            : [{ model_id: model?.id, category: category?.id }];
          setClientModels(newClientModel);
        }
      });

      const { data: guide, error } = await supabase
        .from('counselors')
        .upsert({
          id: context?.user?.id,
          name: newData?.displayName,
          email: newData?.email,
          introduction: newData?.about,
          specialization: newData?.specialization?.toString(),
          whatsapp_number: newData?.phoneNumber,
          model_id: guideModels,
        })
        .select();
      if (error) {
        console.log(error);
      }
      if (data) {
        const { data: client, error: err } = await supabase.from('clients').upsert({
          id: context?.user?.id,
          name: newData?.displayName,
          email: newData?.email,
          role: 'counselor',
          models: clientModels,
        });
        if (err) {
          console.log(err);
        }
      }
      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoURL', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="displayName" label="Name" />
              <RHFTextField name="email" label="Email Address" disabled />
              <RHFTextField name="phoneNumber" label="WhatsApp Number" />
              <RHFTextField name="avatarMessage" label="Avatar Welcome Message" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <Stack alignItems="flex-start">
                <Label
                  variant="outlined"
                  color="info"
                  sx={{
                    border: 0,
                    color: 'grey.600',
                    backgroundColor: 'white',
                    zIndex: '10',
                    height: '10px',
                    fontWeight: '600',
                    position: 'relative',
                    transform: 'translate(8px, 5px)',
                  }}
                >
                  Specialization
                </Label>
                <ToggleButtonGroup
                  fullWidth
                  color="primary"
                  value={specialization}
                  onChange={handleSpecialization}
                  aria-label="specialization"
                  sx={{ borderColor: 'grey.300' }}
                >
                  {categories?.map((item: any) => (
                    <ToggleButton key={item?.id} value={item?.category} aria-label={item?.category}>
                      {item?.category}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Stack>

              <RHFTextField name="about" multiline rows={4} label="About" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
