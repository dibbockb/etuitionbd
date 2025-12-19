import { Fade } from 'react-awesome-reveal';
import '../../App.css';

const Loading = () => {
  return (

    <Fade> <div className="flex flex-col items-center justify-center gap-5 min-h-[550px]">
      <div className="loader"></div>
    </div></Fade>

  );
};

export default Loading;