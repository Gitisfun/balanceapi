import pool from "../database/config.js";
import responseHandler from "../logic/responseHandler.js";

class Pagination {
  static validateData(request, sortFields) {
    // Parameters
    // ----------
    // 1) Sort parameters
    // 2) Search parameters
    // 3) Pagination parameters
    // ----------

    // 1) Search parameters

    const searchField = this.validateSearch(request);

    // 2) Sort parameters

    const sortField = this.validateSortFields(request, sortFields);
    const sortOrder = this.validateSortOrder(request);

    // 3) Pagination parameters

    const limit = this.validateLimit(request);
    const offset = this.validateOffset(request, limit);
    const page = this.validatePage(request);

    return {
      searchField,
      sortField,
      sortOrder,
      limit,
      offset,
      page,
    };
  }

  static validateSearch(request) {
    if (typeof request.search === "undefined") {
      return "";
    }
    return request.search;
  }

  static validateSortFields(request, sortFields) {
    for (let i = 0; i < sortFields.length; i++) {
      if (sortFields[i].includes(request.sort_by)) {
        return sortFields[i];
      }
    }
    return sortFields[0];
  }

  static validateSortOrder(request) {
    if (typeof request.sort_order === "undefined" || typeof request.sort_order !== "string") {
      return "ASC";
    } else if (!(request.sort_order.toUpperCase() === "ASC" || request.sort_order.toUpperCase() === "DESC")) {
      return "ASC";
    }
    return request.sort_order.toUpperCase();
  }

  static validateLimit(request) {
    // TODO: Change limit max here 1000 should be lower
    if (typeof request.limit === "undefined" || Number.isNaN(parseInt(request.limit)) || parseInt(request.limit) < 2 || parseInt(request.limit) > 1000) {
      return 10;
    }
    return parseInt(request.limit);
  }

  static validateOffset(request, limit) {
    if (typeof request.page === "undefined" || Number.isNaN(parseInt(request.page)) || parseInt(request.page) < 1) {
      return 0;
    }
    return (parseInt(request.page) - 1) * limit;
  }

  static validatePage(request) {
    if (typeof request.page === "undefined" || Number.isNaN(parseInt(request.page)) || parseInt(request.page) < 1) {
      return 1;
    }
    return parseInt(request.page);
  }

  static queryHandler(queryOne, queryParams, paramListOne, queryTwo, paramListTwo, response, next) {
    pool.query(queryOne(queryParams.sortField, queryParams.sortOrder), paramListOne, (err, results) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        this.queryCount(queryTwo, queryParams, paramListTwo, results, response, next);
      }
    });
  }

  static queryCount(query, queryParams, paramList, dataList, response, next) {
    pool.query(query(), paramList, (err, dataCount) => {
      const results = {};
      if (!err) {
        results.list = dataList;
        results.total = dataCount[0].total;

        const page = queryParams.page;
        const limit = queryParams.limit;
        results.pages = Math.ceil(dataCount[0].total / limit);
        results.limit = queryParams.limit;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        if (startIndex > 0) {
          results.previous = {
            page: page - 1,
            limit: limit,
          };
        }

        if (endIndex < results.total) {
          results.next = {
            page: page + 1,
            limit: limit,
          };
        }
      }

      responseHandler(err, results, response, next);
    });
  }
}

export default Pagination;
