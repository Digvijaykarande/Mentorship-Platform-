"use client";

export default function SummaryCards({
  cards = [],
  columns = "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  onCardClick = null,
  className = "",
}) {
  return (
    <div className={`grid gap-4 ${columns} ${className}`}>
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key || card.id}
            onClick={() => onCardClick && onCardClick(card)}
            className={`
              rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm 
              transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
              dark:border-slate-800 dark:bg-slate-950
              ${onCardClick ? 'cursor-pointer' : ''}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>

                {card.description && (
                  <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
                    {card.description}
                  </p>
                )}
              </div>

              {Icon && (
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${card.iconBg || 'bg-blue-50 dark:bg-blue-500/10'}`}
                >
                  <Icon
                    className={`h-4 w-4 ${card.iconColor || 'text-blue-600 dark:text-blue-400'}`}
                    strokeWidth={2}
                  />
                </div>
              )}
            </div>

            {/* Value */}
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {card.value}
              </span>

              {card.suffix && (
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {card.suffix}
                </span>
              )}
            </div>

            {/* Footer */}
            {(card.badgeText || card.trend || card.subtext) && (
              <div className="mt-2.5 flex items-center gap-1.5">
                {card.badgeText && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      card.trendType === "negative"
                        ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                        : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    }`}
                  >
                    {card.badgeText}
                  </span>
                )}

                {card.trend && !card.badgeText && (
                  <span
                    className={`text-[10px] font-semibold ${
                      card.trendType === "negative"
                        ? "text-red-600 dark:text-red-400"
                        : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {card.trend}
                  </span>
                )}

                {card.subtext && (
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    {card.subtext}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}