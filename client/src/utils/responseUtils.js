function groupByDate(data) {
  return data.reduce((acc, obj) => {
    const date = obj.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(obj);
    return acc;
  }, {});
}

export { groupByDate };
