const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

const toMonths = (date: string) =>
  Number(date.slice(0, 4)) * 12 + Number(date.slice(5, 7)) - 1;

const thisMonth = () => {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
};

export type Period = {
  startDate: string;
  endDate?: string;
  current?: boolean;
};

export const formatMonth = (date?: string) =>
  date ? monthYear.format(new Date(date)) : '';

export const formatRange = ({ startDate, endDate, current }: Period) =>
  `${formatMonth(startDate)} – ${current ? 'Present' : formatMonth(endDate)}`;

const span = ({ startDate, endDate, current }: Period) =>
  Math.max(
    (current || !endDate ? thisMonth() : toMonths(endDate)) -
      toMonths(startDate) +
      1,
    1,
  );

function label(months: number) {
  const years = Math.floor(months / 12);
  const rest = months % 12;

  return [
    years > 0 && `${years} yr${years > 1 ? 's' : ''}`,
    rest > 0 && `${rest} mo${rest > 1 ? 's' : ''}`,
  ]
    .filter(Boolean)
    .join(' ');
}

export const tenure = (periods: Period[]) =>
  label(periods.reduce((total, period) => total + span(period), 0));

export function totalSpan(periods: Period[]) {
  const starts = periods.map((period) => period.startDate).sort();
  const open = periods.some((period) => period.current || !period.endDate);
  const ends = periods
    .map((period) => period.endDate)
    .filter((date): date is string => Boolean(date))
    .sort();

  return label(
    (open ? thisMonth() : toMonths(ends[ends.length - 1])) -
      toMonths(starts[0]) +
      1,
  );
}

export const latestStart = (periods: Period[]) =>
  periods.map((period) => period.startDate).sort()[periods.length - 1];
