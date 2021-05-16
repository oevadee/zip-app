import {
  Button,
  Divider,
  Heading,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Avatar,
  Box,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import schema from '../schema';
import { changeUserName } from '/src/state/actions/userAction';
import { CardContent } from '/src/uiComponents';

const Form = ({ onSubmit, isLoading, defaults }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: defaults.name,
      userImage: defaults.userImage,
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema)
  });
  const [file, setFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (file) {
      let reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const handleRequest = (values) => {
    onSubmit({ values, file });
    dispatch(changeUserName(values.name));
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit(handleRequest)}>
      <CardContent>
        <Heading size='md'>
          {defaults.name
            ? `Hello ${defaults.name}.`
            : 'Add your name and surname.'}
        </Heading>
      </CardContent>
      <Divider />
      <CardContent>
        <FormControl>
          <FormLabel></FormLabel>
          <Input
            autoComplete='off'
            ref={register}
            type='text'
            name='name'
            placeholder={defaults.name ? `Change your name` : 'enter your name'}
            mb={6}
          />
        </FormControl>
      </CardContent>
      <CardContent>
        <Heading size='md'>Change your profile image</Heading>
      </CardContent>
      <Divider />
      <CardContent d='flex' alignItems='center'>
        <Avatar src={profileImage ? profileImage : defaults.userImage} mr={5} />
        <input
          name='file'
          id='file'
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          className='settingsView__uploadInput'
        />
        <label htmlFor='file'>
          <Button
            size='sm'
            variant='outline'
            as='a'
            aria-label='upload image'
            colorScheme='blue'
            cursor='pointer'
          >
            Change your photo
          </Button>
        </label>
      </CardContent>
      <CardContent>
        <Heading size='md'>Change your password</Heading>
      </CardContent>
      <Divider />
      <CardContent>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input ref={register} type='password' name='password' />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Confirm Password</FormLabel>
          <Input ref={register} type='password' name='confirmPassword' />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <Button
          isLoading={isLoading}
          loadingText='Submitting'
          colorScheme='teal'
          variant='solid'
          type='submit'
          colorScheme='blue'
        >
          Submit
        </Button>
      </CardContent>
    </form>
  );
};

export default Form;
