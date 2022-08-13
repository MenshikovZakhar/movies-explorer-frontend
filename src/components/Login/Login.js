import Form from '../Form/Form';

function Login() {
    return (
        <Form
            title={'Рады видеть!'}
            type={'signin'}
            button={'Войти'}
            text={`Еще не зарегистрированы? `}
        />
    );
};

export default Login;