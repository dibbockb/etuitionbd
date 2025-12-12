import Lottie from "react-lottie";
import forbiddenAnimation from "../../assets/json/forbidden.json";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 pt-10">
      <Logo />
      <br />
      <div className="flex flex-col items-center justify-center max-w-4xl w-full">
        <div className="hidden md:block">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: forbiddenAnimation,
            }}
            height={400}
            width={400}
          />
        </div>
        <div className="block md:hidden">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: forbiddenAnimation,
            }}
            height={250}
            width={250}
          />
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-red-500 text-center mt-8 md:mt-12 px-4">
          Sorry, You can't access this page
        </h1>

        <div className="mt-15 flex flex-col sm:flex-row gap-1 w-full max-w-md">
          <NavLink
            to="/"
            className="btn btn-ghost btn-lg text-lg flex-1 justify-center"
          >
            <MdOutlineArrowBackIos /> Back to home
          </NavLink>
          <NavLink
            to="/dashboard"
            className="btn btn-ghost btn-lg text-lg flex-1 justify-center"
          >
            Dashboard <MdOutlineArrowForwardIos />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;