import { BeatPlayProvider } from './Context';
import { AuthContextProvider } from './authContext/AuthContext';
import { CartContextProvider } from './cartContext/CartContext';

// const providers = [
//    BeatPlayProvider,
//    AuthContextProvider,
//    CartContextProvider,
//  ]

export const AppContextProvider = (children) => {
  return <BeatPlayProvider>
    <AuthContextProvider>
      <CartContextProvider>
        {children}
      </CartContextProvider>
    </AuthContextProvider>
  </BeatPlayProvider>
};