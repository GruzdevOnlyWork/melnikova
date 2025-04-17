'use client'
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Container } from './conteiner'
import  Image from 'next/image'
import { SearchInput } from './search-input';
import Link from 'next/link';
import { CartButton } from './cart-button';

import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { ProfileButton } from './profile-button';
import { AuthModal } from './modals/auth-modal';


interface Props{
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({hasSearch = true ,hasCart = true ,className}) =>{
    const [openAuthModal , setOpenAuthModal] = React.useState(false);
    const searchParams = useSearchParams();
    React.useEffect (()=>{
        let toastMessage = ''
        if(searchParams.has('paid')){
            toastMessage =('Заказ успешно оплачен! Информация на почте.')
        }
        if(searchParams.has('verified')){
            toastMessage =('Почта успешно подтверждена')
        }

        if(toastMessage){
            setTimeout(()=>{
                toast.success(toastMessage ,{
                    duration:3000,
                })
            } , 500)
        }
    },[])
    return (
        <header className={cn('border-b border-gray-100', className)}>
            <Container className="flex items-center justify-between py-5">
                <Link href={'/'}>
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" width={50} height={50} alt="Logo" />
                        <div>
                        <h1 className="text-2xl uppercase font-black">Мельникова</h1>
                        <p className="text-sm text-gray-400 leading-3">Печет</p>
                        </div>
                    </div>
                </Link>
                
                { hasSearch && <div className='mx-10 flex-1'>
                    <SearchInput></SearchInput>
                </div>}
                <div className=" flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)}></AuthModal> 
                    <ProfileButton onClickSignIn={()=> setOpenAuthModal(true)}></ProfileButton>
                    {hasCart && <div>
                    <CartButton></CartButton>
                </div>}
            </div>
                
            </Container>
        </header>
    )
}