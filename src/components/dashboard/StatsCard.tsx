type StatsCardProps = {
  Icon: React.ElementType;
  label: string;
  number: number;
  subtext: string;
  iconBg: string;
  iconColor: string;
  trendColor: string;
};

const StatsCard = ({
  Icon,
  label,
  number,
  subtext,
  iconBg,
  iconColor,
  trendColor,
}: StatsCardProps) => {
  return (
    <div className="w-full flex flex-col justify-between p-4 md:p-6 rounded-md border shadow-sm hover:shadow-md transition cursor-pointer min-h-[180px] bg-white">
      <div className="flex items-start gap-8">
        <div
          className={`flex items-center justify-center p-4 md:p-2 border rounded-md ${iconBg} ${iconColor}`}
        >
          <Icon/>
        </div>
        <div>
          <p className="text-lg md:text-base">{label}</p>
          <p className="text-3xl font-semibold mt-2">{number}</p>
        </div>
      </div>
      <p className={`text-gray-800 text-sm ${trendColor}`}>{subtext}</p>
    </div>
  );
};

export default StatsCard;
