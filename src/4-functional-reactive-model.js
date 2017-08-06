import Result from 'folktale/result';
import Rx from 'rxjs'

class InsufficentFunds extends Error {
  get name() { return 'InsufficentFunds' }
}

function withdraw(balance, amounts$) {
  return amounts$.scan((currentBalance, amount) => {
    if (currentBalance.value >= amount) {
      return Result.Ok(currentBalance.value - amount);
    }
    return Result.Error(new InsufficentFunds(`You do not have enough balance, Current balance is ${currentBalance.value}`))
  }, Result.Ok(balance));
}

const withdrawalAmounts = [10, 10, 90];
const balance$ = withdraw(100, Rx.Observable
  .interval(1000)
  .map((i) => withdrawalAmounts[i])
  .take(3)
);
const subscription = balance$.subscribe(({value}) => console.log(value), ({value}) => console.log(value));
