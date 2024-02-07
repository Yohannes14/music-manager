// src/components/Modal.tsx
import React from 'react';
import styled from '@emotion/styled';
import { IoCloseSharp } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  initialSongId?: string | null
  onClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  width: 35%; 
  top: 2%; 
`;

const CloseButton = styled.button`
    font-family: Poppins;
    font-size: 22px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
    margin-bottom:22px;
    background: none;
    border: none;
    cursor: pointer;
`;
const Header = styled.h1`
    font-family: Poppins;
    font-size: 22px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    color: #000000;
    margin-bottom:22px;
`;
const InnerContainer = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      box-shadow: 0 5px 0 rgba(0, 0, 0, 0.1);
      padding: 20px;
`

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, initialSongId, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <InnerContainer>
          <Header>{initialSongId ? 'Update Song' : 'Add New Song'}</Header>
          <CloseButton onClick={() => onClose()}><IoCloseSharp size={24} /></CloseButton>
        </InnerContainer>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
