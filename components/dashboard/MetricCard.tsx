import { cn } from '@/lib/utils';

type MetricCardProps = {
  label: string;
  value: string | number;
  percentage?: number; // e.g. 20 or -10
  className?: string;
};

const MetricCard = ({
  label,
  value,
  percentage,
  className,
}: MetricCardProps) => {
  const isPositive = percentage && percentage > 0;
  const isNegative = percentage && percentage < 0;

  return (
    <div
      className={cn(
        'w-full rounded-sm bg-white p-4 md:p-5 space-y-2',
        'flex flex-col gap-2',
        className,
      )}
    >
      {/* Label */}
      <p className="text-xs font-semibold tracking-wide text-lightGrey uppercase">
        {label}
      </p>

      {/* Value + Percentage */}
      <div className="flex items-center gap-6">
        <h3 className="text-xl md:text-2xl font-semibold text-darkGrey">
          {value}
        </h3>

        {percentage !== undefined && (
          <span
            className={cn(
              'text-xs md:text-sm font-semibold px-2 py-1 rounded-md',
              {
                'text-success': isPositive,
                'text-error': isNegative,
                'text-lightGrey': !isPositive && !isNegative,
              },
            )}
          >
            {percentage > 0 && '+'}
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};
export default MetricCard;
