// Percorso: src/pages/AuthenticationPage.jsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RegisterForm from "../components/UInterface/forms/RegisterForm";
import LoginForm from "../components/UInterface/forms/LoginForm";

export default function AuthenticationPage() {
  const [change, setChange] = useState(false);

  const handleClick = () => {
    setChange(!change);
  };


  const fadeVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

      useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="bg-primary min-h-screen flex flex-col items-center justify-start py-30" translate="no">
      <button
        onClick={handleClick}
        className="btn-primary mb-8 rounded-md py-2 px-6 shadow-form hover:shadow-detail transition-all duration-300"
      >
        {change ? "Login" : "Register"}
      </button>

      <div className="w-full flex justify-center">
        <AnimatePresence mode="wait">
          {change ? (
            <motion.div
              key="login"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full mx-10 max-w-md"
            >
              <RegisterForm />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
                
                <LoginForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
