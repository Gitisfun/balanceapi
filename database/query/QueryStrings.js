class QueryStrings {
  static all(fields, sort_field, sort_order) {
    return this.filtering(fields) + this.sorting(sort_field, sort_order) + this.pagination();
  }

  static filtering(fields) {
    let QUERY = "AND concat(";
    for (let i = 0; i < fields.length; i++) {
      QUERY += `${fields[i]}`;
      if (i < fields.length - 1) {
        QUERY += ", ";
      }
    }
    QUERY += ") LIKE concat('%', ?, '%') ";
    return QUERY;
  }

  static sorting(field, order) {
    return `ORDER BY ${field} ${order} `;
  }

  static pagination() {
    return "LIMIT ? OFFSET ? ";
  }
}

export default QueryStrings;
