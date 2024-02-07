import React, { FC } from 'react';
import { Input } from '../../ui/Input';

interface ConversationInputProps {}

const ConversationInput: FC<ConversationInputProps> = ({}) => {
  return (
    <div className='h-[10svh] flex items-center'>
      <Input />
    </div>
  );
};

export default ConversationInput;
