import { FC } from "react";
import styles from './styles.module.scss';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useScreen } from "../../../providers/screen";
import { SignupSuccessicon } from "../../../components/SignupSuccessIcon";
import styled from "styled-components";

const IconWrapper = styled.div`
  position: absolute;
  right: -65px;
  bottom: -40px;

  @media (max-width: 750px) {
    right: -5px;
    > svg {
      width: 100px;
    }
  }
`;

export const SignupSuccessBox: FC = () => {
  const { isMobile } = useScreen();
  return (
    <div className={styles.container} style={{
      width: isMobile ? '90%' : '600px'
    }}>
      <AiOutlineCheckCircle color="#63AF53" style={{ width: "75px", height: "75px" }}/>
      <h2 style={{ marginTop: "20px"}}>Cadastro efetuado</h2>
      <h2>confira seu e-mail!</h2>

      <span style={{ marginTop: "20px"}}>Enviamos uma confirmação</span>
      <span>de validação no seu email.</span>
      <IconWrapper>
        <SignupSuccessicon />
      </IconWrapper>
    </div>
  )
}