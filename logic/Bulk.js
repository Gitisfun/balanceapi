class Bulk {
  static createTransactionProducts(list, IDs) {
    let result = [];

    for (let i = 0; i < list.length; i++) {
      let temp = [];

      temp.push(list[i].productId);
      temp.push(IDs.transactionId);
      temp.push(list[i].price);
      temp.push(list[i].amount);
      temp.push(list[i].weight);
      temp.push(IDs.userId);
      result.push(temp);
    }

    return result;
  }
}

export default Bulk;
