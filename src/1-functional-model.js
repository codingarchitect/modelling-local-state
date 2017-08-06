import Result from 'folktale/result';

class InsufficentFunds extends Error {
  get name() { return 'InsufficentFunds' }
}

function withdraw(balance, amount) {
  if (balance >= amount) {
    return Result.Ok(balance - amount);
  } else {
    return Result.Error(new InsufficentFunds(`You do not have enough balance, Current balance is ${balance}`));
  }
}
let currentBalance = withdraw(100, 10).value
console.log(currentBalance);
console.log(withdraw(currentBalance, 100).value);