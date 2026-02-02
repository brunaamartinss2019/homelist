import { useForm } from 'react-hook-form';
import * as AuthService from '../services/auth-service';
import { Link, useNavigate } from 'react-router';
import { useAuth } from './contexts/auth-context';

function LoginForm() {
    const { register, handleSubmit, setError, reset, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleUserLogin = async (user) => {
        try {
            console.log(user);
            user = await AuthService.login(user);
             console.log(user);
            reset();
            login(user);
            navigate('/');
        } catch (error) {
            const { status } = error;
            if (status === 401) {
                const { errors, message } = error.response?.data || {};
                console.error(message);

                Object.keys(errors)
                    .forEach((inputName) => {
                        setError(inputName, { type: 'custom', message: errors[inputName] });
                    });
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleUserLogin)}>

            <div className='input-group mb-1'>
                <span className='input-group-text'><i className='fa fa-envelope fa-fw'></i></span>
                <input type='email' className={`form-control ${errors.mail ? 'is-invalid' : ''}`} placeholder='user@example.com' {...register('email', { required: 'User email is required' })} />
                {errors.email && (<div className='invalid-feedback'>{errors.email.message}</div>)}
            </div>

            <div className='input-group mb-1'>
                <span className='input-group-text'><i className='fa fa-lock fa-fw'></i></span>
                <input type='password' className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder='*****' {...register('password', { required: 'User password is required' })} />
                {errors.password && (<div className='invalid-feedback'>{errors.password.message}</div>)}
            </div>

            <div className='d-grid gap-2 mt-2'>
                <button className='btn btn-primary' type='submit'>Login</button>
                <hr className='m-0' />
                <Link className='btn btn-secondary' type='button' to='/register'>Register</Link>
            </div>


        </form>
    )
}

export default LoginForm;