import Jumbotron from '../components/ui/jumbotron/jumbotron';
import LoginForm from '../components/login-form';

function LoginPage() {
    return (
        <div className='login-page-wrapper'>
            <div className='login-overlay'>
                <div className='login-content'>
                    <Jumbotron
                        title='Login'
                        subtitle='Accede à tu cuenta'
                    >
                        <div className='mt-4'>
                            
                                
                                    <div className='login-form-card'>
                                        <LoginForm />
                                

                              
                            </div>
                        </div>
                    </Jumbotron>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;


// function LoginPage() {
//     return (
//         <div className='login-page-wrapper'>
//             <div className='login-overlay'>
//                 <div className='login-content'>
//                     <Jumbotron
//                         title='Login'
//                         subtitle='Accede à tu cuenta'
//                     >
//                         <div className='mt-4'>
//                             <div className='container mt-4 row justify-content-center'>
//                                 <div className='col-md-8 col-lg-6'>
//                                     <LoginForm />
//                                 </div>
//                             </div>
//                         </div>
//                     </Jumbotron>
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default LoginPage;