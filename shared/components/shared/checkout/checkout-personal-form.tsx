import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';
import { Checkbox } from '../../ui';


interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {

  return (
    
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <Checkbox required></Checkbox>
        <label htmlFor="">Я ознакомлен и согласен с <a href='https://btgp.ru/images/new_site/test_dpl/PersonalData/PersonalData.pdf'>политикой обработки персональных данных</a></label>
        <FormInput name="firstName" className="text-base" placeholder="Имя" />
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" />
        <FormInput name="email" className="text-base" placeholder="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Телефон" />
      </div>
    </WhiteBlock>
  );
};
