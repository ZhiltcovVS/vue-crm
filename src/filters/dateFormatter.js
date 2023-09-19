function dateFormatter(value, format = 'date') {
  const options = {};

  // Определение формата value
  const isFullDate = /^\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT\+\d{4}/.test(value);

  if (isFullDate || format.includes('date')) {
    options.day = 'numeric';
    options.month = 'short';
  }

  if (isFullDate || format.includes('time')) {
    if (format.includes('NoSec')) {
      options.hour = 'numeric';
      options.minute = 'numeric';
    } else {
      options.hour = 'numeric';
      options.minute = 'numeric';
      options.second = 'numeric';
    }
  }

  // Если value в формате "гггг-мм-дд", преобазуем в Date
  const date = isFullDate ? new Date(value) : new Date(Date.parse(value));

  return date.toLocaleString('ru-RU', options);
}

export default dateFormatter;
