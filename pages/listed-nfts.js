import { useState, useEffect, useContext } from 'react';

import { NFTContext } from '../context/NFTContext';
import { NFTCard } from '../components';

const ListedNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  if(isLoading) {
    return(
      <div className='flexStart min-h-screen'>
        <Loader />
      </div>
    )
  }

  return (

  );
}

export default ListedNFTs;
