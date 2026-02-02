import './jumbotron.css';

function Jumbotron({ title, subtitle, children }) {

    return (

        <div className='jumbotron container'>

            <div className='container h-100 d-flex flex-column gap-1 justify-content-center'>
                {title && (
                    <h1 className='mb-0' style={{ fontSize: '3rem' }}>
                        {title}
                    </h1>
                )}
                {subtitle && (
                    <p className='mb-0' style={{ fontSize: '1.5rem' }}>
                        {subtitle}
                    </p>
                )}
                {children}
            </div>
        </div>
    );
}

export default Jumbotron; 

