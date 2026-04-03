import { cn } from '@/lib/utils';
import { TextBoxProps } from '@/types';

const Textbox = ({ title, desc, className }: TextBoxProps) => {
  return (
    <div className="py-2 w-full space-y-2">
      <h3 className={cn('title-text', className)}>{title}</h3>
      <p className="desc-text text-[11px]">{desc}</p>
    </div>
  );
};

export default Textbox;
