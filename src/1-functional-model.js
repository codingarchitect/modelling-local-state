import Result from 'folktale/result';

function withdraw(balance, amount) {
  if (balance >= amount) {
    return Result.Ok(balance - amount);
  } else {
    return Result.Error(new Error(`You do not have enough balance, Current balance is ${balance}`));
  }
}
console.log(withdraw(100, 10).value);
console.log(withdraw(100, 110).value);