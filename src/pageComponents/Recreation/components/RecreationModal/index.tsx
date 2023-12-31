import { Modal } from 'antd';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

import lightTreasure from 'assets/base64/lightTreasure';

import styles from './index.module.css';
import useGetState from 'redux/state/useGetState';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import dataAnimation from 'assets/images/animation/treasureBox.json';
import dice1 from 'assets/images/animation/dice1.json';
import dice2 from 'assets/images/animation/dice2.json';
import dice3 from 'assets/images/animation/dice3.json';
import dice4 from 'assets/images/animation/dice4.json';
import dice5 from 'assets/images/animation/dice5.json';
import dice6 from 'assets/images/animation/dice6.json';
import buttonBg from 'assets/base64/buttonBg';

export enum RecreationModalType {
  DICE = 'dice',
  TREASURE = 'treasure',
}

export enum TreasureStatus {
  CLOSE = 'close',
  OPENING = 'Opening',
  OPENED = 'Opened',
}

interface IRecreationModal {
  open: boolean;
  step?: number;
  bean?: number;
  type: RecreationModalType;
  onClose?: () => void;
}

function RecreationModal(props: IRecreationModal) {
  const { open, step, bean, type, onClose } = props;

  const { isMobile } = useGetState();
  const [treasureStatus, setTreasureStatus] = useState<TreasureStatus>(TreasureStatus.OPENED);
  const [openable, setOpenable] = useState<boolean>(true);

  const treasureAnimationRef = useRef<LottieRefCurrentProps | null>(null);
  const diceAnimationRef = useRef<LottieRefCurrentProps | null>(null);

  const dice: Record<string, Record<string, any>> = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
  };

  const openTreasure = () => {
    if (openable) {
      treasureAnimationRef.current?.play();
    }
  };

  useEffect(() => {
    if (!open) {
      setTreasureStatus(TreasureStatus.CLOSE);
      setOpenable(true);
    }
  }, [open]);

  const modalContent: Record<RecreationModalType, ReactElement | null> = {
    [RecreationModalType.DICE]: (
      <div className="w-full h-full flex items-center justify-center">
        <Lottie
          lottieRef={diceAnimationRef}
          loop={false}
          autoplay={true}
          animationData={dice[`${step}`]}
          onComplete={() => {
            onClose && onClose();
          }}
          className={`${isMobile ? 'h-auto w-[90%]' : 'h-auto w-[80%]'}`}
        />
      </div>
    ),
    [RecreationModalType.TREASURE]: (
      <div className="relative z-[80] flex h-auto w-full flex-col items-center justify-center">
        <div className={`relative flex items-center justify-center mt-[100px]`}>
          {treasureStatus === TreasureStatus.OPENED ? (
            <div
              className={`absolute left-0 right-0 z-[40] m-auto ${
                isMobile ? 'h-auto w-[67%] top-[-105%]' : 'h-auto w-[377px] top-[-60%]'
              }`}>
              <img src={lightTreasure} className="relative z-[20] h-full w-full" alt="lightTreasure" />
              <span
                className={`absolute bottom-0 left-0 right-0 font-[900] top-0 z-[30] m-auto flex items-center justify-center text-[#fff] ${
                  isMobile ? 'text-[64px]' : 'text-[96px]'
                }`}>
                +{bean}
              </span>
            </div>
          ) : null}
          <Lottie
            lottieRef={treasureAnimationRef}
            loop={false}
            autoplay={false}
            animationData={dataAnimation}
            onComplete={() => {
              setTreasureStatus(TreasureStatus.OPENED);
            }}
            className={`z-[50] ${isMobile ? 'mt-[-70px] h-auto w-[70%]' : 'mt-[-100px] h-auto w-[520px]'}`}
          />
        </div>
        <button
          style={{
            backgroundImage: `url(${buttonBg})`,
          }}
          className={`${styles['treasure-btn']} ${
            isMobile ? styles['treasure-btn-mobile'] : styles['treasure-btn-pc']
          }`}
          onClick={treasureStatus === TreasureStatus.OPENED ? onClose : openTreasure}>
          <span className="mb-[6.5px] font-fonarto">
            {treasureStatus === TreasureStatus.OPENED ? 'Confirm' : 'OPEN'}
          </span>
        </button>
      </div>
    ),
  };

  return (
    <Modal
      open={open}
      footer={null}
      keyboard={false}
      maskClosable={false}
      closable={false}
      destroyOnClose={true}
      className={styles['recreation-modal']}>
      {open && modalContent[type]}
    </Modal>
  );
}

export default React.memo(RecreationModal);
