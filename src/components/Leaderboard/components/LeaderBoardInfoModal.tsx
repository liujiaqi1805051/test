import { Fragment } from 'react';
import { Modal } from 'components/Modal';
import { useIsMobile } from 'redux/selector/mobile';
import { dispatch, useSelector } from 'redux/store';
import { toggleShowLeaderboardInfo } from 'redux/reducer/info';
import { LeaderboardTextColors } from './LeaderBoardItemText';

interface INormalItem {
  leftText: string;
  reward: number;
}
const NormalItem = ({ leftText, reward }: INormalItem) => {
  return (
    <div
      className={`h-20 mb-2 flex w-full items-center rounded-3xl border border-[#003658] bg-[#81A2D7] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.12),0px_-3px_0px_0px_#6D8EC3_inset]`}>
      <div className="bg-[#4F6C9B] text-white text-lg text-bold font-fonarto rounded-full px-4 py-2 ml-2">
        {leftText}
      </div>
      <div className="flex-grow"></div>
      <div className="w-1/3 h-full flex items-center">
        <img className="h-full p-4" src={require('assets/images/elf.png').default.src} alt="elf" />
        <span className={`text-white text-2xl text-bold`}>{reward} ELF</span>
      </div>
    </div>
  );
};

interface IRankedItem {
  bgClassName: string;
  shadowInsetColor: string;
  src: string;
  reward: number;
  textClassName: string;
}
const RankedItem = ({ bgClassName, shadowInsetColor, src, reward, textClassName }: IRankedItem) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`relative mb-2 flex w-full items-center rounded-2xl border border-[#003658] p-1 shadow-inner before:absolute before:bg-white before:bg-opacity-30 ${
        isMobile
          ? 'h-12 before:h-6 before:left-1 before:right-1 before:top-0 before:rounded-full'
          : 'h-24 before:h-10 before:left-2 before:right-2 before:top-2 before:rounded-2xl'
      } ${bgClassName}`}
      style={{
        boxShadow: `0px 2px 4px 0px rgba(0, 0, 0, 0.12), 0px -3px 0px 0px ${shadowInsetColor} inset`,
      }}>
      <img className="h-full" src={src} alt="rank" />
      <span className="flex-grow"></span>
      <div className="w-1/3 h-full flex items-center">
        <img className="h-full p-4" src={require('assets/images/elf.png').default.src} alt="elf" />
        <span className={`${textClassName} text-4xl text-bold font-fonarto`}>{reward} ELF</span>
      </div>
    </div>
  );
};

type ILeaderBoardInfoModal = React.PropsWithChildren;

export const LeaderBoardInfoModal = ({ children }: ILeaderBoardInfoModal) => {
  const open = useSelector((state) => state.info.showLeaderboardInfo);

  return (
    <Fragment>
      <Modal isOpen={open} title="Leader Board" onClose={() => dispatch(toggleShowLeaderboardInfo())}>
        <div className="flex w-full flex-grow flex-col rounded-2xl bg-blue-400 p-2 pb-2 shadow-inner">
          <div className="rounded-2xl bg-blue-700 p-4 shadow-inner h-full">
            {children}
            <RankedItem
              bgClassName="bg-[#F5BF49]"
              shadowInsetColor=""
              src={require('assets/images/gold.png').default.src}
              reward={100}
              textClassName={LeaderboardTextColors.Gold}
            />
            <RankedItem
              bgClassName="bg-[#CEDFF7]"
              shadowInsetColor=""
              src={require('assets/images/silver.png').default.src}
              reward={80}
              textClassName={LeaderboardTextColors.Silver}
            />
            <RankedItem
              bgClassName="bg-[#E97D3C]"
              shadowInsetColor=""
              src={require('assets/images/bronze.png').default.src}
              reward={50}
              textClassName={LeaderboardTextColors.Bronze}
            />
            <NormalItem leftText="Top 4-15" reward={20} />
            <NormalItem leftText="Top 15-30" reward={10} />
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default LeaderBoardInfoModal;