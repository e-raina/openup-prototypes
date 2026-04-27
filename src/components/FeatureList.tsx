import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

export type Feature = {
  icon: ComponentType<LucideProps>;
  title: string;
  description: ReactNode;
};

type Props = {
  features: Feature[];
  className?: string;
};

export function FeatureList({ features, className = "" }: Props) {
  return (
    <div
      className={`bg-orange-100 rounded-2xl px-6 py-5 divide-y divide-orange-200 ${className}`}
    >
      {features.map((feature, i) => (
        <FeatureItem key={i} {...feature} />
      ))}
    </div>
  );
}

function FeatureItem({ icon: Icon, title, description }: Feature) {
  return (
    <div className="flex items-start gap-4 py-4 first:pt-2 last:pb-2">
      <Icon className="size-6 text-green-700 shrink-0 mt-0.5" strokeWidth={1.75} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-800 leading-tight">{title}</p>
        <p className="text-sm font-medium text-slate-700 mt-1 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}
