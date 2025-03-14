
import { motion } from "framer-motion";
import AuthForm from "@/components/Auth/AuthForm";

const Auth = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-10">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-50 transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-3xl opacity-50 transform translate-y-1/3"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto mb-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Welcome to DataStream</h1>
        <p className="text-muted-foreground">Your gateway to financial intelligence</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full max-w-md"
      >
        <AuthForm />
      </motion.div>
    </div>
  );
};

export default Auth;
