import { useForm } from 'react-hook-form';
import * as AuthService from '../services/auth-service';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
    const { register, handleSubmit, setError, reset, formState: { errors, isValid } } = useForm({ mode: 'all' });
    const navigate = useNavigate();

    const handleUserRegister = async (user) => {
        try {
            user = await AuthService.register(user);
            console.log(user);
            reset();
            navigate('/login');
        } catch (error) {
            const { status } = error;
            if (status === 400) {
                const { errors: serverErrors, message } = error.response?.data || {};
                console.error(serverErrors);
                console.error(message);

                if (serverErrors) {
                    Object.keys(serverErrors).forEach((inputName) => {
                        setError(inputName, {
                            type: 'custom',
                            message: serverErrors[inputName]
                        });
                    });
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleUserRegister)}>
            <div className='input-group mb-1'>
                <span className='input-group-text'><i className='fa fa-user fa-fw'></i></span>
                <input type='text' className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder='Name' {...register('name', { required: 'User name is required' })} />
                {errors.name && (<div className='invalid-feedback'>{errors.name.message}</div>)}
            </div>

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
                <button className='btn btn-primary' type='submit'>Register</button>
                <hr className='m-0' />
                <Link className='btn btn-secondary' type='button' to='/login'>Login</Link>
            </div>


        </form>
    )
}

export default RegisterForm;