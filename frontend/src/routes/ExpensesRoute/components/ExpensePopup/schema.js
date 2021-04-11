import * as yup from 'yup';

const schema = yup.object().shape({
  user: yup.string().required(),
  value: yup.string().required(`You can't add an empty expense`),
  details: yup
    .string()
    .max(512, 'Description is to long. You can use 512 characters.'),
});

export default schema;
