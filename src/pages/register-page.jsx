import Jumbotron from '../components/ui/jumbotron/jumbotron';
import RegisterForm from '../components/register-form';

function RegisterPage() {
    return (
        <div className='register-page-wrapper'>
            <div className='register-overlay'>

                <div className='register-content'>
                    <Jumbotron
                        title='Regístrate'
                        subtitle='Crea tu cuenta para ver detalles de viviendas'
                    >
                        <div className='mt-4'>
                            
                                <div className='login-form-card'>
                                    <RegisterForm />
                                </div>
                            
                        </div>
                    </Jumbotron>
                </div>
            </div>
        </div>
    );
}
export default RegisterPage;


