import '../../App.css';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[550px]">
      <div className="lds-ellipsis"></div>
    </div>
  );
};

export default Loading;