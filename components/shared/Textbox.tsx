import { TextBoxProps } from '@/types';

const Textbox = ({ title, desc }: TextBoxProps) => {
  return (
    <div className="py-2 w-full space-y-2">
      <h3 className="title-text">{title}</h3>
      <p className="desc-text text-xs">{desc}</p>
    </div>
  );
};

export default Textbox;
