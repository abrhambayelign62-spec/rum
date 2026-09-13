export function generateGoogleCalendarUrl(
  title: string,
  details: string,
  location: string,
  startDateISO: string,
  endDateISO: string
): string {
  const formatTime = (iso: string) =>
    new Date(iso).toISOString().replace(/-|:|\.\d\d\d/g, '');

  const start = formatTime(startDateISO);
  const end = formatTime(endDateISO);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details,
    location: location,
    dates: `${start}/${end}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(
  title: string,
  description: string,
  location: string,
  startDateISO: string,
  endDateISO: string
) {
  const formatTime = (iso: string) =>
    new Date(iso).toISOString().replace(/-|:|\.\d\d\d/g, '');

  const start = formatTime(startDateISO);
  const end = formatTime(endDateISO);
  const now = formatTime(new Date().toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//YeneSerg//Wedding Invitation//AM',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${Date.now()}@yeneserg.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Adane_and_Bitaniya_Wedding.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
