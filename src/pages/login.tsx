import ParticlesBackground1 from "../components/background_particles/background_particles_1";
import LoginForm from "../components/login_form/login_form";

function Login() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
      <ParticlesBackground1 />
      <div className="z-10">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
