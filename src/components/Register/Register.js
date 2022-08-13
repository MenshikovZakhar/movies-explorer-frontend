import Form from '../Form/Form';

function Register() {
  return (
    <Form
      title={'Добро пожаловать!'}
      type={'signup'}
      button={'Зарегистрироваться'}
      text={`Уже зарегистрированы? `}
    />
  );
};

export default Register;