
import ImageSection from './Components/ImageSection';
import SignUpForm from './Components/SignUpForm';

const CreateAccount = () => {
  return (
    <div className="min-h-screen bg-white flex">
      <ImageSection />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <SignUpForm />
      </div>
    </div>
  );
};

export default CreateAccount;