class ParamsBuilder {
  static period(req) {
    let paramList = [];
    for (let i = 0; i < 3; i++) {
      paramList.push(req.query.startDate);
      paramList.push(req.query.endDate);
      paramList.push(req.userId);
    }
    return paramList;
  }

  static range(req, dates) {
    let paramList = [];
    for (let i = 0; i < dates.length; i++) {
      paramList.push(dates[i]);
      paramList.push(req.userId);
    }
    return paramList;
  }

  static rangeYear(req) {
    let paramList = [];
    for (let i = 0; i < 12; i++) {
      paramList.push(req.query.year);
      paramList.push(req.userId);
    }
    return paramList;
  }
}

export default ParamsBuilder;
