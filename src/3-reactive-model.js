import Result from 'folktale/result';
import Rx from 'rxjs'

class InsufficentFunds extends Error {
  get name() { return 'InsufficentFunds' }
}

function withdraw(balance, amount$) {
	const balance$ = new Rx.BehaviorSubject(Result.Ok(balance));
	amount$.subscribe((amount) => {
		const currentBalance = balance$.getValue().value;
		if (currentBalance >= amount) {
			balance$.next(Result.Ok(currentBalance - amount))
		} else {
			balance$.next(Result.Error(new InsufficentFunds(`You do not have enough balance, Current balance is ${currentBalance}`)));
		}
	}, Result.Ok(balance));
	return balance$;
}

const withdrawalAmounts = [10, 10, 90];
const balance$ = withdraw(100, Rx.Observable
  .interval(1000 /* ms */)
  .map((i) => withdrawalAmounts[i])
  .take(3)
);
const subscription = balance$.subscribe(({value}) => console.log(`Balance is ${value}`), 
  ({value}) => console.error(`Error occurred ${value}`));
