
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrendCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number | {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

const TrendCard: React.FC<TrendCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  className = '',
  valuePrefix = '',
  valueSuffix = '',
}) => {
  // Parse trend data - handles both number and object formats
  const trendValue = typeof trend === 'object' ? trend?.value : trend;
  const isPositive = typeof trend === 'object' 
    ? trend?.isPositive 
    : trend !== undefined ? trend >= 0 : undefined;

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-5 w-5 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{valuePrefix}{value}{valueSuffix}</div>
        {trend !== undefined && (
          <div className="flex items-center space-x-1">
            <span
              className={`flex items-center text-xs ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {isPositive ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {Math.abs(typeof trendValue === 'number' ? trendValue : 0)}%
            </span>
            {description && (
              <span className="text-xs text-muted-foreground">{description}</span>
            )}
          </div>
        )}
        {trend === undefined && description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendCard;
