const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const { country, users, percent } = payload[0].payload;

  return (
    <div className="bg-primaryDeep shadow-lg rounded-xl px-4 py-2">
      <p className="text-xs text-white">{country}</p>
      <p className="text-sm font-semibold text-white">
        {users} users ({(percent * 100).toFixed(0)}%)
      </p>
    </div>
  );
};

export default CustomTooltip;
