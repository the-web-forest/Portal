import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import Settings from '../../infra/core/settings';
import { RecoverPasswordForm } from '../../sections/resend-password/ResendPasswordForm';
import styles from '../../styles/RecoverPassword.module.scss';

const RecoverPassword: NextPage = () => (
  <>
    <Head>
      <title>{`Recuperar senha - ${Settings.APP_NAME}`}</title>
    </Head>
    <div className={styles.container}>
      <motion.div
        initial="right"
        animate="left"
        variants={{
          right: {
            zIndex: 10,
            x: '100%',
          },
          left: {
            zIndex: 10,
            x: '0%',
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
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exitHidden"
        variants={{
          hidden: {
            opacity: 0,
            transition: {
              easings: 'easeIn',
              delay: 0.4,
              duration: 1,
            },
          },
          visible: {
            opacity: 1,
            transition: {
              easings: 'easeIn',
              delay: 0.4,
              duration: 1,
            },
          },
          exitHidden: {
            opacity: 0,
            transition: {
              easings: 'easeIn',
              duration: 0.2,
            },
          },
        }}
        className={styles.form}
      >
        <RecoverPasswordForm />
      </motion.div>
    </div>
  </>
);

export default RecoverPassword;
