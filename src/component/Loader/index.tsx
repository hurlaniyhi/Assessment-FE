import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from  'react-loader-spinner'
import './style.scss'

export const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <div className='loader-wrapper'>
                <TailSpin 
                    color="#0D968F" 
                    height={80} 
                    width={80} 
                />
            </div>
        </div>
    )
}