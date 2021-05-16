import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(128, 'Description is to long. You can use 512 characters.'),
});

export default schema;
