import { Input, Textarea } from "../../ui";
import { FormTextarea } from "../form";
import { WhiteBlock } from "../white-block";
import { AdressInput } from "../adress-input";
import { useFormContext , Controller } from "react-hook-form";
import { ErrorText } from "../error-text";


interface Props{
    className?:string;
}

export const CheckoutAddressForm: React.FC<Props> = ({className}) =>{

    const {control} = useFormContext();
    return (
        <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
                <Controller control={control} name = 'address' render = {({field , fieldState}) =>  <>
                    <AdressInput onChange={field.onChange}/>
                    {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}
                    </>} />
                <FormTextarea  name="comment" className=" text-base" placeholder="Комментарий" rows={5} />
            </div>
        </WhiteBlock>
    )
}