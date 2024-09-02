import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

function GoogleOAuthLogin() {
    const responseMessage = (response: CredentialResponse) => {
        console.log(response);
    };
    const errorMessage = () => {
        console.error('Google Login Failed!');
    };
    return (
        <div className='flex items-center justify-center bg-white p-3 m-2'>
            <GoogleLogin 
            onSuccess={responseMessage} 
            onError={() => errorMessage} 
            />
        </div>
    )
}

export default GoogleOAuthLogin
