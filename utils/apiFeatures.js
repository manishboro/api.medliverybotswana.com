class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.page = queryString.page * 1 || 1; // Pageno; converting a string to an integer
    this.pageSize = async () => query.countDocuments(); // No of docs in a page
  }

  filter() {
    const queryObj = { ...this.queryString }; // storing the copy of req.copy object in query variable using destructuring
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj); // converting 'queryObj' into a string and storing it in 'queryStr'
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr)); // converting 'queryStr' string into a javascript object and sstoring the query in 'query' variable

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" "); //splitting the query object by comma and adding a space instead of comma
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const selectBy = this.queryString.fields.split(",").join(" "); //splitting the query object by comma and adding a space instead of comma
      this.query = this.query.select(selectBy);
    } else {
      this.query = this.query.select("-__v"); //displaying all the fields except the '__v'
    }

    return this;
  }

  paginate() {
    const limit = this.queryString.limit * 1 || 5; // converting a string to an integer
    const skip = (this.page - 1) * limit; // formula derived from below explanation

    this.query = this.query.skip(skip).limit(limit); // page3 and limit=10 : page1 - 1 to 10, page2 - 11 to 20, page3 - 21 to 30 and so on

    return this;
  }
}

module.exports = APIFeatures;
