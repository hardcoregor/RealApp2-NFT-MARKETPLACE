import React, { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import web3 from 'web3';

import { NFTContext } from '../context/NFTContext';
import images from '../assets';
import Button from './Button';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0: return '/';
      case 1: return '/listed-nfts';
      case 2: return '/my-nfts';
      default:
        break;
    }
  };

  return (
    <ul className={`list-none flexCenter flex-row ${isMobile && 'flex-col h-full'}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTs'].map((item, i) => (
        <li
          key={i}
          onClick={() => {
            setActive(item);

            if (isMobile) {
              // eslint-disable-next-line no-undef
              setIsOpen(false);
            }
          }}
          className={isMobile ? `flex flex-row items-center font-poppins font-semibold mx-3 text-4xl mb-8 ${active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2 '}

          ` : `flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2 '}
          `}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

// eslint-disable-next-line no-shadow
const ButtonGroup = ({ setActive, router, isMobile, setIsOpen }) => {
  const { connectWallet, currentAccount, network, isMetaMaskInstalled } = useContext(NFTContext);

  return isMetaMaskInstalled ? (currentAccount ? (
    network ? (
      <Button
        btnName="Create"
        classStyles={isMobile ? 'mx-2 rounded-xl text-2xl' : 'mx-2 rounded-xl'}
        handleClick={() => {
          setActive('');
          if (isMobile) {
            setIsOpen(false);
          }
          router.push('/create-nft');
        }}
      />
    ) : (
      <Button
        btnName="SWITCH TO GOERLI"
        classStyles={isMobile ? 'mx-2 rounded-xl text-2xl' : 'mx-2 rounded-xl'}
        handleClick={() => {
          setActive('');
          if (isMobile) {
            setIsOpen(false);
          }
          router.push('/create-nft');
        }}
      />
    )
  ) : (
    <Button
      btnName="Connect"
      classStyles={isMobile ? 'mx-2 rounded-xl text-2xl' : 'mx-2 rounded-xl'}
      handleClick={connectWallet}
    />
  ))
    : (
      <div className="items-center bg-success-color rounded-xl py-2 text-sm">
        <a className="minlg:text-lg px-6 minlg:px-8 font-poppins font-semibold text-white" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="blank">Install MetaMask</a>
      </div>
    );
};

const checkActive = (active, setActive, router) => {
  switch (router.pathname) {
    case '/':
      if (active !== 'Explore NFTs') setActive('Explore NFTs');
      break;
    case '/listed-nfts':
      if (active !== 'Listed NFTs') setActive('Listed NFTs');
      break;
    case '/my-nfts':
      if (active !== 'My NFTs') setActive('My NFTs');
      break;
    case '/create-nft':
      setActive('');
      break;

    default:
      setActive('');
  }
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('Explore NFTs');
  // eslint-disable-next-line no-shadow
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { // REFRESH EVERY TIME WHEN CHANGE CHAIN OR WALLET
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  useEffect(() => {
    setTheme('dark');
  }, []);

  useEffect(() => {
    checkActive(active, setActive, router);
  }, [router.pathname]);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b
dark:bg-nft-dark
bg-white
dark:border-nft-black-1
border-nft-gray-1"
    >
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/">
          <div className="flexCenter md:hidden cursor-pointer" onClick={() => setActive('')}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">Flipster</p>
          </div>
        </Link>
        <Link href="/">
          <div className="hidden md:flex" onClick={() => setIsOpen(false)}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label htmlFor="checkbox" className="flexBetween w-8 h-4 dark:bg-white bg-black rounded-2xl p-1 relative label cursor-pointer">
            <i className="fas fa-sun" style={{ color: 'white' }} />
            <i className="fas fa-moon" style={{ color: 'black' }} />
            <div className="w-3 h-3 absolute dark:bg-black bg-white rounded-full ball" />
          </label>
        </div>

        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-2">
        {isOpen
          ? (
            <Image
              src={images.cross}
              objectFit="contain"
              width={20}
              height={20}
              alt="close"
              onClick={() => setIsOpen(false)}
              className={theme === 'light' ? 'filter invert' : ''}
            />
          )
          : (
            <Image
              src={images.menu}
              objectFit="contain"
              width={25}
              height={25}
              alt="menu"
              onClick={() => setIsOpen(true)}
              className={theme === 'light' ? 'filter invert' : ''}
            />
          )}
        {isOpen && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col">
            <div className="flex-1 p-4 ">
              <MenuItems active={active} setActive={setActive} isMobile setIsOpen={setIsOpen} />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1 flex justify-center">
              <ButtonGroup setActive={setActive} router={router} isMobile setIsOpen={setIsOpen} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
