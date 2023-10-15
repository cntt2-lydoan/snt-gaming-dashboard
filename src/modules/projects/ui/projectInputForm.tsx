import React from 'react';
import { Input } from '@rebass/forms';
import { Text } from 'rebass';

export interface IProps {
    name: string
    placeholder: string
    type: string
    value: string
    onBlur: {
        (e: React.FocusEvent<string | string[], Element>): void;
        <T = string | string[]>(fieldOrEvent: T): T extends string ? (e: string | string[]) => void : void;
    }
    onChange:  {
        (e: React.ChangeEvent<string | string[]>): void;
        <T_1 = string | React.ChangeEvent<string | string[]>>(field: T_1):
        T_1 extends React.ChangeEvent<string | string[]> ? void : (e: string | React.ChangeEvent<string | string[]>) => void;
    }
    variant: string,
    touched?: boolean
    error?: {[key: string]: string}
}

export const ProjectInputForm : React.FC<IProps> = ({
    name, placeholder, type, value, onBlur, onChange, variant, touched, error
    }) => {
    return (
        <>
             <Input name={name}
            placeholder={placeholder}
            type={type}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            variant={variant}/>
            {touched && (
                <Text
                  variant='text_validate'
                >
                  {error?.[name]}
                </Text>
              )}
        </>
    );
}

