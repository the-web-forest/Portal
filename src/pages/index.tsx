import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Settings from '../infra/core/settings';
import { LoginForm } from '../sections/signin/LoginForm';
import styles from '../styles/Signin.module.scss';

const Signin: NextPage = () => (
  <div className={styles.container}>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            easings: 'easeIn',
            delay: 0.4,
            duration: 1,
          },
        },
      }}
      className={styles.loginForm}
    >
      <LoginForm />
    </motion.div>
    <motion.div
      animate="left"
      variants={{
        left: {
          x: '100%',
          boxSizing: 'border-box',
          transition: {
            easings: 'easeIn',
            delay: 0.2,
            duration: 1,
          },
        },
      }}
      className={styles.background}
    />
  </div>
);

export default Signin;
