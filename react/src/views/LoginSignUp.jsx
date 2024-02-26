import {   useState} from 'react'
import './LoginSignUp.css';
import   Logo1  from '../assets/img1.svg';
import  Logo2  from '../assets/calandar.png';
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import toast from "react-hot-toast";
import LanguageSelector from '../components/LanguageSelector.jsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useEffect } from "react";

const LoginSignUp = () => {
    function generateSecurePassword(length = 16) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}:\"<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }
    const[user,setUsergOOGLE]= useState({});
    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token:", response.credential);
        var userObject = jwtDecode(response.credential); 
        console.log( userObject);
        setUsergOOGLE(userObject)
        console.log(user.name)
        const payload = {
            name: userObject.name, // Make sure these match the fields expected by your backend
            email: userObject.email,
            uid: userObject.sub, // Google's unique ID for the user, if needed
        };
        console.log("user is ",payload)
        axiosClient.post('/checkAndAddGoogleUser', payload)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token);
            toast.success('Thanks for signup Done');
            console.log("le role est",data.user.role)
            // Save the user ID and role in localStorage
            localStorage.setItem('userId', String(data.user.id));
            localStorage.setItem('userRole', String(data.user.role));
    
            // Redirect based on user role
            if (data.user.role === 'admin') {
                navigate('/rooms'); // Adjust the path as needed
            } else {
                navigate('/tasksUser'); // Adjust the path as needed
            }
        })
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422) {
                toast.error(response.data.message);
            }
        });
 
    }
    
   useEffect(()=>{
   google.accounts.id.initialize({
    client_id: "36930002908-v0vrk0ekcmt4g6op5ptn88bh5pat3c2u.apps.googleusercontent.com",
    callback: handleCallbackResponse
   });

   google.accounts.id.renderButton(
    document.getElementById("signInDiv"),
    {
        theme: "outline",size: "large"
    }
   )
   },[]);
    const navigate = useNavigate();
  
    const { t } = useTranslation();


    let [togel, setTogel] = useState('');
    const handelchangeIn=()=>{
      setTogel(togel='')
    }
    const handelchangeUp=()=>{
      setTogel(togel='sign-up-mode')
    }



    const  [email , setemail ] = useState('')
    const  [password , setpassword ] = useState('')

    const { setUser, setToken } = useStateContext()

    const  [emailR , setemailR ] = useState('')
    const  [passwordR , setpasswordR ] = useState('')
    const  [conpassword , setconpassword ] = useState('')
    const  [name , setname ] = useState('')


    const submithandler =(e)=>{
        e.preventDefault()

        const payload = {
            email: email,
            password: password,
        }
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUser(data.user)
                setToken(data.token);
                // Stockez l'ID de l'utilisateur dans localStorage
                localStorage.setItem('userId', String(data.user.id));
                   // Stockez le role  de l'utilisateur dans localStorage
                   localStorage.setItem('userRole', String(data.user.role));

                // Récupérez l'ID de l'utilisateur depuis localStorage pour l'afficher
                const userId = localStorage.getItem('userId');
                const userrole = data.user.role;
                console.log("Le user ID est: " + userId);
                console.log("Le user Role est: " + userrole);
                toast.success('Thanks')
                if (userrole === 'admin') {
                    
                    navigate('/rooms'); // Adjust the path as needed
                } else {
                    console.log("trueeeee")
                    navigate('/tasksUser'); // Adjust the path as needed
                }

            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    toast.error(response.data.message)

                }
            })
    }

    const submithandlerR =(e)=>{
      e.preventDefault()
      if (passwordR !== conpassword){

          toast.error('password do not match')
      }
      else{
          const payload = {
              name: name,
              email: emailR,
              password: passwordR,
              password_confirmation: conpassword,
          }
          console.log("user is ",payload)
          axiosClient.post('/signup', payload)
              .then(({data}) => {
                  setUser(data.user)
                  setToken(data.token);
                  toast.success('Thanks for signup Done')
              })
              .catch(err => {
                  const response = err.response;
                  if (response && response.status === 422) {
                      toast.error(response.data.message)
                  }
              })
      }

    }


     return (

                
             <div className={`container_log ${togel}`}>
                    <LanguageSelector />
                 <div className="forms-container_log">



                     <div className="signin-signup">
                    
                         <form onSubmit={submithandler} className="sign-in-form">
                             <h2 className="title">{t('Sign in')}</h2>

                             <div className="input-field">
                                 <i className="fas fa-user" />
                                 <input type="email"  placeholder={t('E-mail')}  value={email} onChange={(e)=>setemail(e.target.value)}/>
                             </div>
                             <div className="input-field">
                                 <i className="fas fa-lock" />
                                 <input type="password" placeholder={t('Password')}  value={password} onChange={(e)=>setpassword(e.target.value)} />
                             </div>
                             <input type="submit" value={t('login')} className="btn_log solid" />
                             <div id="signInDiv"></div>
                         </form>
                         <div className='max-w-[240px] m-auto py-4'>
                             
                        </div>


                        
                         <form  onSubmit={submithandlerR} className="sign-up-form">
                             <h2 className="title">{t('Sign up')}</h2>
                             
                            
                          

                             <div className="input-field">
                                 <i className="fas fa-user" />
                                 <input type="text" placeholder={t('Username')} value={name} onChange={(e)=>setname(e.target.value)} />
                             </div>
                             <div className="input-field">
                                 <i className="fas fa-envelope" />
                                 <input type="email" placeholder={t('E-mail')} value={emailR} onChange={(e)=>setemailR(e.target.value)} />
                             </div>

                             <div className="input-field">
                                 <i className="fas fa-lock" />
                                 <input type="password" placeholder={t('Password')} value={passwordR} onChange={(e)=>setpasswordR(e.target.value)} />
                             </div>

                             <div className="input-field">
                                 <i className="fas fa-lock" />
                                 <input type="password" placeholder={t('ConfirmPassword')} value={conpassword} onChange={(e)=>setconpassword(e.target.value)} />
                             </div>
                             <input type="submit" className="btn_log" value={t('login')} />
                            
                         </form>
                         


                     </div>
                 </div>
                 <div className="panels-container_log">
                     <div className="panel left-panel">
                     
                         { /*<div className="home_log">
            <Link to="/"><Icon color='black' name='home'/></Link>
              </div>*/}
                         <div className="content">
                            
                             <p>
                                 
                                    {t('Click Sign up to Add an account.')}
                             </p>
                             <button className="btn_log transparent" id="sign-up-btn_log" onClick={handelchangeUp}>
                                 {t('Sign up')}
                             </button>

                         </div>
                         <div className="image">
                             <img src={Logo2} style={{ marginTop: '-50px'}}/>
                         </div>
                     </div>
                     <div className="panel right-panel">
                         <div className="content">
                             <h3>{t('who we are ?')}</h3>
                             <p>
                             {t('TAC-TIC is an IT and telecommunications engineering company. We are a recognized leader in terms of providing IP/MPLS network services in the telecommunications industry in Tunisia.')}
                             </p>
                             <button className="btn_log transparent" id="sign-in-btn_log" onClick={handelchangeIn}>
                                {t('Sign in')}
                             </button>
                         </div>
                         <div className="image">
                             <img src={Logo1}/>
                         </div>
                     </div>
                 </div>
             </div>


    )
}

export default LoginSignUp
